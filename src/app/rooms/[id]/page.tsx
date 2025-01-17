import Socket from "@/components/Socket";

export default function Home({params}: {params: {id: string}}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Socket id={params.id} />
    </main>
  );
}