import { NotificationBaseResponseDto } from './notification-base-response-dto.type';
import { NotificationStreamStartResponseDto } from './notification-stream-start-response-dto.type';

type NotificationResponse =
  | NotificationBaseResponseDto
  | NotificationBaseResponseDto
  | NotificationStreamStartResponseDto;

export { NotificationResponse };
