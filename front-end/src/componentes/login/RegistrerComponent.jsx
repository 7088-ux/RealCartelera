import React, { useState } from "react";
import './RegisterComponent2.css';
import { FaUser, FaLock, FaPhone } from "react-icons/fa"; 
import { Link } from "react-router-dom"; 

function RegisterComponent() {
    // Estados para manejar los valores del formulario
    const [username, setUsername] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene la recarga de la página

        // Validación básica (opcional)
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        // Estructura de los datos a enviar al backend
        const userData = {
            nombre: username,
            celular: numero,
            gmail: email,
            password: password
        };

        try {
            const response = await fetch("http://localhost:8080/api/usuarios/registro", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData) // Convierte los datos a JSON
            });

            if (response.ok) {
                const result = await response.json();
                alert("Usuario registrado con éxito");
                // Redireccionar o realizar alguna acción después del registro exitoso
            } else {
                alert("Error en el registro, intente nuevamente");
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            alert("Ocurrió un error. Intente más tarde.");
        }
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Register Page</h1>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Username" 
                        required 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="text" 
                        placeholder="Número" 
                        required 
                        value={numero}
                        onChange={(e) => setNumero(e.target.value)} 
                    />
                    <FaPhone className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="email" 
                        placeholder="Correo" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Password" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        required 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                    />
                    <FaLock className="icon" />
                </div>
                
                <button type="submit">Register</button>
            </form>
            <div className="register-link">
                <p>Ya tienes una cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </div>
        </div>
    );
}

export default RegisterComponent;