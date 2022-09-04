import { ChatMessageResponseDto } from './chat-message-response-dto.type';

export type ChatInfoResponseDto = {
  id: string;
  isChatEnabled: boolean;
  initialMessages: {
    list: ChatMessageResponseDto[];
    total: number;
  };
};
