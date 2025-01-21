import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';

const IngresoList = () => {
  // Estado para almacenar los ingresos
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://172.16.6.102:3000/api/ingresos')
      .then((response) => response.json())
      .then((data) => {
        setIngresos(data.ingresos);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener los ingresos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }

  return (
    <div className='container mt-5'>
      <Table striped bordered hover responsive className="table-responsive-sm">
        <thead>
          <tr>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Estado</th>
            <th>Fecha de Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ingresos.map((ingreso) => (
            <tr key={ingreso._id}>
              <td>{ingreso.categoria.nombre}</td>
              <td>{ingreso.valor}</td>
              <td>{ingreso.estado ? 'Activo' : 'Inactivo'}</td>
              <td>{new Date(ingreso.creadoEn).toLocaleString()}</td>
              <td>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEdit(ingreso._id)}>Editar</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(ingreso._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

const handleEdit = (id) => {
  // Editar
  const postOperaciones = {
    method: "PUT",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "categoria": "6787e441cf43c345fac3b12b",
      "valor": 1000,
    }),
  }

  fetch(`http://172.16.6.102:3000/api/ingresos/${id}`,postOperaciones)
  .then((response) => response.json())
  .then((respuesta) => console.log(respuesta))
};

const handleDelete = (id) => {
  console.log(`Eliminar ingreso con id: ${id}`);
};

export default IngresoList;