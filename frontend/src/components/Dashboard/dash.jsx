import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import useDashboard from '../../hooks/gastos/useDashboard';

import { Modal, Form, Button, ListGroup } from 'react-bootstrap';

import { selectStyleMesesReport, selectStyleAnioReport } from '../../common/dataEstilos';

Chart.register(...registerables);

const Dash = () => {
    const { topCategoria, saldoActual, ingresosTotales } = useDashboard();
    const chartRef = useRef(null);

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
        <div className='container mt-2'>
            <div className="d-flex flex-column align-items-start mb-2">
                <h3 className="mb-0">Reportes</h3>
                <div className="d-flex justify-content-between align-items-center my-2 w-100">
                    <Form.Control
                        type="text"
                        placeholder="Año"
                        className="ms-auto"
                        style={selectStyleAnioReport}
                    />
                    <Form.Select
                        aria-label="Seleccionar mes"
                        style={selectStyleMesesReport}
                        className="ms-2"
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
            <div className="cards-container">
                <div className="card">
                    <h3>Balance Actual</h3>
                    <p>{`$ ${saldoActual}`}</p>
                </div>
                <div className="card">
                    <h3>Ingresos Totales</h3>
                    <p>{`$ ${ingresosTotales}`}</p>
                </div>
                <div className="card">
                    <h3>Gastos Totales</h3>
                    <p>₡ 500,000</p>
                </div>
            </div>
            <h3>Gastos por categoria</h3>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default Dash;
