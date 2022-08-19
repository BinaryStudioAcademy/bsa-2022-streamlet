function generateAbbreviatureNameUser(userName: string): string {
  return userName
    .split(' ')
    .map((name) => name.toUpperCase()[0])
    .join('');
}

export { generateAbbreviatureNameUser };
