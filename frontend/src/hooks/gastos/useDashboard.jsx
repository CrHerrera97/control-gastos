import { useState, useEffect } from 'react';

import { fetchTopGastosCategoria, fetchSaldoActual, fetchIngresosTotales, fetchGastosTotales, fetchGastosTotalesMes, fetchIngresosTotalesMes } from "../../services/dashboard/dashboardService";

const useDashboard = () => {

    const [ topCategoria, setTopCategoria ] = useState([])
    const [ saldoActual, setSaldoActual ] = useState(0)
    const [ ingresosTotales, setIngresosTotales ] = useState(0)

    const [ gastosTotales, setGastosTotales ] = useState(0)

    const [ gastosTotalesMes, setGastosTotalesMes ] = useState(0)

    const [ ingresosTotalesMes, setIngresosTotalesMes ] = useState(0)

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

    const obtenerGastosTotales = async() => {
        try {
            const data = await fetchGastosTotales();
            setGastosTotales(data.valorTotal)
        } catch (error) {
            
        }  
    }

    const obtenerGastosTotalesMes = async() => {
        try {
            const data = await fetchGastosTotalesMes(mes,anio)
            setGastosTotalesMes(data.valorTotal)
        } catch (error) {
            
        }  
    }


    const obtenerGastosTotalesPorMes = async () => {
        try {
            const data = await fetchIngresosTotalesMes(mes,anio);
            setIngresosTotalesMes(data.valorTotal)
        } catch (error) {
            
        }
    }

    
    useEffect(()=>{
        obtenerTopCategoria();
        obtenerSaldoActual();
        obtenerIngresosTotales();
        obtenerGastosTotalesPorMes();
        obtenerGastosTotales();
        obtenerGastosTotalesMes();
    },[anio,mes])
    
    return {
        topCategoria, saldoActual, ingresosTotales, gastosTotales, gastosTotalesMes, ingresosTotalesMes, mes, setMes, anio, setAnio
    }
}

export default useDashboard;