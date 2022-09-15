export const prettyDisplayCategoryName = (uglyName: string): string => {
  return uglyName
    .split('&')
    .map((x) => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' & ');
};
