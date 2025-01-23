import React, { useState, useEffect } from 'react';
import { Table, Spinner, Modal, Form, Button, ListGroup } from 'react-bootstrap';

const IngresoList = () => {

  // Url de la api y puerto
  const url = import.meta.env.VITE_API_URL;
  const port = import.meta.env.VITE_PORT;
  // Estados leer ingresos
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Reutilizar el modal para ingresos y ediciones
  const [ tipo, setTipo ] = useState(null);
  
  // Estado de busqueda de categorías
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Estados del modal
  const [show, setShow] = useState(false);
  const [currentIngreso, setCurrentIngreso] = useState(null);
  
  // Manejadores del modal
  const handleClose = () => setShow(false);
  const handleShow = (ingreso) => {
    if(!ingreso){
      setTipo('Ingreso')
      setCurrentIngreso({ categoriaId : "", categoria: {}, valor: "", estado: true })
    }else{
      setTipo('Editar')
      setCurrentIngreso(ingreso);
    }
    setShow(true);
  };

  // Obtener ingresos
  useEffect(() => {
    fetch(`${url}:${port}/api/ingresos`)
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

  // Buscar categorías
  const fetchCategorias = async (searchTerm) => {
    try {
      const response = await fetch(`${url}:${port}/api/categorias-ingresos?nombre=${searchTerm}`);
      const data = await response.json();
      setFilteredCategorias(data.categoriasIngreso || []);
    } catch (error) {
      console.error('Error buscando categorías:', error);
    }
  };

  // Manejo de cambios en el campo de búsqueda de categoría
  const handleCategoriaChange = (e) => {
    const searchTerm = e.target.value;
    setCurrentIngreso({
      ...currentIngreso,
      categoria: {
        ...currentIngreso.categoria,
        nombre: searchTerm
      }
    });

    if (searchTerm.trim()) {
      setShowSuggestions(true);
      fetchCategorias(searchTerm);  // Llamada al API con el término de búsqueda
    } else {
      setShowSuggestions(false);
      setFilteredCategorias([]);  // Limpiar las sugerencias
    }
  };

  // Selección de categoría de las sugerencias
  const handleCategoriaSelect = (categoria) => {
    setCurrentIngreso({ ...currentIngreso, categoria });
    setShowSuggestions(false);  // Ocultar sugerencias al seleccionar
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <Spinner animation="border" role="status" />
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }

  // Tener los registros actualizados
  const fetchIngresos = () => {
    fetch(`${url}:${port}/api/ingresos`)
      .then((response) => response.json())
      .then((data) => {
        setIngresos(data.ingresos); // Actualizar el estado de los ingresos
      })
      .catch((error) => {
        console.error('Error al obtener los ingresos:', error);
      });
  };
  // Guardar los cambios en el ingreso
  const handleSaveChanges = (currentIngreso) => {

    const categoriaId = currentIngreso.categoriaId
    // Si la categoria id esta vacia significa que es un ingreso
    if(categoriaId == ""){
      // Datos post
      const postOperaciones = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "categoria": currentIngreso.categoria._id,
          "valor": currentIngreso.valor,
        }),
      };
      try {
        fetch(`${url}:${port}/api/ingresos`,postOperaciones)
        .then((response)=>response.json)
        .then((respuesta) =>{
          if(respuesta){
            fetchIngresos();
            handleClose();
          }
        })
        } catch (error) {
          console.log(error)
      }
    }else{
      // Editar
      const idIngreso = currentIngreso._id;
      const categoriaIngreso = currentIngreso.categoria._id;
      const valor = currentIngreso.valor;
      const estado = currentIngreso.estado;

      const putOperaciones = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "categoria": categoriaIngreso,
          "valor": valor,
          "estado": estado
        }),
      };
  
      fetch(`${url}:${port}/api/ingresos/${idIngreso}`, putOperaciones)
        .then((response) => response.json())
        .then((respuesta) => {
          // Actualizar el estado de los ingresos sin necesidad de recargar la página
          fetchIngresos();
          handleClose();  // Cerrar el modal
        })
        .catch((error) => console.log(error));
    }

  };

  const handleDelete = (id) => {
    const deleteOperaciones = {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
    };

    fetch(`${url}:${port}/api/ingresos/${id}`, deleteOperaciones)
      .then((response) => response.json())
      .then((respuesta) => {
        console.log(respuesta);
        fetchIngresos(); 
      })
      .catch((error) => {
        console.error('Error al eliminar el ingreso:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div>
        {/* Boton crear ingreso*/}
        <button className="btn btn-primary btn-sm mr-2" onClick={()=>handleShow('')}>Crear Ingreso</button>
      </div>
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
                <button className="btn btn-primary btn-sm mr-2" onClick={() => handleShow(ingreso)}>Editar</button>
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(ingreso._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{tipo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentIngreso !== null && (
            <Form>
              <Form.Group controlId="id">
                <Form.Label hidden >Id Ingreso</Form.Label>
                <Form.Control type="text" value={currentIngreso._id} readOnly hidden />
              </Form.Group>
              <Form.Group controlId="categoria">
                <Form.Label hidden >Id Categoria</Form.Label>
                <Form.Control
                  type="text"
                  value={currentIngreso?.categoria?._id || ''} 
                  readOnly
                  hidden
                />
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={currentIngreso?.categoria?.nombre || ''}
                  onChange={handleCategoriaChange}
                  placeholder="Escribe para buscar categorías..."
                />
                {showSuggestions && filteredCategorias.length > 0 && (
                  <ListGroup>
                    {filteredCategorias.map((categoria) => (
                      <ListGroup.Item
                        key={categoria._id}
                        action
                        onClick={() => handleCategoriaSelect(categoria)}
                      >
                        {categoria.nombre}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form.Group>
              <Form.Group controlId="valor">
                <Form.Label>Valor</Form.Label>
                <Form.Control
                  type="number"
                  value={currentIngreso.valor}
                  onChange={(e) => setCurrentIngreso({ ...currentIngreso, valor: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="estado">
                <Form.Label>Estado</Form.Label>
                <Form.Check
                  type="checkbox"
                  label="Activo"
                  checked={currentIngreso.estado}
                  onChange={(e) => setCurrentIngreso({...currentIngreso, estado: e.target.checked })}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleSaveChanges(currentIngreso)}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IngresoList;