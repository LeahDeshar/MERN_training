import Link from "next/link";
import Header from "@/components/header";
export default function Home() {
  console.log("server");
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <a href="/about">About page</a>
      <Link href="/about">About better</Link>
    </main>
  );
}
