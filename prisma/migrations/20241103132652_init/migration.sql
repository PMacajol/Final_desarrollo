-- CreateTable
CREATE TABLE "cliente" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT,
    "genero" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "estadoCivil" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "salario" DOUBLE PRECISION NOT NULL,
    "areaTrabajo" TEXT NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" TIMESTAMP(3) NOT NULL,
    "usuarioCreador" INTEGER NOT NULL,
    "estadoInformacion" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "cliente_pkey" PRIMARY KEY ("id")
);
