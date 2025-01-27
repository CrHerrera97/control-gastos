// Archivo de comunicacion con las apis del backend

const url = import.meta.env.VITE_API_URL;
const port = import.meta.env.VITE_PORT;

// Obtener los gastos

export const fetchGastos = async () => {
    const response = await fetch(`${url}:${port}/api/gastos?estado=true`)
    if(!response.ok) throw new Error('Error al obtener los gastos');
    return await response.json()
}

// Crear un nuevo gasto
export const createGasto = async (gasto) => {
    const response = await fetch(`${url}:${port}/api/gastos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([gasto]),
    });
    if (!response.ok) throw new Error('Error al crear el gasto');
    return await response.json();
};

// Obtener id x un nombre de categoria gasto

export const fetchCategoriaGasto = async (searchTerm) => {
    const response = await fetch(`${url}:${port}/api/categoria-gastos?nombre=${searchTerm}`)
    if(!response.ok) throw new Error('Error al obtener los gastos');
    return await response.json()
}