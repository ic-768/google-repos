import PaginationControls from "./PaginationControls";
import { usePageNavigation } from "../../hooks/usePageNavigation";
import { ReactNode } from "react";

interface PaginatedContentProps {
  items: any[];
  renderItems: (paginatedItems: any[]) => ReactNode;
}

/**
 * A generic component that handles pagination logic and renders paginated content.
 *
 * @param items - The full list of items to paginate
 * @param renderItems - Render props function that renders the paginated items
 */
export default function PaginatedContent({
  items,
  renderItems,
}: PaginatedContentProps) {
  const {
    page,
    handlePageChange,
    handlePageSizeChange,
    pageSize,
    totalPageNum,
    firstDisplayedItem,
    lastDisplayedItem,
  } = usePageNavigation({ totalResults: items.length });

  const paginatedItems = items.slice(firstDisplayedItem, lastDisplayedItem);
  return (
    <>
      {renderItems(paginatedItems)}

      {items.length > 0 && (
        <PaginationControls
          totalNumItems={items.length}
          page={page}
          handlePageChange={handlePageChange}
          handlePageSizeChange={handlePageSizeChange}
          totalPageNum={totalPageNum}
          pageSize={pageSize}
          firstDisplayedItem={firstDisplayedItem}
          lastDisplayedItem={lastDisplayedItem}
        />
      )}
    </>
  );
}
