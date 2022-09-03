const getSocketIdByUserId = (clientsMap: Map<string, string>, userId: string): string | undefined => {
  for (const [key, value] of clientsMap.entries()) {
    if (value === userId) {
      return key;
    }
  }
  return;
};

export { getSocketIdByUserId };
