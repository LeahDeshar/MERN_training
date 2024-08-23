import Link from "next/link";
export default function Home() {
  console.log("server");
  return (
    <main>
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>
      <a href="/about">About page</a>
      <Link href="/about">About better</Link>
    </main>
  );
}
