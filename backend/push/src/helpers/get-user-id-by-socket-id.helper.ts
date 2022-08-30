const getUserIdBySocketId = (clientsMap: Map<string, string>, socketId: string): string | undefined => {
  for (const [key, value] of clientsMap.entries()) {
    if (value === socketId) {
      return key;
    }
  }
  return;
};

export { getUserIdBySocketId };
