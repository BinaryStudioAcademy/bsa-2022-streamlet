import { inject, injectable } from 'inversify';
import { HistoryRepository } from '~/core/history/port/history-repository';
import { PrismaClient, History } from '@prisma/client';
import { CONTAINER_TYPES, HistoryResponseDto, HistoryRequestDto } from '~/shared/types/types';
import { trimHistory } from '~/shared/helpers/trim-history';

@injectable()
export class HistoryRepositoryAdapter implements HistoryRepository {
  private prismaClient: PrismaClient;

  constructor(@inject(CONTAINER_TYPES.PrismaClient) prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  getAllUserHistory(userId: string): Promise<History[]> {
    return this.prismaClient.history.findMany({
      where: {
        userId,
      },
    });
  }

  async createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<HistoryResponseDto> {
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
}
