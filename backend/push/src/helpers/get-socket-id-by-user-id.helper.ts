const getSocketIdByUserId = (clientsMap: Map<string, string>, userId: string): string[] => {
  const res: string[] = [];
  for (const [key, value] of clientsMap.entries()) {
    if (value === userId) {
      res.push(key);
    }
  }
  return res;
};

export { getSocketIdByUserId };
