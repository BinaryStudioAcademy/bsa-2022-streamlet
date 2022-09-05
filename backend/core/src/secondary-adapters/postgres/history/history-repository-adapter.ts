import { inject, injectable } from 'inversify';
import { getAllUserHistoryInputType, HistoryRepository } from '~/core/history/port/history-repository';
import { History, PrismaClient } from '@prisma/client';
import { BatchPayload, CONTAINER_TYPES, HistoryRequestDto, HistoryResponseDto } from '~/shared/types/types';
import { trimHistory } from '~/shared/helpers/trim-history';
import { HistoryListType } from 'shared/build';

@injectable()
export class HistoryRepositoryAdapter implements HistoryRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getAllUserHistoryLength(userId: string): Promise<number> {
    return this.prismaClient.history.count({
      where: {
        userId,
      },
    });
  }

  async getUserHistory({
    userId,
    take,
    skip,
    lastPage,
    currentPage,
  }: getAllUserHistoryInputType): Promise<HistoryResponseDto> {
    const history = await this.prismaClient.history.findMany({
      take,
      skip,
      where: {
        userId,
      },
      include: {
        video: {
          include: {
            channel: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
    const list: HistoryListType[] = history.map((historyRecord) => trimHistory(historyRecord));

    return {
      list,
      lastPage,
      currentPage,
    };
  }

  isHistoryAlreadyExist(historyRequestDto: HistoryRequestDto): Promise<History | null> {
    return this.prismaClient.history.findFirst({
      where: {
        userId: historyRequestDto.userId,
        videoId: historyRequestDto.videoId,
      },
    });
  }

  updateHistoryRecord(id: string): Promise<History> {
    return this.prismaClient.history.update({
      where: {
        id,
      },
      data: { updatedAt: new Date() },
    });
  }

  createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<History> {
    return this.prismaClient.history.create({
      data: { ...historyRequestDto },
      include: {
        video: {
          include: {
            channel: {
              select: {
                id: true,
                name: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteAllUserHistory(userId: string): Promise<BatchPayload> {
    return await this.prismaClient.history.deleteMany({
      where: {
        userId,
      },
    });
  }
}
