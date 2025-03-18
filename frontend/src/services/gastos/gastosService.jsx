// Archivo de comunicacion con las apis del backend

const url = import.meta.env.VITE_API_URL;
const port = import.meta.env.VITE_PORT;

// La idea es que se consuma a través de un localstorage
const tokenProvi = import.meta.env.VITE_TOKEN_PROVI;

const headers = {
    "Content-Type": "application/json",
    "x-token": tokenProvi
}

// Obtener los gastos

export const fetchGastos = async (paginacion,mes,anio) => {
    const response = await fetch(`${url}:${port}/api/gastos?desde=${paginacion}&anio=${anio}&mes=${mes}`,{
        method: "GET",
        headers
    })
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

// Editar un nuevo gasto
export const editGasto = async (gasto) => {

    // TODO desestructurar el gasto para obtener el id, id_catego, id_subcate etc...

    const { id, ...gastoSinId } = gasto;
    const response = await fetch(`${url}:${port}/api/gastos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(gastoSinId),
    });
    if (!response.ok) throw new Error('Error al crear el gasto');
    return await response.json();
};

export const deleteGasto = async (gasto) => {
    // TODO desestructurar el gasto para obtener el id, id_catego, id_subcate etc...

    const response = await fetch(`${url}:${port}/api/gastos/${gasto}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al eliminar el gasto');
    return await response.json();
};

// Obtener id x un nombre de categoria gasto

export const fetchCategoriaGasto = async (searchTerm) => {
    const response = await fetch(`${url}:${port}/api/categoria-gastos?nombre=${searchTerm}`)
    if(!response.ok) throw new Error('Error al obtener los gastos');
    return await response.json()
}

// Obtener id x un nombre de subcategoria gasto

export const fetchSubCategoriaGasto = async (searchTerm) => {
    const response = await fetch(`${url}:${port}/api/sub-categoria-gastos?nombre=${searchTerm}`)
    if(!response.ok) throw new Error('Error al obtener los gastos');
    return await response.json()
}