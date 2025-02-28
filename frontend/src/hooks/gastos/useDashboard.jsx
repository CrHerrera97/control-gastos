import { useState, useEffect } from 'react';

import { fetchTopGastosCategoria, fetchSaldoActual, fetchIngresosTotales } from "../../services/dashboard/dashboardService";

const useDashboard = () => {

    const [ topCategoria, setTopCategoria ] = useState([])
    const [ saldoActual, setSaldoActual ] = useState(0)
    const [ ingresosTotales, setIngresosTotales ] = useState(0)

    // Estado mes y año

    const obtenerAnioYmesActual = () => {

        const currentDate = new Date();
        const anio = currentDate.getFullYear();
        const mes = currentDate.getMonth() + 1;
        return {anio, mes}

    }

    const [ mes, setMes ] = useState(obtenerAnioYmesActual().mes)
    const [ anio, setAnio ] = useState(obtenerAnioYmesActual().anio)
    
    const obtenerTopCategoria = async() => {
        try {
            const data = await fetchTopGastosCategoria(mes,anio);
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

    const obtenerGastosTotalesPorMes = () => {
        try {
            
        } catch (error) {
            
        }
    }

    
    useEffect(()=>{
        obtenerTopCategoria();
        obtenerSaldoActual();
        obtenerIngresosTotales();
    },[anio,mes])
    
    return {
        topCategoria, saldoActual, ingresosTotales, mes, setMes, anio, setAnio
    }
}

export default useDashboard;