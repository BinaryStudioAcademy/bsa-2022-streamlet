enum PostfixViewType {
  K = 'K', // thousands
  M = 'M', // millions
  B = 'B', // billions
  T = 'T', // trillions
}

const matchPostfixViewTypeWithMinViewsNumber: Record<PostfixViewType, number> = {
  [PostfixViewType.K]: 1000,
  [PostfixViewType.M]: 1000 * 1000,
  [PostfixViewType.B]: 1000 * 1000 * 1000,
  [PostfixViewType.T]: 1000 * 1000 * 1000 * 1000,
};

const postfixViewOrder = [PostfixViewType.T, PostfixViewType.B, PostfixViewType.M, PostfixViewType.K];

const getTextFormatedViewsString = (views: number): string => {
  for (let i = 0; i < postfixViewOrder.length; i++) {
    const res = Math.floor(views / matchPostfixViewTypeWithMinViewsNumber[postfixViewOrder[i]]);
    if (res < 1) {
      continue;
    }
    return `${res}${postfixViewOrder[i]}`;
  }
  return views.toString();
};

export { getTextFormatedViewsString };
