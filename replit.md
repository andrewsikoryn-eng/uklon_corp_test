# Overview

This is a full-stack web application built with React and Express that appears to be a Ukrainian logistics/delivery management dashboard. The application follows a modern monorepo structure with separate client and server directories, using TypeScript throughout. The main features include a dashboard for tracking orders, managing company balance, and monitoring delivery statistics with a focus on the Ukrainian market (evident from the Ukrainian language interface).

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Styling**: Tailwind CSS with custom design system including Ukrainian branding colors
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Storage Pattern**: Interface-based storage layer with in-memory implementation (MemStorage) for development
- **Build System**: esbuild for production builds, tsx for development

## Database Design
- **Primary Database**: PostgreSQL with Neon Database serverless driver
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Core Entities**:
  - Users (authentication)
  - Orders (delivery tracking with status, employee info, routes, addresses)
  - Statistics (financial metrics including balance, expenses, order counts)

## Development Workflow
- **Hot Reloading**: Vite HMR for frontend, tsx watch mode for backend
- **Code Quality**: TypeScript strict mode, path aliases for clean imports
- **Testing**: Test-friendly component structure with data-testid attributes

## Key Design Decisions
- **Monorepo Structure**: Shared schema and types between client/server in `/shared` directory
- **Type Safety**: End-to-end TypeScript with Zod schemas for runtime validation
- **Scalable Storage**: Abstract storage interface allows easy migration from in-memory to database
- **Component Architecture**: Modular React components with separation of concerns
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database operations and migrations

## Frontend Libraries
- **Radix UI**: Headless component primitives for accessibility
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## Development Tools
- **Vite**: Frontend build tool and dev server
- **esbuild**: Fast JavaScript bundler for production
- **TypeScript**: Static type checking
- **PostCSS**: CSS processing with Tailwind

## Replit Integration
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling integration

## UI Enhancement
- **class-variance-authority**: Type-safe CSS class variants
- **clsx**: Conditional CSS class joining
- **tailwind-merge**: Tailwind class conflict resolution
- **date-fns**: Date manipulation utilities