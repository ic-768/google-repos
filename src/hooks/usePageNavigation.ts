import { BaseSelectProps, PaginationProps } from "@mui/material";
import { useState } from "react";

interface UsePageNavigationProps {
  defaultPageSize?: number;
  totalResults?: number;
}

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
    totalResults,
    firstDisplayedItem,
    lastDisplayedItem,
    totalPageNum,
  };
};
