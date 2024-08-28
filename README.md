# Game of Life

This is a simple implementation of Conway's Game of Life using React, TypeScript, and Next.js. The application features a grid-based interface where you can simulate cellular automaton behavior.

## Features

- **Grid Interface**: An interactive grid to toggle cell states (alive or dead).
- **Play/Pause Simulation**: Start or pause the simulation.
- **Step-by-Step Simulation**: Advance the simulation by a specified number of iterations.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/MatheusRaj/game-of-life
   cd game-of-life
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Run tests:**

   ```bash
   pnpm test
   ```

5. **Build the application for production:**

   ```bash
   pnpm build
   ```

6. **Start the production server:**

   ```bash
   pnpm start
   ```

## Project Structure

- `app/`: Next.js pages, with `layout.tsx` as the main entry point.
- `components/`: Contains React components such as `Grid` and `Controls`.
- `server/`: Simulates a back-end API for the components, utilizing React's built-in Context API.
- `utils/`: Utility functions and constants, including game logic and types.
- `__tests__/`: Test files for unit testing functions and components.

## Usage

1. **Grid Interaction**: Click on cells in the grid to toggle their state.
2. **Controls**:
   - **Reset**: Clear the grid.
   - **Play/Pause**: Start or stop the simulation.
   - **Next**: Advance the simulation by a specified number of steps.

## Technologies Used

- **Next.js**: A React framework for server-side rendering and static site generation.
- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript for static type checking.
- **Jest**: A testing framework for unit tests.
- **Tailwind CSS**: A utility-first CSS framework for styling.
