import React, { useState, useEffect } from 'react';
import { Table, Spinner, Modal, Form, Button, ListGroup } from 'react-bootstrap';

const IngresoList = () => {
  const [ingresos, setIngresos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estado de busqueda de categorías
  const [filteredCategorias, setFilteredCategorias] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Estados del modal
  const [show, setShow] = useState(false);
  const [currentIngreso, setCurrentIngreso] = useState(null);
  
  // Manejadores del modal
  const handleClose = () => setShow(false);
  const handleShow = (ingreso) => {
    setCurrentIngreso(ingreso);
    setShow(true);
  };

  // Obtener ingresos
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
  
  // Buscar categorías
  const fetchCategorias = async (searchTerm) => {
    try {
      const response = await fetch(`http://172.16.6.102:3000/api/categorias-ingresos?nombre=${searchTerm}`);
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

  // Guardar los cambios en el ingreso
  const handleSaveChanges = (currentIngreso) => {
    const idIngreso = currentIngreso._id;
    const categoriaIngreso = currentIngreso.categoria._id;
    const valor = currentIngreso.valor;

    const postOperaciones = {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "categoria": categoriaIngreso,
        "valor": valor,
      }),
    };

    fetch(`http://172.16.6.102:3000/api/ingresos/${idIngreso}`, postOperaciones)
      .then((response) => response.json())
      .then((respuesta) => {
        // Actualizar el estado de los ingresos sin necesidad de recargar la página
        setIngresos((prevIngresos) =>
          prevIngresos.map((ingreso) =>
            ingreso._id === idIngreso
              ? { ...ingreso, categoria: currentIngreso.categoria, valor: currentIngreso.valor }
              : ingreso
          )
        );
        handleClose();  // Cerrar el modal
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (id) => {
    console.log(`Eliminar ingreso con id: ${id._id}`);
  };

  return (
    <div className="container mt-5">
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
                <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(ingreso)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Ingreso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentIngreso && (
            <Form>
              <Form.Group controlId="id">
                <Form.Label>Id Ingreso</Form.Label>
                <Form.Control type="text" value={currentIngreso._id} readOnly />
              </Form.Group>
              <Form.Group controlId="categoria">
                <Form.Label>Id Categoria</Form.Label>
                <Form.Control
                  type="text"
                  value={currentIngreso.categoria._id} 
                  readOnly
                />
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={currentIngreso.categoria.nombre || ''}
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
                  disabled
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