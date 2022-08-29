import { ContainerModule, interfaces } from 'inversify';
import { ChatService } from './application/chat-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const chatContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ChatService>(CONTAINER_TYPES.ChatService).to(ChatService);
});

export { chatContainerModule };
