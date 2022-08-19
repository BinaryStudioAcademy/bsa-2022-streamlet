import { NotificationBaseResponseDto } from './notification-base-response-dto.type';
import { NotificationMessageResponseDto } from './notification-message-response-dto.type';
import { NotificationStreamStartResponseDto } from './notification-stream-start-response-dto.type';

type NotificationResponseDto =
  | NotificationBaseResponseDto
  | NotificationMessageResponseDto
  | NotificationStreamStartResponseDto;

export { NotificationResponseDto };
