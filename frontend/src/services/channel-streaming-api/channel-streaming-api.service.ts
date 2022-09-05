import { Http } from 'services/http/http.service';
import { DefaultRequestParam, StreamingKeyResponseDto } from 'common/types/types';
import { ApiPath } from 'common/enums/enums';
import {
  ChannelStreamingApiPath,
  ContentType,
  CreateStreamRequestDto,
  HttpMethod,
  ResetStreamingKeyRequestDto,
  StreamingInfoResponseDto,
  StreamLiveStatusRequestDto,
  StreamPosterUploadRequestDto,
  StreamPosterUploadResponseDto,
  StreamReadinessRequestDto,
  StreamUpdateRequestDto,
  VideoStreamResponseDto,
} from 'shared/build';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class ChannelStreamingApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  async getStreamingKey({ id: channelId }: DefaultRequestParam): Promise<StreamingKeyResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.STREAMING_KEY}/${channelId}`,
    });
  }

  async resetStreamingKey(payload: ResetStreamingKeyRequestDto): Promise<StreamingKeyResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.RESET_STREAMING_KEY}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }

  async createStream(payload: CreateStreamRequestDto): Promise<VideoStreamResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.ROOT}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }

  async uploadPoster(payload: StreamPosterUploadRequestDto): Promise<StreamPosterUploadResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.UPLOAD_POSTER}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }

  async editStream(payload: StreamUpdateRequestDto): Promise<VideoStreamResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.EDIT_STREAM}`,
      options: {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }

  async getActiveStream({ id: channelId }: DefaultRequestParam): Promise<VideoStreamResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.LIVE}/${channelId}`,
    });
  }

  async getStreamingInfo(): Promise<StreamingInfoResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.STREAMING_INFO}`,
    });
  }

  async setStreamStatus(payload: StreamLiveStatusRequestDto): Promise<VideoStreamResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.LIVE}`,
      options: {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }

  async setReadinessToStream(payload: StreamReadinessRequestDto): Promise<VideoStreamResponseDto> {
    return this.#http.load({
      url: `${this.#apiPrefix}${ApiPath.CHANNEL_STREAMING}${ChannelStreamingApiPath.EDIT_STREAM}`,
      options: {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    });
  }
}

export { ChannelStreamingApi };
