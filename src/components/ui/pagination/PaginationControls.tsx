import {
  Typography,
  Pagination,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { usePageNavigation } from "../../../hooks/usePageNavigation";

interface PaginationControlsProps extends ReturnType<typeof usePageNavigation> {
  totalNumItems: number;
}

/**
 * Displays pagination controls and page size selection.
 * @param page - The current page number.
 * @param handlePageChange - Function to handle page changes.
 * @param handlePageSizeChange - Function to handle page size changes.
 * @param totalPageNum - The total number of pages.
 * @param pageSize - The number of items per page.
 * @param firstDisplayedItem - The index of the first displayed item.
 * @param lastDisplayedItem - The index of the last displayed item.
 * @param totalNumItems - The total number of items.
 */
export default function PaginationControls({
  page,
  handlePageChange,
  handlePageSizeChange,
  totalPageNum,
  pageSize,
  firstDisplayedItem,
  lastDisplayedItem,
  totalNumItems,
}: PaginationControlsProps) {
  const paginationText = `Showing ${firstDisplayedItem + 1}-${Math.min(lastDisplayedItem, totalNumItems)} of ${totalNumItems} items`;

  return (
    <div className="flex">
      <div className="flex flex-col items-center gap-4">
        <Pagination
          count={totalPageNum}
          page={page}
          onChange={handlePageChange}
          color="primary"
          showFirstButton
          showLastButton
        />
        <Typography color="textSecondary" align="center">
          {paginationText}
        </Typography>
      </div>
      <FormControl>
        <Select
          labelId="page-size-label"
          value={pageSize}
          onChange={handlePageSizeChange}
          variant="outlined"
          size="small"
        >
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
