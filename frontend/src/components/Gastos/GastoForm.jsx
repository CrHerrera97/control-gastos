import { Table, Spinner, Modal, Form, Button, ListGroup } from 'react-bootstrap';

// Obtengo los estados a través de las props
const GastosForm = ({ showModal, handleClose, tipoModal, currentGasto, setCurrentGasto, handleSaveChanges, handleCategoriaChange, filteredCategoriasGasto, handleCategoriaGastoSelect }) => {
    return (
      <div>
      {/* Modal Ingresar/Editar */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
          <Modal.Title>{tipoModal}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {currentGasto !== null && (
            <Form>
            <Form.Group controlId="id">
          <Form.Label>Id Gasto</Form.Label>
          <Form.Control type="text" value={currentGasto.id || ''} readOnly />
            </Form.Group>
            <Form.Group controlId="idCategoria">
          <Form.Label>Id Categoría</Form.Label>
          <Form.Control
            type="text"
            value={currentGasto?.categoria?._id || ''}
            readOnly
          />
            </Form.Group>
            <Form.Group controlId="categoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
          type="text"
          value={currentGasto?.categoria?.nombre || ''}
          autoComplete="off"
          onChange={(e) => {
              handleCategoriaChange(e);
              setCurrentGasto({ ...currentGasto, categoria: { nombre: e.target.value } });
            }}
            placeholder="Escribe para buscar categorías..."
            />
            {filteredCategoriasGasto.length > 0 && (
            <ListGroup>
              {filteredCategoriasGasto.map((categoria) => (
              <ListGroup.Item
                key={categoria._id}
                onClick={() => {
                handleCategoriaGastoSelect(categoria);
                setCurrentGasto({ ...currentGasto, categoria: categoria });
                handleCategoriaChange({ target: { value: '' } }); // Clear the list
                }}
              >
                {categoria.nombre}
              </ListGroup.Item>
              ))}
            </ListGroup>
            )}
          </Form.Group>
          <Form.Group controlId="subCategoria">
            <Form.Label>Id subCategoria</Form.Label>
            <Form.Control
            type="text"
            value={currentGasto.subCategoria || ''} 
            onChange={(e) => setCurrentGasto({ ...currentGasto, subCategoria: e.target.value })}
            />
            <Form.Label>Sub Categoría</Form.Label>
            <Form.Control
            type="text"
            value={''}
            placeholder="Escribe para buscar Subcategorías..."
            />
          </Form.Group>
          {/* Descripcion */}
          <Form.Group controlId="descripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
            type="text"
            autoComplete="off"
            value={currentGasto.descripcion || ''} 
            onChange={(e) => setCurrentGasto({ ...currentGasto, descripcion: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="valor">
            <Form.Label>Valor</Form.Label>
            <Form.Control
            type="number"
            value={currentGasto.valor || ''}
            onChange={(e) => setCurrentGasto({ ...currentGasto, valor: e.target.value })}
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
      </div>
    )
}

export default GastosForm