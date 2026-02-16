# Sensor Map Monorepo

A monorepo containing the Sensor Map client and server applications.

## Structure

```
sensor-map-example/
├── sensor-map-client/     # React + Vite + TypeScript frontend
├── sensor-map-server/     # Hono backend server
├── biome.json            # Shared Biome configuration
└── package.json          # Root workspace configuration
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

Install all dependencies:

```bash
npm install
```

### Development

Run both client and server in development mode:

```bash
npm run dev
```

Or run them separately:

```bash
# Client only (Vite dev server at http://localhost:5173)
npm run dev:client

# Server only (Hono server at http://localhost:3000)
npm run dev:server
```

### Building

Build both applications:

```bash
npm run build
```

### Linting and Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting.

```bash
# Check for issues
npm run lint

# Format code
npm run format

# Check and auto-fix issues
npm run check
```

## Applications

### sensor-map-client

React application built with:
- Vite 8
- React 19
- TypeScript
- Biome for linting/formatting

Default dev server: `http://localhost:5173`

### sensor-map-server

API server built with:
- Hono (lightweight web framework)
- TypeScript
- tsx for development

Default port: `http://localhost:3000`

API endpoints:
- `GET /` - API info
- `GET /health` - Health check

## Workspace Commands

You can run commands in specific workspaces using:

```bash
npm run <script> -w <workspace-name>

# Examples:
npm run build -w sensor-map-client
npm run dev -w sensor-map-server
npm install <package> -w sensor-map-client
```

## Configuration

### Biome

Biome is configured at the root level (`biome.json`) and applies to both applications:
- Formats code with consistent style
- Lints for common errors and best practices
- Organizes imports automatically

### TypeScript

Each application has its own `tsconfig.json` with appropriate settings for its environment.
