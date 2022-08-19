import { inject, injectable } from 'inversify';
import { History } from '@prisma/client';
import { CONTAINER_TYPES, HistoryRequestDto, HistoryResponseDto } from '~/shared/types/types';
import { HistoryRepository } from '~/core/history/port/history-repository';

@injectable()
export class HistoryService {
  private historyRepository: HistoryRepository;

  constructor(@inject(CONTAINER_TYPES.HistoryRepository) historyRepository: HistoryRepository) {
    this.historyRepository = historyRepository;
  }

  getAllUserHistory(userId: string): Promise<History[]> {
    return this.historyRepository.getAllUserHistory(userId);
  }

  createHistory(historyRequestDto: HistoryRequestDto): Promise<HistoryResponseDto> {
    return this.historyRepository.createHistory(historyRequestDto);
  }
}
