import React, { useState, useEffect } from 'react';

const valorTotalIngresos = () =>{

    const url = import.meta.env.VITE_API_URL;
    const port = import.meta.env.VITE_PORT;

    const [ total, setTotal] = useState(1);
    // Llamado a el fetch
    fetch(`${url}:${port}/api/ingresos/total/amount`)
    .then((response)=> response.json())
    .then((total) => {
        setTotal(total.valorTotal)
    })
    return (
        <div>Valor total Ingresos: {total}</div>
    )
}

export default valorTotalIngresos