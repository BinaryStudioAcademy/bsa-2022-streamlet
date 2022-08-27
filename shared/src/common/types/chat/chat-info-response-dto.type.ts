import { ChatMessage } from './chat-message.type';

export type ChatInfoResponseDto = {
  id: string;
  initialMessages: {
    list: ChatMessage[];
    total: number;
  };
};
