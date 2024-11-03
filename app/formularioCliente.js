import { useState } from "react";

export default function FormularioCliente() {
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
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await fetch("/api/clientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          salario: parseFloat(formData.salario), // Convertir salario a número
          usuarioCreador: parseInt(formData.usuarioCreador), // Convertir usuarioCreador a número
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMensaje("Cliente creado exitosamente");
        setFormData({
          nombre: "",
          apellido: "",
          genero: "",
          fechaNacimiento: "",
          estadoCivil: "",
          direccion: "",
          salario: "",
          areaTrabajo: "",
          usuarioCreador: "",
        });
      } else {
        const errorData = await response.json();
        setMensaje(`Error: ${errorData.error}`);
      }
    } catch (error) {
      setMensaje("Error al crear el cliente");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Género</label>
        <input
          type="text"
          name="genero"
          value={formData.genero}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Estado Civil</label>
        <input
          type="text"
          name="estadoCivil"
          value={formData.estadoCivil}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Dirección</label>
        <input
          type="text"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Salario</label>
        <input
          type="number"
          name="salario"
          value={formData.salario}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Área de Trabajo</label>
        <input
          type="text"
          name="areaTrabajo"
          value={formData.areaTrabajo}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Usuario Creador (ID)</label>
        <input
          type="number"
          name="usuarioCreador"
          value={formData.usuarioCreador}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Crear Cliente</button>
      {mensaje && <p>{mensaje}</p>}
    </form>
  );
}
