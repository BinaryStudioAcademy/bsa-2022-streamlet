import Ffmpeg from 'fluent-ffmpeg';
import path from 'path';
import { transcode } from '~/core';
import { FsService } from '~/services';
import { logger } from '~/config/logger';
import { initStore } from '~/core/init-store';
import { AmqpQueue, ProcessPreset } from '~/shared';
import { AmqpService } from '~/services/amqp/amqp-service';
import { CONFIG } from '~/config/config';

type StreamProcesses = {
  streamKey: string;
  videoId: string;
  processes: Ffmpeg.FfmpegCommand[];
};

type StreamProcessesKeys = 'streamKey' | 'videoId';

export class StreamingService {
  private amqpService: AmqpService;
  private streamPrecesses: StreamProcesses[] = [];
  private streamPresets: ProcessPreset[] = [
    ProcessPreset._360P_30FPS,
    ProcessPreset._480P_30FPS,
    ProcessPreset._720P_30FPS,
  ];

  constructor(amqpService: AmqpService) {
    this.amqpService = amqpService;
  }

  public initConsumers(): Promise<void[]> {
    return Promise.all([
      this.subscribeToStartStreaming(),
      this.subscribeToRestartStreaming(),
      this.subscribeToInterruptStreaming(),
    ]);
  }

  private addStreamProcess(streamKey: string, videoId: string, processes: Ffmpeg.FfmpegCommand[]): void {
    this.streamPrecesses.push({ streamKey, videoId, processes });
  }

  private deleteStreamProcess({ videoId, streamKey }: { videoId?: string; streamKey?: string }): void {
    if (videoId && streamKey) {
      this.streamPrecesses.filter((stream) => stream.streamKey === streamKey && stream.videoId === videoId);
    } else if (videoId) {
      this.streamPrecesses.filter((stream) => stream.videoId === videoId);
    } else if (streamKey) {
      this.streamPrecesses.filter((stream) => stream.streamKey === streamKey);
    }
  }

  private getStreamProcess(key: StreamProcessesKeys, value: string): StreamProcesses | undefined {
    return this.streamPrecesses.find((stream) => stream[key] === value);
  }

  private async startStreaming(streamKey: string, videoId: string): Promise<void> {
    await initStore({ videoId, presets: this.streamPresets });
    const transProcesses = await transcode(streamKey, videoId, this.streamPresets);
    this.addStreamProcess(streamKey, videoId, transProcesses);
  }

  private subscribeToStartStreaming(): Promise<void> {
    return this.amqpService.consume({
      queue: AmqpQueue.STREAM_TRANSCODER,
      onMessage: async (startStreamData) => {
        if (!startStreamData) {
          logger.info('Start stream event: Message data not found');
          return;
        }

        const { streamData } = JSON.parse(startStreamData.toString('utf-8'));

        logger.info(`Start streaming: StreamingKey: ${streamData.streamingKey}  VideoId: ${streamData.videoId}`);
        await this.startStreaming(streamData.streamingKey, streamData.videoId);
      },
    });
  }

  private subscribeToRestartStreaming(): Promise<void> {
    return this.amqpService.consume({
      queue: AmqpQueue.PREVIEW_STOPPED,
      onMessage: async (data) => {
        if (!data) {
          logger.info('Stop preview event: Message data not found');
          return;
        }

        const { videoId: id } = JSON.parse(data.toString('utf-8'));
        const currentStream = this.getStreamProcess('videoId', id);

        if (!currentStream) {
          logger.info(`Stop preview event: Stream with VideoId: ${id} not found`);
          return;
        }

        logger.info(`Preview stopped - release stream. VideoId: ${id}`);
        currentStream.processes.map((process) => process.kill('SIGINT'));

        logger.info(`Deleting stream precesses. VideoId: ${id}`);
        this.deleteStreamProcess({ videoId: id });

        logger.info(`Deleting temp stream folder. VideoId: ${id}`);
        const pathToStreamFolder = path.resolve(CONFIG.playbackPath, id);
        await FsService.removeFolder(pathToStreamFolder);

        logger.info(`Restart streaming: StreamingKey: ${currentStream.streamKey}  VideoId: ${currentStream.videoId}`);
        await this.startStreaming(currentStream.streamKey, currentStream.videoId);
      },
    });
  }

  private subscribeToInterruptStreaming(): Promise<void> {
    return this.amqpService.consume({
      queue: AmqpQueue.STREAM_INTERRUPTED,
      onMessage: (data) => {
        if (!data) {
          logger.info('Interrupted event: Message data not found');
          return;
        }

        const { streamingKey } = JSON.parse(data.toString('utf-8'));
        const currentStream = this.getStreamProcess('streamKey', streamingKey);

        if (!currentStream) {
          logger.info(`Interrupted event: Stream with StreamKey: ${streamingKey} not found`);
          return;
        }

        logger.info(`Stream interrupted. StreamKey: ${streamingKey}`);
        currentStream.processes.map((process) => process.kill('SIGINT'));

        logger.info(`Deleting stream processes. StreamKey: ${streamingKey}`);
        this.deleteStreamProcess({ streamKey: streamingKey });
      },
    });
  }
}
