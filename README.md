# Google Repos

A web application that fetches and displays information about Google's GitHub repositories using GitHub's public API. Per instruction, the UI is built with Material UI the layout and styling is done with Tailwind CSS.

Because I noticed that the paginated repos never exceeded more than 5 popular ones per page, I made the decision to show all the popular repos at the top, and paginate the unpopular ones underneath them so that the "Show more / Show less" can have a chance to be rendered.

## Directory Structure

```
/
├── api/           # API endpoint fetching functions
├── components/
│   ├── pages/     # Full page view components
│   ├── ui/        # Reusable UI components
│   └── */         # Feature-specific components
├── hooks/
├── lib/           # Utility functions and constants
└── types/         # TypeScript type definitions
```

## Technical & Design Decisions

The main branch uses React Query for data fetching and storing, however, you'll find a separate branch that uses Context API + useEffect, because the initial guidelines didn't mention React Query as an option. That being said, I would never use Context + useEffect for state management in a production app.

### Core Structure

- **App.tsx** serves as the application entry point, rendering the main page and all necessary providers. In an application with multiple pages, this would be where routing logic would reside.

- The **index page** fetches and caches the repo data, while rendering the repository listings and search/pagination controls. All business logic is extracted into custom hooks for readability and separation of concerns.

### Component Design

Components are designed with reusability as a primary goal:

- The **PaginatedContent** component utilizes the render props pattern and a `usePageNavigation` hook. This approach allows us to dictate how to render the content, and ensures the component isn't tightly coupled to any specific UI implementation.

- Repository management (filtering, categorizing, and sorting) is handled by the `useRepoSearch` hook, which implements a data processing pipeline:
  1. Filtering repositories based on search criteria
  2. Categorizing results into popular and unpopular repositories
  3. Applying appropriate sorting rules to each category

This modular approach allows for clean, testable code while maintaining flexibility for future enhancements.

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the development server at `localhost:3000`.
