import { BatchPayload, HistoryRequestDto, HistoryResponseDto } from '~/shared/types/types';
import { History } from '@prisma/client';

export type getAllUserHistoryInputType = {
  userId: string;
  take: number;
  skip: number;
  lastPage: number;
  currentPage: number;
};
export interface HistoryRepository {
  getUserHistory(arg: getAllUserHistoryInputType): Promise<HistoryResponseDto>;
  getAllUserHistoryLength(userId: string): Promise<number>;
  createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<History>;
  isHistoryAlreadyExist(historyRequestDto: HistoryRequestDto): Promise<History | null>;
  updateHistoryRecord(id: string): Promise<History>;
  deleteAllUserHistory(userId: string): Promise<BatchPayload>;
}
