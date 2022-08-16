type VideoCard = {
  id: string;
  name: string;
  duration: number;
  videoViews: number;
  createdAt: string;
  preview: string;
  channel: {
    id: string;
    name: string;
    avatar: string;
  };
};

export { type VideoCard };
