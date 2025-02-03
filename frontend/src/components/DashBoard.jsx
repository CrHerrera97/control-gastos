import React, { useState, useEffect } from 'react';

const dashboard = () => {

    const url = import.meta.env.VITE_API_URL;
    const port = import.meta.env.VITE_PORT;

    const [total, setTotal] = useState(1);
    const [saldo, setSaldo] = useState(1);

    useEffect(() => {
        const valorTotal = () => {
            // Llamado a el fetch
            fetch(`${url}:${port}/api/ingresos/total/amount`)
            .then((response)=> response.json())
            .then((total) => {
                setTotal(total.valorTotal)
            })
        }

        const saldoActual = () => {
            // Llamado a el fetch
            fetch(`${url}:${port}/api/gastos/saldo/amount`)
            .then((response)=> response.json())
            .then((saldo) => {
                setSaldo(saldo.valorTotal)
            })
        }

        valorTotal();
        saldoActual();
    }, []);

    return (
        <div>
            <div>Valor total Ingresos: {total}</div>
            <div>Saldo: {saldo}</div>
        </div>
    )
}

export default dashboard