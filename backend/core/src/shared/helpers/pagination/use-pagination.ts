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
  const skip = isNaN(pageNumber) ? 0 : (pageNumber - 1) * itemInOnePage;
  const currentPage = skip / allDataLength + 1;

  return {
    take: itemInOnePage,
    skip,
    lastPage: lastPage || 1,
    currentPage: currentPage || 1,
  };
};

export { usePagination };
