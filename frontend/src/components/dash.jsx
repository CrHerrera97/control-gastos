import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Dash = () => {
    const categoriaRef = useRef(null);
    const subcategoriaRef = useRef(null);

    useEffect(() => {
        if (!categoriaRef.current || !subcategoriaRef.current) return;

        const gastosPorCategoria = {
            type: "bar",
            data: {
                labels: ["Alimentación", "Transporte", "Entretenimiento", "Salud", "Educación"],
                datasets: [{
                    label: "Total Gastado",
                    data: [500000, 200000, 150000, 180000, 220000],
                    backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"]
                }]
            }
        };

        const gastosPorSubcategoria = {
            type: "bar",
            data: {
                labels: [
                    "Supermercado", "Restaurantes", "Tienditas",
                    "Gasolina", "Pasajes",
                    "Cine", "Videojuegos", "Salidas con amigos",
                    "Medicinas", "Consultas médicas", "Seguro",
                    "Cursos", "Libros", "Materiales"
                ],
                datasets: [{
                    label: "Gastos por Subcategoría",
                    data: [
                        300000, 150000, 50000,   // Alimentación
                        120000, 80000,           // Transporte
                        50000, 60000, 40000,     // Entretenimiento
                        90000, 60000, 30000,     // Salud
                        100000, 80000, 40000     // Educación
                    ],
                    backgroundColor: [
                        "#ff6384", "#ff6384", "#ff6384",   // Alimentación
                        "#36a2eb", "#36a2eb",              // Transporte
                        "#ffce56", "#ffce56", "#ffce56",   // Entretenimiento
                        "#4bc0c0", "#4bc0c0", "#4bc0c0",   // Salud
                        "#9966ff", "#9966ff", "#9966ff"    // Educación
                    ]
                }]
            }
        };

        const categoriaCtx = categoriaRef.current.getContext("2d");
        const subcategoriaCtx = subcategoriaRef.current.getContext("2d");

        if (window.gastosPorCategoriaChart) window.gastosPorCategoriaChart.destroy();
        if (window.gastosPorSubcategoriaChart) window.gastosPorSubcategoriaChart.destroy();

        window.gastosPorCategoriaChart = new Chart(categoriaCtx, gastosPorCategoria);
        window.gastosPorSubcategoriaChart = new Chart(subcategoriaCtx, gastosPorSubcategoria);
    }, []);

    return (
        <div>
            <h2>📊 Dashboard de Gastos</h2>
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
            <div className="chart-container">
                <h2>Gastos por Categoría</h2>
                <canvas id="gastosPorCategoria" ref={categoriaRef}></canvas>
                <h2>Gastos por Subcategoría</h2>
                <canvas id="gastosPorSubcategoria" ref={subcategoriaRef}></canvas>
            </div>
        </div>
    );
};

export default Dash;
