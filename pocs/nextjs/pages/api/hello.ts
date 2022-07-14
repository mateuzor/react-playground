// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await res.revalidate("/");
  res.status(200).json({ name: "John Doe" });
}
// we can call 3rd part apis from here without the need of implementing
//in a backend
