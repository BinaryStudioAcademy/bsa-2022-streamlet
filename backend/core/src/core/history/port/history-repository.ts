import { History } from '@prisma/client';
import { HistoryRequestDto, HistoryResponseDto } from '~/shared/types/types';

export interface HistoryRepository {
  getAllUserHistory(userId: string): Promise<History[]>;

  createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<HistoryResponseDto>;
}
