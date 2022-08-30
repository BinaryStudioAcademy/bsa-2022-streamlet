import { inject, injectable } from 'inversify';
import { CONTAINER_TYPES, HistoryRequestDto, HistoryResponseDto } from '~/shared/types/types';
import { HistoryRepository } from '~/core/history/port/history-repository';

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
      return this.historyRepository.getUserHistory(userId, 10, 0, lastPage);
    }
    const skip = (pageNumber - 1) * 10;
    return this.historyRepository.getUserHistory(userId, 10, skip, lastPage);
  }

  async createHistoryItem(historyRequestDto: HistoryRequestDto): Promise<HistoryResponseDto> {
    const { userId } = historyRequestDto;
    await this.historyRepository.createHistoryItem(historyRequestDto);
    return this.getUserHistory(userId, '1');
  }
}
