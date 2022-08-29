import { ChatMessageResponseDto } from './chat-message-response-dto.type';

export type ChatInfoResponseDto = {
  id: string;
  initialMessages: {
    list: ChatMessageResponseDto[];
    total: number;
  };
};
