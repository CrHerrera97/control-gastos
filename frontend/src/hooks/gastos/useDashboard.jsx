import { useState, useEffect } from 'react';

import { fetchTopGastosCategoria, fetchSaldoActual, fetchIngresosTotales } from "../../services/dashboard/dashboardService";

const useDashboard = () => {

    const [ topCategoria, setTopCategoria ] = useState([])
    const [ saldoActual, setSaldoActual ] = useState(0)
    const [ ingresosTotales, setIngresosTotales ] = useState(0)
    
    const obtenerTopCategoria = async() => {
        try {
            const data = await fetchTopGastosCategoria();
            setTopCategoria(data.result)
        } catch (error) {
            
        }    
    }

    const obtenerSaldoActual = async() => {
        try {
            const data = await fetchSaldoActual();
            setSaldoActual(data.valorTotal)
        } catch (error) {
            
        }  
    }

    const obtenerIngresosTotales = async() => {
        try {
            const data = await fetchIngresosTotales();
            setIngresosTotales(data.valorTotal)
        } catch (error) {
            
        }  
    }

    
    useEffect(()=>{
        obtenerTopCategoria();
        obtenerSaldoActual();
        obtenerIngresosTotales();
    },[])
    
    return {
        topCategoria, saldoActual, ingresosTotales
    }
}

export default useDashboard;