import { inject, injectable } from 'inversify';
import { VideoRepository } from '~/core/video/port/video-repository';
import { PrismaClient, Video } from '@prisma/client';
import { CONTAINER_TYPES } from '~/shared/types/types';

@injectable()
export class VideoRepositoryAdapter implements VideoRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getAll(): Promise<Video[]> {
    return this.prismaClient.video.findMany();
  }
}
