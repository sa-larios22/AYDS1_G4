import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const UserAccount = () => {
  const { user, startUpdateUser } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    lastname: user?.lastname || "",
    username: user?.username || "",
    email: user?.email || "",
    password: "", // Opcional: solo se envía si se desea cambiar la contraseña
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Actualizando datos...");

    // Si el campo de contraseña está vacío, lo eliminamos del objeto formData
    const dataToSend = { ...formData };
    if (!dataToSend.password) {
      delete dataToSend.password;
    }

    try {
      const updated = await startUpdateUser(dataToSend);
      if (updated) {
        setMessage("Usuario actualizado correctamente");
      } else {
        setMessage("No se pudo actualizar el usuario. Inténtalo de nuevo.");
      }
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      setMessage(
        error.message || "Ocurrió un error al actualizar el usuario. Inténtalo de nuevo."
      );
    } finally {
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mi Perfil</h1>
      {message && <p style={styles.message}>{message}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.twoColumnLayout}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nombre:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Apellido:</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Nueva Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            placeholder="Opcional"
          />
        </div>
        <button type="submit" style={styles.button}>
          Actualizar Datos
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "40px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#2d3748",
    fontSize: "28px",
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    color: "#3182ce",
    marginBottom: "20px",
    fontSize: "16px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  twoColumnLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "600",
    color: "#4a5568",
    fontSize: "14px",
  },
  input: {
    padding: "12px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    ":focus": {
      borderColor: "#3182ce",
      boxShadow: "0 0 0 3px rgba(49, 130, 206, 0.2)",
    },
  },
  button: {
    padding: "14px",
    backgroundColor: "#3182ce",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "20px",
    transition: "background-color 0.3s ease",
    ":hover": {
      backgroundColor: "#2c5282",
    },
  },
};

export default UserAccount;