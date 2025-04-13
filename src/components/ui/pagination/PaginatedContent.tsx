import { usePageNavigation } from "../../../hooks/usePageNavigation";
import PaginationControls from "./PaginationControls";
import { ReactNode } from "react";

interface PaginatedContentProps<T> {
  items: T[];
  renderItems: (paginatedItems: T[]) => ReactNode;
}

/**
 * A generic component that handles pagination logic and renders paginated content.
 * It takes a list of items and a render function to render the paginated items.
 * Thusly, we encapsulate all pagination logic in one place, and we can let whoever uses the component specify how to render the resulting items.
 *
 * @param items - The full list of items to paginate
 * @param renderItems - Render props function that renders the paginated items
 */
export default function PaginatedContent<T>({
  items,
  renderItems,
}: PaginatedContentProps<T>) {
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
    <div className="flex w-full flex-col gap-4">
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
    </div>
  );
}
