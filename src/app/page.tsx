"use client";

import Controls from "@/components/Controls";
import Grid from "@/components/Grid";
import { GridContexProvider } from "@/server/api";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-3xl font-mono text-green-600 mb-4">
        The Game of Life
      </h1>

      <GridContexProvider>
        <>
          <Controls />

          <Grid />
        </>
      </GridContexProvider>
    </main>
  );
}
