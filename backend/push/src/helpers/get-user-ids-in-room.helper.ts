const getUserIdsInRoom = (clientsMap: Map<string, string>, clientsInRoom: string[]): string[] => {
  const res: string[] = [];
  for (const client of clientsInRoom) {
    if (clientsMap.has(client)) {
      res.push(clientsMap.get(client) as string);
    }
  }
  return res;
};

export { getUserIdsInRoom };
