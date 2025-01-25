// Este componente usa el hook useFetchGastos

import React from 'react';
import useFetchGastos from '../../hooks/gastos/useFetchGastos';
import { useState } from "react"

import GastosForm from './GastoForm';

import { Table, Form, Button } from 'react-bootstrap';

import { selectStyleMeses, selectStyleAnio, btnStyleAdd } from '../../common/dataEstilos'

const GastosList = () => {
  // Abrir o cerrar modal
  const [ showModal, setShowModal ] = useState(false);

  // Funcion abrir modal
  const handleShowModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false);
  
  const { gastos, loading, error } = useFetchGastos();
  
  if (loading) return <div>Cargando gastos...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
      <div className="container mt-5">
        <div className="d-flex flex-column align-items-start mb-2">
          <h3 className="mb-0">Gastos</h3>
          <div className="d-flex justify-content-between align-items-center my-2 w-100">
            <Button variant="primary" onClick={handleShowModal} style={btnStyleAdd}>
              Crear Gasto
            </Button>
            <div className="d-flex align-items-center w-100">
              <Form.Control
                type="text"
                placeholder="Año"
                value={''}
                className="ms-auto"
                style={selectStyleAnio}
                onChange={''}
              />
              <Form.Select
                aria-label="Seleccionar mes"
                style={selectStyleMeses}
                value={''}
                onChange={''}
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
        </div>
        <Table striped bordered hover responsive className="table-responsive-sm">
          <thead>
            <tr>
              <th>Categoria</th>
              <th>SubCategoria</th>
              <th>Descripcion</th>
              <th>Valor</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((gasto) => (
              <tr key={gasto._id}>
                <td>{gasto.categoriaDetalles.nombre}</td>
                <td>{gasto.subCategoriaDetalles.nombre}</td>
                <td>{gasto.descripcion || '-'}</td>
                <td>{gasto.valor}</td>
                <td>
                  <Button variant="primary" className="btn-sm mx-2">Editar</Button>
                  <Button variant="danger" className="btn-sm mx-2">Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Mostrar Modal */}
        <GastosForm showModal={showModal} handleClose={handleCloseModal} />
        {/* Crear paginacion */}
          <div className="d-flex justify-content-start my-3">
            <Button variant="primary" className="mx-2">Anterior</Button>
            <Button variant="primary" className="mx-2">Siguiente</Button>
          </div>
      </div>
  );
};
  
export default GastosList;