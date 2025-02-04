import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import useDashboard from '../../hooks/gastos/useDashboard';

Chart.register(...registerables);

const Dash = () => {
    const { topCategoria } = useDashboard();
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
            }
        };

        const ctx = chartRef.current.getContext('2d');
        if (window.myChart) window.myChart.destroy();
        window.myChart = new Chart(ctx, chartData);
    }, [topCategoria]);

    return (
        <div>
            <div>Separador mes y año</div>
            <div className="cards-container">
                <div className="card">
                    <h3>Balance Actual</h3>
                    <p>₡ 500,000</p>
                </div>
                <div className="card">
                    <h3>Ingresos Totales</h3>
                    <p>₡ 1,000,000</p>
                </div>
                <div className="card">
                    <h3>Gastos Totales</h3>
                    <p>₡ 500,000</p>
                </div>
            </div>
            <h3>Gatos por categoria</h3>
            <canvas ref={chartRef}></canvas>

            <h3>Gatos por Subcategoria</h3>
            {/*<canvas ref={chartRef}></canvas>*/}
        </div>
    );
};

export default Dash;
