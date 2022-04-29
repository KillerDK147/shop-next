export async function revalidate() {
  await fetch("/api/revalidate?secret=supersecret");
  console.log("revalidate");
}
