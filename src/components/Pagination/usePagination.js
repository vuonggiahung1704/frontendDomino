const DOTS = '...';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({ pages, currentPage }) => {
  // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
  const siblingCount = 1;
  const totalPageNumbers = siblingCount + 5;

  if (totalPageNumbers >= pages) {
    return range(1, pages);
  }

  /*
          Calculate left and right sibling index and make sure they are within range 1 and pages
      */
  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, pages);

  /*
        We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and pages. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < pages - 2
      */
  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < pages - 2;

  const firstPageIndex = 1;
  const lastPageIndex = pages;

  /*
          Case 2: No left dots to show, but rights dots to be shown
      */
  if (!shouldShowLeftDots && shouldShowRightDots) {
    let leftItemCount = 3 + 2 * siblingCount;
    let leftRange = range(1, leftItemCount);

    return [...leftRange, DOTS, pages];
  }

  /*
          Case 3: No right dots to show, but left dots to be shown
      */
  if (shouldShowLeftDots && !shouldShowRightDots) {
    let rightItemCount = 3 + 2 * siblingCount;
    let rightRange = range(pages - rightItemCount + 1, pages);
    return [firstPageIndex, DOTS, ...rightRange];
  }

  /*
          Case 4: Both left and right dots to be shown
      */
  if (shouldShowLeftDots && shouldShowRightDots) {
    let middleRange = range(leftSiblingIndex, rightSiblingIndex);
    return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
  }
};
