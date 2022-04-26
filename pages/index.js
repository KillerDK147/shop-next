import Link from "next/link";
import Menu from "../compements/Menu";
export default function Home() {
  return (
    <div>
      <h1>Hello Next.js</h1>
      <Link href="/home">
        <a>Home</a>
      </Link>
    </div>
  );
}
