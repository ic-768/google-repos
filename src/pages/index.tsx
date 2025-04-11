import {
  Typography,
  Card,
  CardContent,
  Pagination,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { Star } from "@mui/icons-material";

import useFetchRepos from "../hooks/useFetchRepos";
import { usePageNavigation } from "../hooks/usePageNavigation";
import { Repo } from "../types/repo";
import { categorizeRepos } from "../lib/functions";

export default function IndexPage() {
  const { data: repositories = [], isFetching, error } = useFetchRepos();

  const {
    page,
    handlePageChange,
    handlePageSizeChange,
    totalPageNum,
    pageSize,
    firstDisplayedItem,
    lastDisplayedItem,
  } = usePageNavigation({
    defaultPageSize: 8,
    totalResults: repositories.length,
  });

  const { unpopularRepos, popularRepos } = categorizeRepos(repositories);

  const paginatedRepos = unpopularRepos.slice(
    firstDisplayedItem,
    lastDisplayedItem,
  );

  const paginationText = `Showing ${firstDisplayedItem + 1}-${Math.min(lastDisplayedItem, repositories.length)} of ${repositories.length} repositories`;

  return (
    <div className="p-6 flex flex-col gap-8 items-center">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        GitHub Repositories
      </Typography>

      {isFetching && <CircularProgress />}

      {/* Repository List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {popularRepos.map((repo) => (
          <Card key={repo.id}>
            <CardContent>
              <Typography variant="h6" component="h3">
                {repo.name}
              </Typography>
              <Chip
                icon={<Star />}
                label={repo.stargazers_count}
                color="primary"
                size="small"
              />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        {paginatedRepos.map((repo) => (
          <Card key={repo.id}>
            <CardContent>
              <Typography variant="h6" component="h3">
                {repo.name}
              </Typography>
              <Chip
                icon={<Star />}
                label={repo.stargazers_count}
                color="default"
                size="small"
              />
            </CardContent>
          </Card>
        ))}
      </div>

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
        <FormControl>
          <InputLabel id="page-size-label">Items per page</InputLabel>
          <Select
            labelId="page-size-label"
            value={pageSize}
            onChange={handlePageSizeChange}
            label="Items per page"
            variant="outlined"
            size="small"
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={16}>16</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
