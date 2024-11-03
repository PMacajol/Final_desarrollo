"use client";

import { useState } from "react";

const ClienteForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    genero: "",
    fechaNacimiento: "",
    estadoCivil: "",
    direccion: "",
    salario: "",
    areaTrabajo: "",
    usuarioCreador: 0,
    estadoInformacion: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/pages/api/emkpleados/index.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Cliente creado");
        setFormData({
          nombre: "",
          apellido: "",
          genero: "",
          fechaNacimiento: "",
          estadoCivil: "",
          direccion: "",
          salario: "",
          areaTrabajo: "",
          usuarioCreador: 0,
          estadoInformacion: true,
        });
      } else {
        alert("Error creando cliente");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleInputChange}
        placeholder="Nombre"
        required
      />
      <input
        name="apellido"
        value={formData.apellido}
        onChange={handleInputChange}
        placeholder="Apellido"
      />
      <input
        name="genero"
        value={formData.genero}
        onChange={handleInputChange}
        placeholder="Género"
        required
      />
      <input
        name="fechaNacimiento"
        type="date"
        value={formData.fechaNacimiento}
        onChange={handleInputChange}
        required
      />
      <input
        name="estadoCivil"
        value={formData.estadoCivil}
        onChange={handleInputChange}
        placeholder="Estado Civil"
        required
      />
      <input
        name="direccion"
        value={formData.direccion}
        onChange={handleInputChange}
        placeholder="Dirección"
        required
      />
      <input
        name="salario"
        type="number"
        step="0.01"
        value={formData.salario}
        onChange={handleInputChange}
        placeholder="Salario"
        required
      />
      <input
        name="areaTrabajo"
        value={formData.areaTrabajo}
        onChange={handleInputChange}
        placeholder="Área de Trabajo"
        required
      />
      <input
        name="usuarioCreador"
        type="number"
        value={formData.usuarioCreador}
        onChange={handleInputChange}
        placeholder="ID del Usuario Creador"
        required
      />
      <label>
        Estado Información
        <input
          name="estadoInformacion"
          type="checkbox"
          checked={formData.estadoInformacion}
          onChange={handleInputChange}
        />
      </label>
      <button type="submit">Crear Cliente</button>
    </form>
  );
};

export default ClienteForm;
