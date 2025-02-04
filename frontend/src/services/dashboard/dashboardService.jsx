// Archivo de comunicacion con las apis del backend

const url = import.meta.env.VITE_API_URL;
const port = import.meta.env.VITE_PORT;

// Obtener reportes gastos

export const fetchTopGastosCategoria = async () => {
    const response = await fetch(`${url}:${port}/api/gastos/reportes/gastos/top-categoria?anio=2025&mes=2`)
    if(!response.ok) throw new Error('Error al obtener la categoria de los gastos');
    return await response.json()
}