import { BaseSelectProps, PaginationProps } from "@mui/material";
import { useState } from "react";

interface UsePageNavigationProps {
  defaultPageSize?: number;
  totalResults?: number;
}

/**
 * Generic hook to manage pagination of a list of items. To be used in conjunction with the PaginatedContent component.
 *
 * @param defaultPageSize - The default number of items to display per page. Can be changed with handlePageSizeChange.
 * @param totalResults - The total number of items in the list.
 * @returns An object containing:
 *  - page: The current page number.
 *  - handlePageChange: Function to handle page changes.
 *  - handlePageSizeChange: Function to handle page size changes.
 *  - pageSize: The number of items per page.
 *  - totalResults: The total number of items.
 *  - firstDisplayedItem: The index of the first displayed item.
 *  - lastDisplayedItem: The index of the last displayed item.
 *  - totalPageNum: The total number of pages.
 */
export const usePageNavigation = ({
  defaultPageSize = 8,
  totalResults = 0,
}: UsePageNavigationProps = {}) => {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);

  const totalPageNum = Math.ceil(totalResults / pageSize);

  // stay within valid page bounds
  const constrainedPage = Math.min(page, Math.max(totalPageNum, 1));

  const firstDisplayedItem = Math.max((constrainedPage - 1) * pageSize + 1, 0);
  const lastDisplayedItem = Math.min(
    pageSize * constrainedPage,
    totalResults || 0,
  );

  const handlePageChange: PaginationProps["onChange"] = (_event, value) => {
    setPage(value);
  };

  const handlePageSizeChange: BaseSelectProps<number>["onChange"] = (event) => {
    setPageSize(Number(event.target.value));
  };

  return {
    page: constrainedPage,
    handlePageChange,
    handlePageSizeChange,
    pageSize,
    firstDisplayedItem,
    lastDisplayedItem,
    totalPageNum,
  };
};
