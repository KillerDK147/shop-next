import Link from "next/link"
import Nav from 'react-bootstrap/Nav'
import Menu from "../compements/Menu"
export default function Home() {
  return (
    <div>
      <Menu />
      <h1>Hello Next.js</h1>
      <Link href="/home">
        <a>Home</a>
      </Link>
    </div>
  )
}
