export type PaginationHelperInputType = {
  allDataLength: number;
  pageNumber: number | typeof NaN;
  itemInOnePage: number;
};

export type PaginationHelperReturnType = {
  skip: number;
  lastPage: number;
  take: number;
  currentPage: number;
};
const usePagination = ({
  allDataLength,
  pageNumber,
  itemInOnePage,
}: PaginationHelperInputType): PaginationHelperReturnType => {
  const lastPage = Math.ceil(allDataLength / itemInOnePage);
  const currentPageNumber = lastPage < pageNumber || pageNumber <= 0 ? 1 : pageNumber;
  const skip = (currentPageNumber - 1) * itemInOnePage;

  return {
    take: itemInOnePage,
    skip,
    lastPage: lastPage || 1,
    currentPage: currentPageNumber,
  };
};

export { usePagination };
