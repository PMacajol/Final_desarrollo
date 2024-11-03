import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const clientes = await prisma.cliente.findMany();
    return res.status(200).json(clientes);
  }

  if (req.method === "POST") {
    const data = req.body;
    try {
      const cliente = await prisma.cliente.create({ data });
      return res.status(201).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: "Error creando cliente" });
    }
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
