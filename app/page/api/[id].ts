import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  if (req.method === "GET") {
    const cliente = await prisma.cliente.findUnique({
      where: { id: Number(id) },
    });
    return res.status(200).json(cliente);
  }

  if (req.method === "PUT") {
    const data = req.body;
    try {
      const cliente = await prisma.cliente.update({
        where: { id: Number(id) },
        data,
      });
      return res.status(200).json(cliente);
    } catch (error) {
      return res.status(500).json({ error: "Error actualizando cliente" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await prisma.cliente.delete({ where: { id: Number(id) } });
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ error: "Error eliminando cliente" });
    }
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
