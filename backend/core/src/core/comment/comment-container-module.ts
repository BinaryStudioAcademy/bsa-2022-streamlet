import { ContainerModule, interfaces } from 'inversify';
import { CommentService } from './application/comment-service';
import { CONTAINER_TYPES } from '~/shared/types/types';

const commentContainerModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<CommentService>(CONTAINER_TYPES.CommentService).to(CommentService);
});

export { commentContainerModule };
