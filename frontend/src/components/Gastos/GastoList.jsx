import React from 'react';
import useGastos from '../../hooks/gastos/useGastos';
import { useState } from "react";

import GastosForm from './GastoForm';

import { Table, Form, Button } from 'react-bootstrap';

import { selectStyleMeses, selectStyleAnio, btnStyleAdd } from '../../common/dataEstilos';

const GastosList = () => {
  // Estados modal
  const [ showModal, setShowModal ] = useState(false);
  // Estados titulo modal Ingreso, Editar
  const [ tipoModal, setTipoModal ] = useState(null);
  // Estados modal eliminar
  const [ modalEliminar, setModalEliminar ] = useState(false);
  // Estados actual gasto seleccionado
  const [ currentGasto, setCurrentGasto ] = useState(null);
  // Sugerencias de las categorias de gasto filtradas
  const [ showSuggestionsCategoriaGasto, setshowSuggestionsCategoriaGasto ] = useState(false);
  // Sugerencias de las subcategorias de gasto filtradas
  const [ showSuggestionsSubCategoriaGasto, setshowSuggestionsSubCategoriaGasto ] = useState(false);
  
  const { gastos, loading, error, agregarGasto, editarGasto, 
    filtarCategoriaGasto, filteredCategoriasGasto, 
    setfilteredCategoriasGasto, filtarSubCategoriaGasto, 
    filteredSubCategoriasGasto, setfilteredSubCategoriasGasto, 
    eliminarGasto, paginacion, setPaginacion, mes, setMes, anio, setAnio } = useGastos();

  // Manejadores abrir y cerrar modal
  const handleShowModal = (gasto) => {
    if(!gasto){
      setTipoModal('Ingreso')
      setCurrentGasto({ subCategoriaDetalles: "", descripcion: "", valor: 0 })
    }else{
      setTipoModal('Editar')
      setCurrentGasto(gasto);
    }
    setShowModal(true);
  }
  const handleCloseModal = () => setShowModal(false);

  // Manejador guardar gasto
  const handleSaveChanges = (currentGasto) => {
    // Controlar ingreso o edicion usamos el ternario por si viene vacio
    const gastoId = currentGasto._id ? currentGasto._id : 'ingreso';
    if(gastoId == "ingreso"){
      agregarGasto(currentGasto)
      handleCloseModal()
    }else{
      editarGasto(currentGasto)
      handleCloseModal()
    }
  }

  // Manejador de cambios en el campo de busqueda de categorias
  const handleCategoriaChange = (e) => {
    const searchTerm = e.target.value;
    if(searchTerm.trim()){
      setshowSuggestionsCategoriaGasto(true);
      filtarCategoriaGasto(searchTerm)
    }else{
      setshowSuggestionsCategoriaGasto(false)
      setfilteredCategoriasGasto([]);
    }
  }

    // Manejador de cambios en el campo de busqueda de subcategorias
    const handleSubCategoriaChange = (e) => {
      const searchTerm = e.target.value;
      if(searchTerm.trim()){
        setshowSuggestionsSubCategoriaGasto(true);
        filtarSubCategoriaGasto(searchTerm)
      }else{
        setshowSuggestionsSubCategoriaGasto(false)
        setfilteredSubCategoriasGasto([]);
      }
    }
  

  // Manejador para seleccionar una categoria
  const handleCategoriaGastoSelect = (categoria) => {
    setCurrentGasto({ ...currentGasto, categoria })
    setshowSuggestionsCategoriaGasto(false);
  }

  // Manejador para seleccionar una subcategoria
  const handleSubCategoriaGastoSelect = (subCategoria) => {
    setCurrentGasto({ ...currentGasto, subCategoria })
    setshowSuggestionsSubCategoriaGasto(false);
  }

  const handleShowDelete = (gasto) => {
    setCurrentGasto(gasto)
    setModalEliminar(true)
  }

  // Manejador cerrar modal eliminar
  const handleCloseModalEliminar = () => setModalEliminar(false);

  const handleDelete = (gasto) => {
    // Todo envio a custom hook para eliminar
    eliminarGasto(gasto)
    handleCloseModalEliminar();
  }

  // Manejadores de paginacion
  const sumarPaginacion = () => {
    if(gastos<5){
    }else{
      setPaginacion(paginacion+1)
    }
  }

  const restarPaginacion = () => {
    if(paginacion <= 0){
      setPaginacion(0)
    }else{
      setPaginacion(paginacion-1)
    }
  }

  // Manejador anio
  const handleAnio = (event) => {
    setAnio(event.target.value)
  }

  // Manejado mes

  const handleMes = (event) => {
    setMes(event.target.value)
  }

  
  if (loading) return <div>Cargando gastos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div className="container mt-3">
        <div className="d-flex flex-column align-items-start mb-2">
          <h3 className="mb-0">Gastos</h3>
          <div className="d-flex justify-content-between align-items-center my-2 w-100">
            <Button variant="primary" onClick={()=>handleShowModal(null)} style={btnStyleAdd}>
              Crear Gasto
            </Button>
            <div className="d-flex align-items-center w-100">
              <Form.Control
                type="text"
                placeholder="Año"
                value={anio}
                className="ms-auto"
                style={selectStyleAnio}
                onChange={handleAnio}
              />
              <Form.Select
                aria-label="Seleccionar mes"
                style={selectStyleMeses}
                value={mes}
                onChange={handleMes}
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
              <th>Fecha de Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((gasto) => (
              <tr key={gasto._id}>
                <td>{gasto.categoriaDetalles?.nombre || '-'}</td>
                <td>{gasto.subCategoriaDetalles?.nombre || '-'}</td>
                <td>{gasto.descripcion || '-'}</td>
                <td>{gasto.valor}</td>
                <td>{new Date(gasto.creadoEn).toLocaleString()}</td>
                <td>
                  <Button variant="primary" className="btn-sm mx-2" onClick={()=> handleShowModal(gasto)}>Editar</Button>
                  <Button variant="danger" className="btn-sm mx-2" onClick={()=> handleShowDelete(gasto._id)}>Eliminar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {/* Mostrar Modal */}
        <GastosForm showModal={showModal} handleClose={handleCloseModal} 
        tipoModal={tipoModal} currentGasto={currentGasto} setCurrentGasto={setCurrentGasto} 
        handleSaveChanges={handleSaveChanges} handleCategoriaChange={handleCategoriaChange} 
        filteredCategoriasGasto={filteredCategoriasGasto} handleCategoriaGastoSelect={handleCategoriaGastoSelect} 
        showSuggestionsCategoriaGasto={showSuggestionsCategoriaGasto} handleSubCategoriaChange={handleSubCategoriaChange} 
        showSuggestionsSubCategoriaGasto={showSuggestionsSubCategoriaGasto} filteredSubCategoriasGasto={filteredSubCategoriasGasto} 
        handleSubCategoriaGastoSelect={handleSubCategoriaGastoSelect} modalEliminar={modalEliminar} handleCloseModalEliminar={handleCloseModalEliminar}
        handleDelete={handleDelete}
        />
        {/* Crear paginacion */}
          <div className="d-flex justify-content-start my-3">
            <Button variant="primary" className="mx-2" onClick={()=>restarPaginacion()} >Anterior</Button>
            <Button variant="primary" className="mx-2" onClick={()=>sumarPaginacion()} >Siguiente</Button>
          </div>
      </div>
  );
};
  
export default GastosList;