import { useState } from "react";
import { Typography, Card, CardContent, Pagination, Chip } from "@mui/material";

import { Star } from "@mui/icons-material";

import useFetchRepos from "../hooks/useFetchRepos";
import { UsePaginationProps } from "@mui/material/usePagination";

export default function IndexPage() {
  const { data: repositories = [], isLoading, error } = useFetchRepos();

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const handlePageChange: UsePaginationProps["onChange"] = (_event, value) => {
    setPage(value);
  };

  // pagination
  const indexOfLastRepo = page * itemsPerPage;
  const indexOfFirstRepo = indexOfLastRepo - itemsPerPage;
  const currentRepositories = repositories.slice(
    indexOfFirstRepo,
    indexOfLastRepo,
  );
  const paginationText = `Showing ${indexOfFirstRepo + 1}-${Math.min(indexOfLastRepo, repositories.length)} of ${repositories.length} repositories`;

  const totalPages = Math.ceil(repositories.length / itemsPerPage);

  const popularRepositories = repositories.sort(
    (a, b) => b.stargazers_count - a.stargazers_count,
  );

  return (
    <div className="p-6 flex flex-col gap-8">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        GitHub Repositories
      </Typography>

      {/* Repository List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {currentRepositories.map((repo) => (
          <Card key={repo.id}>
            <CardContent>
              <Typography variant="h6" component="h3">
                {repo.name}
              </Typography>
              <Chip
                icon={<Star />}
                label={repo.stargazers_count}
                color={repo.stargazers_count > 1000 ? "primary" : "default"}
                size="small"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <Pagination
          count={totalPages}
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
    </div>
  );
}
