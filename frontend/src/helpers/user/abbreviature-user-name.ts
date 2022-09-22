function generateAbbreviatureNameUser(userName: string): string {
  return userName
    .split(' ')
    .map((name) => name.toUpperCase()[0])
    .slice(0, 2)
    .join('');
}

export { generateAbbreviatureNameUser };
