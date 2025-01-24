// Archivo de comunicacion con las apis del backend

const url = import.meta.env.VITE_API_URL;
const port = import.meta.env.VITE_PORT;

// Obtener los gastos

export const fetchGastos = async () => {
    const response = await fetch(`${url}:${port}/api/gastos?estado=true`)
    if(!response.ok) throw new Error('Error al obtener los gastos');
    return await response.json()
}