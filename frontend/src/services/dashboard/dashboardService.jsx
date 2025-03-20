// Archivo de comunicacion con las apis del backend

const url = import.meta.env.VITE_API_URL;
const port = import.meta.env.VITE_PORT;

// La idea es que se consuma a través de un localstorage
const tokenProvi = import.meta.env.VITE_TOKEN_PROVI;

const headers = {
    "Content-Type": "application/json",
    "x-token": tokenProvi
}


// Obtener reportes gastos

export const fetchTopGastosCategoria = async (mes,anio) => {
    const response = await fetch(`${url}:${port}/api/gastos/reportes/gastos/top-categoria?anio=${anio}&mes=${mes}`,{
        headers
    })
    if(!response.ok) throw new Error('Error al obtener la categoria de los gastos');
    return await response.json()
}

export const fetchSaldoActual = async () => {
    const response = await fetch(`${url}:${port}/api/gastos/saldo/amount`,{
        headers
    })
    if(!response.ok) throw new Error('Error al obtener el saldo');
    return await response.json()
}

export const fetchIngresosTotales = async () => {
    const response = await fetch(`${url}:${port}/api/ingresos/total/amount`,{
        headers
    })
    if(!response.ok) throw new Error('Error al obtener el ingreso');
    return await response.json()
}

export const fetchGastosTotales = async () => {
    const response = await fetch(`${url}:${port}/api/gastos/total/amount`,{
        headers
    })
    if(!response.ok) throw new Error('Error al obtener el ingreso');
    return await response.json()
}

export const fetchGastosTotalesMes = async (mes,anio) => {
    const response = await fetch(`${url}:${port}/api/gastos/total/amount/mes?anio=${anio}&mes=${mes}`,{
        headers
    })
    if(!response.ok) throw new Error('Error al obtener el ingreso');
    return await response.json()
}

export const fetchIngresosTotalesMes = async (mes,anio) => {
    const response = await fetch(`${url}:${port}/api/ingresos/total/mes?anio=${anio}&mes=${mes}`,{
        headers
    })
    if(!response.ok) throw new Error('Error al obtener el ingreso');
    return await response.json()
}