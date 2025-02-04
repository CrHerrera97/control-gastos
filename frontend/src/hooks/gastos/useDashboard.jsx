import { useState, useEffect } from 'react';

import { fetchTopGastosCategoria } from "../../services/dashboard/dashboardService";

const useDashboard = () => {

    const [ topCategoria, setTopCategoria ] = useState([])
    
    const obtenerTopCategoria = async() => {
        try {
            const data = await fetchTopGastosCategoria();
            setTopCategoria(data.result)
        } catch (error) {
            
        }    
    }
    
    useEffect(()=>{
        obtenerTopCategoria()
    },[])
    
    return {
        topCategoria
    }
}

export default useDashboard;