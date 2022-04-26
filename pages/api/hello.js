// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  try {
    await res.unstable_revalidate("/home");
    return res.json({ revlidate: "true" });
  } catch (error) {
    console.log(error);
  }
}
