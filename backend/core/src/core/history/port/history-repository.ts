import { HistoryRequestDto, HistoryResponseDto } from '~/shared/types/types';
import { History } from '@prisma/client';

export interface HistoryRepository {
  getUserHistory(userId: string, take: number, skip: number, lastPage: number): Promise<HistoryResponseDto>;
  getAllUserHistoryLength(userId: string): Promise<number>;
  createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<History>;
}
