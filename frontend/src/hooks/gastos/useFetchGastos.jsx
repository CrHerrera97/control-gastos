import { useState, useEffect } from 'react';

import { fetchGastos } from '../../services/gastos/gastosService';

// Hook para obtener los gastos

const useFetchGastos = () => {
    const [gastos, setGastos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, []);
    return { gastos, loading, error };
}

export default useFetchGastos;