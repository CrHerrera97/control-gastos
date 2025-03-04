import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import useDashboard from '../../hooks/gastos/useDashboard';

import { Modal, Form, Button, ListGroup } from 'react-bootstrap';

import { selectStyleMesesReport, selectStyleAnioReport } from '../../common/dataEstilos';

Chart.register(...registerables);

const Dash = () => {
    const { topCategoria, saldoActual, ingresosTotales, gastosTotales, gastosTotalesMes, ingresosTotalesMes, mes, setMes, anio, setAnio } = useDashboard();
    const chartRef = useRef(null);

    // Manejador anio
    const handleAnio = (event) => {
        setAnio(event.target.value)
    }
    
    // Manejado mes
    
    const handleMes = (event) => {
        setMes(event.target.value)
    }

    useEffect(() => {
        if (!chartRef.current || !topCategoria) return;

        const nombres = topCategoria.map(item => item.categoriaDetalles.nombre);
        const valores = topCategoria.map(item => item.totalGastos);

        const chartData = {
            type: 'bar',
            data: {
            labels: nombres,
            datasets: [{
                label: 'Total Gastado',
                data: valores,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff']
            }]
            },
            options: {
            scales: {
                x: {
                display: false
                },
                y: {
                display: false
                }
            }
            }
        };

        const ctx = chartRef.current.getContext('2d');
        if (window.myChart) window.myChart.destroy();
        window.myChart = new Chart(ctx, chartData);
    }, [topCategoria]);

    return (
        <div className='container mt-4'>
            <div className="d-flex flex-column align-items-start mb-4">
                <h3 className="mb-3">Reportes</h3>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <Form.Control
                        type="text"
                        placeholder="Año"
                        value={anio}
                        className="ms-auto"
                        style={selectStyleAnioReport}
                        onChange={handleAnio}
                    />
                    <Form.Select
                        aria-label="Seleccionar mes"
                        style={selectStyleMesesReport}
                        value={mes}
                        onChange={handleMes}
                        className="ms-3"
                    >
                        <option value="1">Enero</option>
                        <option value="2">Febrero</option>
                        <option value="3">Marzo</option>
                        <option value="4">Abril</option>
                        <option value="5">Mayo</option>
                        <option value="6">Junio</option>
                        <option value="7">Julio</option>
                        <option value="8">Agosto</option>
                        <option value="9">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                    </Form.Select>
                </div>
            </div>
            
            <div className="cards-container mb-4">

                <div className="card mb-3 p-3 shadow-sm">
                    <h4 className="card-title">Balance Actual</h4>
                    <p className="card-text">{`$ ${saldoActual.toLocaleString('es-CO')}`}</p>
                </div>
                
                <div className="card mb-3 p-3 shadow-sm">
                    <h4 className="card-title">Ingresos</h4>
                    <div className="d-flex justify-content-between">
                        <p className="card-text">{`Totales: $ ${ingresosTotales.toLocaleString('es-CO')}`}</p>
                        <p className="card-text">{`Mes: $ ${ingresosTotalesMes.toLocaleString('es-CO')}`}</p>
                    </div>
                </div>

                <div className="card mb-3 p-3 shadow-sm">
                    <h4 className="card-title">Gastos</h4>
                    <div className="d-flex justify-content-between">
                        <p className="card-text">{`Totales: $ ${gastosTotales.toLocaleString('es-CO')}`}</p>
                        <p className="card-text">{`Mes: $ ${gastosTotalesMes.toLocaleString('es-CO')}`}</p>
                    </div>
                </div>
            </div>
            
            <h3 className="mb-3">Gastos por categoria</h3>
            <canvas ref={chartRef} className="shadow-sm p-3 mb-5 bg-white rounded"></canvas>
        </div>
    );
};

export default Dash;
