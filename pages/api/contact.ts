import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "method not allowed" });
  }

  const contactBody = JSON.parse(req.body);

  const savedContact = await prisma.contact.create({
    data: contactBody,
  });

  res.json(savedContact);
}
