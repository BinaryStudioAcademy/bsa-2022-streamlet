import { ContainerModule, interfaces } from 'inversify';
import { HistoryService } from './application/history-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const historyContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<HistoryService>(CONTAINER_TYPES.HistoryService).to(HistoryService);
});

export { historyContainerModule };
