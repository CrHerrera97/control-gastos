// Archivo de comunicacion con las apis del backend

const url = import.meta.env.VITE_API_URL;
const port = import.meta.env.VITE_PORT;

// Obtener reportes gastos

export const fetchTopGastosCategoria = async (mes,anio) => {
    const response = await fetch(`${url}:${port}/api/gastos/reportes/gastos/top-categoria?anio=${anio}&mes=${mes}`)
    if(!response.ok) throw new Error('Error al obtener la categoria de los gastos');
    return await response.json()
}

export const fetchSaldoActual = async () => {
    const response = await fetch(`${url}:${port}/api/gastos/saldo/amount`)
    if(!response.ok) throw new Error('Error al obtener el saldo');
    return await response.json()
}

export const fetchIngresosTotales = async () => {
    const response = await fetch(`${url}:${port}/api/ingresos/total/amount`)
    if(!response.ok) throw new Error('Error al obtener el ingreso');
    return await response.json()
}