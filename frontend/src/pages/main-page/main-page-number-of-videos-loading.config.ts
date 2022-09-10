enum ScreenSizesForMainPage {
  SMALL = 1525,
  AVERAGE = 1700,
  LARGE = 2000,
  VERY_LARGE = 4000,
}

const matchScreenSize: Record<ScreenSizesForMainPage, number> = {
  [ScreenSizesForMainPage.SMALL]: 12,
  [ScreenSizesForMainPage.AVERAGE]: 16,
  [ScreenSizesForMainPage.LARGE]: 20,
  [ScreenSizesForMainPage.VERY_LARGE]: 40,
};

export { ScreenSizesForMainPage, matchScreenSize };
