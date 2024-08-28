import Grid from "@/components/Grid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <h1 className="text-3xl font-mono text-green-600 mb-4">
        The Game of Life
      </h1>

      <Grid />
    </main>
  );
}
