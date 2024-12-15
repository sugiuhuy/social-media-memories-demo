/**
 * Function to generate an array of page numbers for the pagination component
 *
 * @param data - An object with the following properties:
 *   - currentPage: The current page number
 *   - pages: The total number of pages
 *   - maxLength: The maximum number of page numbers to display
 * @returns An array of page numbers (with NaNs as separators) for the pagination component
 *
 * @example
 * paginationItems({ currentPage: 1, pages: 10, maxLength: 5 }); // [1, 2, 3, 4, 5, NaN, 10]
 */
export default function paginationItems(data: { currentPage: number; pages: number; maxLength: number }): number[] {
  const result: number[] = [];

  /**
   * Case 1: The total number of pages is less than or equal to the maximum length
   * In this case, we simply return an array of numbers from 1 to the total number of pages
   */
  if (data.pages <= data.maxLength) {
    for (let i = 1; i <= data.pages; i++) {
      result.push(i);
    }
  } else {
    /**
     * Case 2: The total number of pages is greater than the maximum length
     * In this case, we will display the first page, the last page, and a range of pages around the current page
     *
     * We calculate the number of pages to display on each side of the current page
     * We then calculate the number of pages to skip between the first and last page, and the current page
     */
    const firstPage = 1;
    const confirmPage = 3;
    const deductedMaxLength = data.maxLength - confirmPage;
    const sideLength = deductedMaxLength / 2;

    if (data.currentPage - firstPage < sideLength || data.pages - data.currentPage < sideLength) {
      /**
       * Case 2.1: The current page is near the first page
       * In this case, we display the first page, a range of pages around the current page, and the last page
       */
      for (let i = 1; i <= firstPage + sideLength; i++) {
        result.push(i);
      }

      result.push(NaN);

      for (let i = data.pages - sideLength; i <= data.pages; i++) {
        result.push(i);
      }
    } else if (data.currentPage - firstPage >= deductedMaxLength && data.pages - data.currentPage >= deductedMaxLength) {
      /**
       * Case 2.2: The current page is in the middle of the range
       * In this case, we display the first page, a range of pages around the current page, and the last page
       */
      const deductedSideLength = sideLength - 1;

      result.push(firstPage);
      result.push(NaN);

      for (let i = data.currentPage - deductedSideLength; i <= data.currentPage + deductedSideLength; i++) {
        result.push(i);
      }

      result.push(NaN);
      result.push(data.pages);
    } else {
      /**
       * Case 2.3: The current page is near the last page
       * In this case, we display the first page, a range of pages around the current page, and the last page
       */
      let remainingLength = data.maxLength;

      const isNearFirstPage = data.currentPage - firstPage < data.pages - data.currentPage;
      if (isNearFirstPage) {
        for (let i = 1; i <= data.currentPage + 1; i++) {
          result.push(i);
          remainingLength--;
        }

        result.push(NaN);
        remainingLength--;

        for (let i = data.pages - (remainingLength - 1); i <= data.pages; i++) {
          result.push(i);
        }
      } else {
        for (let i = data.pages; i >= data.currentPage - 1; i--) {
          result.unshift(i);
          remainingLength--;
        }

        result.unshift(NaN);
        remainingLength--;

        for (let i = remainingLength; i >= 1; i--) {
          result.unshift(i);
        }
      }
    }
  }

  return result;
}
