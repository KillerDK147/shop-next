import Link from "next/link"
import Nav from 'react-bootstrap/Nav'
export default function Home() {
  return (
    <div>
      <h1>Hello Next.js</h1>
      <Link href="/home">
        <a classname="btn btn-info">Home</a>
      </Link>
    </div>
  )
}
