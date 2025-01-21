import React, { useState, useEffect } from 'react';

const valorTotalIngresos = () =>{
    const [ total, setTotal] = useState(1);
    // Llamado a el fetch
    fetch('http://172.16.6.102:3000/api/ingresos/total/amount')
    .then((response)=> response.json())
    .then((total) => {
        setTotal(total.valorTotal)
    })
    return (
        <div>Valor total Ingresos: {total}</div>
    )
}

export default valorTotalIngresos