import Grid from "@/components/Grid";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-around">
      <h1 className="text-3xl font-mono m-4 text-green-600">
        The Game of Life
      </h1>

      <Grid />
    </main>
  );
}
