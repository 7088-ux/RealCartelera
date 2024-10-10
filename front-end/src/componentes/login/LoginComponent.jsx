import React, { useState } from "react"; // Importa useState
import './LoginForm.css';
import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Importa useNavigate
import axios from "axios"; // Importa axios

function LoginComponent() {
    const [gmail, setGmail] = useState(""); // Estado para el correo
    const [password, setPassword] = useState(""); // Estado para la contraseña
    const navigate = useNavigate(); // Hook para redirigir

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

        try {
            const response = await axios.post("http://localhost:8080/api/usuarios/login", {
                gmail, // Enviar el correo
                password // Enviar la contraseña
            });
            console.log("Login exitoso:", response.data);
            // Aquí puedes guardar el usuario o token en el estado, contexto, localStorage, etc.
            // Redirige a otra página, por ejemplo a la página principal
            navigate("/home");
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            // Manejo del error
            alert("Credenciales incorrectas, por favor intenta nuevamente.");
        }
    };

    return (
        <div className='wrapper'>
            <form onSubmit={handleSubmit}> {/* Agrega onSubmit */}
                <h1>Login</h1>
                <div className="input-box">
                    <input
                        type="text"
                        placeholder="Email"
                        required
                        value={gmail} // Vincula el valor con el estado
                        onChange={(e) => setGmail(e.target.value)} // Actualiza el estado
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="password"
                        placeholder="Password"
                        required
                        value={password} // Vincula el valor con el estado
                        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado
                    />
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <Link to="/register"> Register</Link></p>
                </div>
            </form>
        </div>
    );
}

export default LoginComponent;