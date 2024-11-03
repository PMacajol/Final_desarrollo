import { useState } from "react";

export default function EmpleadoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    genero: "",
    fechaNacimiento: "",
    estadoCivil: "",
    direccion: "",
    salario: "",
    areaTrabajo: "",
    usuarioCreador: "",
    estadoInformacion: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
      />
      {/* Añade aquí más campos según el modelo */}
      <button type="submit">Guardar Empleado</button>
    </form>
  );
}
