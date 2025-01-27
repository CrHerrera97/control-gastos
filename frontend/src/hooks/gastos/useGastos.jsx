import { useState, useEffect } from 'react';

import { fetchGastos, createGasto, fetchCategoriaGasto } from '../../services/gastos/gastosService';

// Hook para obtener los gastos

const useGastos = () => {
    const [ gastos, setGastos ] = useState([]);
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    // Estados busqueda categorias gasto
    const [ filteredCategoriasGasto, setfilteredCategoriasGasto ] = useState([]);
    

    useEffect(()=>{
        const loadGastos = async () => {
            try {
                const data = await fetchGastos(); 
                // El estado de gasto va a ser el ingreso al objeto data y al obj gastos
                setGastos(data.gastos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadGastos();
    }, [ gastos ]);

    const agregarGasto = async (gasto) => {
        setLoading(true);
        try {
            const newGasto = await createGasto(gasto);
            setGastos((prevGastos) => [...prevGastos, newGasto]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const filtarCategoriaGasto = async (searchTerm) => {
        try {
            const data = await fetchCategoriaGasto(searchTerm)
            setfilteredCategoriasGasto(data.categoriasGasto)
        } catch (error) {
            setError(error.message)
        }

    }

    return { gastos, loading, error, agregarGasto, filtarCategoriaGasto, filteredCategoriasGasto, setfilteredCategoriasGasto };
}

export default useGastos;