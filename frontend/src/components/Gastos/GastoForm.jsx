import { Table, Spinner, Modal, Form, Button, ListGroup } from 'react-bootstrap';

// Obtengo los estados a través de las props
const GastosForm = ({ showModal, handleClose, tipoModal }) => {
    return (
      <div>
        {/* Modal Ingresar/Editar */}
        <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{tipoModal}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que deseas eliminar este registro de ingreso?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cancelar
                </Button>
                <Button variant="danger">
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
        {/*
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{tipoModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentGasto !== null && (
          <Form>
            <Form.Group controlId="id">
            <Form.Label hidden>Id Ingreso</Form.Label>
            <Form.Control type="text" value={''} readOnly hidden />
            </Form.Group>
            <Form.Group controlId="categoria">
            <Form.Label hidden>Id Categoria</Form.Label>
            <Form.Control
              type="text"
              value={currentGasto?.categoria?._id || ''} 
              readOnly
              hidden
            />
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              value={currentGasto?.categoria?.nombre || ''}
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
              value={currentGasto.valor}
              onChange={(e) => setCurrentIngreso({ ...currentGasto, valor: e.target.value })}
            />
            </Form.Group>
            <Form.Group controlId="estado">
            <Form.Label>Estado</Form.Label>
            <Form.Check
              type="checkbox"
              label="Activo"
              checked={currentIngreso.estado}
              onChange={(e) => setCurrentIngreso({...currentGasto, estado: e.target.checked })}
            />
            </Form.Group>
          </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
          Cerrar
          </Button>
          <Button variant="primary" onClick={() => handleSaveChanges(currentGasto)}>
          Guardar Cambios
          </Button>
        </Modal.Footer>
        </Modal>
        */}

        {/* Modal Eliminar */}
        {/*
        <Modal show={modalEliminar} onHide={handleCloseDelete}>
              <Modal.Header closeButton>
                <Modal.Title>{tipo}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Estás seguro de que deseas eliminar este registro de ingreso?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseDelete}>
                  Cancelar
                </Button>
                <Button variant="danger" onClick={()=>handleDelete(currentGasto)}>
                  Eliminar
                </Button>
              </Modal.Footer>
            </Modal>
          */}
      </div>
    )
}

export default GastosForm