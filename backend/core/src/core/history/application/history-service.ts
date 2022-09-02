import { inject, injectable } from 'inversify';
import { BatchPayload, CONTAINER_TYPES, HistoryRequestDto, HistoryResponseDto } from '~/shared/types/types';
import { History } from '@prisma/client';
import { HistoryRepository } from '~/core/history/port/history-repository';
import { HISTORY_ITEM_NUM_IN_ONE_PAGE } from '~/shared/constants/constants';

@injectable()
export class HistoryService {
  private historyRepository: HistoryRepository;

  constructor(@inject(CONTAINER_TYPES.HistoryRepository) historyRepository: HistoryRepository) {
    this.historyRepository = historyRepository;
  }

  async getUserHistory(userId: string, page: string): Promise<HistoryResponseDto> {
    const pageNumber = Number(page);

    const lastPage = Math.ceil((await this.historyRepository.getAllUserHistoryLength(userId)) / 10);
    if (!pageNumber) {
      return this.historyRepository.getUserHistory(userId, HISTORY_ITEM_NUM_IN_ONE_PAGE, 0, lastPage);
    }
    const skip = (pageNumber - 1) * HISTORY_ITEM_NUM_IN_ONE_PAGE;
    return this.historyRepository.getUserHistory(userId, HISTORY_ITEM_NUM_IN_ONE_PAGE, skip, lastPage);
  }

  async createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<History> {
    const isHistoryExist = await this.historyRepository.isHistoryAlreadyExist(historyRequestDto);
    if (isHistoryExist) {
      return this.historyRepository.updateHistoryRecord(isHistoryExist.id);
    }

    return this.historyRepository.createHistoryItem(historyRequestDto);
  }

  async deleteAllUserHistory(userId: string): Promise<BatchPayload> {
    return this.historyRepository.deleteAllUserHistory(userId);
  }
}
