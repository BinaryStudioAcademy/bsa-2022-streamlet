export const uglyDisplayCategoryName = (prettyName: string): string => {
  return prettyName
    .split(' & ')
    .map((x) => x.charAt(0).toLowerCase() + x.slice(1))
    .join('&');
};
