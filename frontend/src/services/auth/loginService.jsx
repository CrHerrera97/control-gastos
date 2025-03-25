// Archivo de comunicacion con las apis del backend

const url = import.meta.env.VITE_API_URL;
const port = import.meta.env.VITE_PORT;

const headers = {
    "Content-Type": "application/json",
}

export const fetchUser = async (correo, password)=>{
    const response = await fetch(`${url}:${port}/api/auth/login`, {
        method: "POST",
        headers,
        body: JSON.stringify({ correo, password })
    })
    if(!response.ok) throw new Error('Usuario o contraseña incorrecta');
    return await response.json()
}