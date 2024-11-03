import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const empleados = await prisma.empleado.findMany();
        res.status(200).json(empleados);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener empleados" });
      }
      break;

    case "POST":
      try {
        const newEmpleado = await prisma.empleado.create({
          data: req.body,
        });
        res.status(201).json(newEmpleado);
      } catch (error) {
        res.status(500).json({ error: "Error al crear empleado" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Método ${method} No Permitido`);
      break;
  }
}
