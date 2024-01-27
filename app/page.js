import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Test Your Knowledge</h1>
        <Link href="/trivia">
          <button>Start Here</button>
        </Link>
      </div>
    </main>
  );
}
