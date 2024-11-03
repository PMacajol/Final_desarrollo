import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      try {
        const empleado = await prisma.empleado.findUnique({
          where: { id: Number(id) },
        });
        res.status(200).json(empleado);
      } catch (error) {
        res.status(500).json({ error: "Error al obtener empleado" });
      }
      break;

    case "PUT":
      try {
        const updatedEmpleado = await prisma.empleado.update({
          where: { id: Number(id) },
          data: req.body,
        });
        res.status(200).json(updatedEmpleado);
      } catch (error) {
        res.status(500).json({ error: "Error al actualizar empleado" });
      }
      break;

    case "DELETE":
      try {
        await prisma.empleado.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: "Error al eliminar empleado" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Método ${method} No Permitido`);
      break;
  }
}
