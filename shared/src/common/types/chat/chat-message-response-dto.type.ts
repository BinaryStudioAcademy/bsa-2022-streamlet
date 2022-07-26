export type ChatMessageResponseDto = {
  id: string;
  text: string;
  createdAt: string;
  author: {
    id: string;
    username: string;
    profile: {
      avatar: string;
    };
  };
};
