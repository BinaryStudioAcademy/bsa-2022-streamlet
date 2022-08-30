import { inject, injectable } from 'inversify';
import { HistoryRepository } from '~/core/history/port/history-repository';
import { PrismaClient, History } from '@prisma/client';
import { CONTAINER_TYPES, HistoryResponseDto, HistoryRequestDto } from '~/shared/types/types';
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

  async getUserHistory(userId: string, take: number, skip: number, lastPage: number): Promise<HistoryResponseDto> {
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
        createdAt: 'desc',
      },
    });
    const list: HistoryListType[] = history.map((historyRecord) => trimHistory(historyRecord));

    return {
      list,
      lastPage,
      currentPage: skip / 10 + 1,
    };
  }

  async createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<History> {
    const isHistoryAlreadyExist = await this.prismaClient.history.findFirst({
      where: {
        ...historyRequestDto,
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
    });

    if (!isHistoryAlreadyExist) {
      const history = await this.prismaClient.history.create({
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
      return trimHistory(history);
    }
    return trimHistory(isHistoryAlreadyExist);
  }
}
