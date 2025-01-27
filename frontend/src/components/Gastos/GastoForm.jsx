import { Table, Spinner, Modal, Form, Button, ListGroup } from 'react-bootstrap';

// Obtengo los estados a través de las props
const GastosForm = ({ showModal, handleClose, tipoModal, currentGasto, setCurrentGasto, handleSaveChanges }) => {
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
            <Form.Control type="text" value={''} readOnly/>
            </Form.Group>
            <Form.Group controlId="categoria">
            <Form.Label>Id Categoria</Form.Label>
            <Form.Control
              type="text"
              value={currentGasto.categoria || ''} 
              onChange={(e) => setCurrentGasto({ ...currentGasto, categoria: e.target.value })}
            />
            <Form.Label>Categoría</Form.Label>
            <Form.Control
              type="text"
              value={''}
              //onChange={}
              placeholder="Escribe para buscar categorías..."
            />
            {/*showSuggestions && filteredCategorias.length > 0 && (
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
            )*/}
            </Form.Group>
            {/* Sub categorias*/}
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
              //onChange={(e) => setCurrentGasto({ ...currentGasto, subCategoria: e.target.value })}
              placeholder="Escribe para buscar Subcategorías..."
            />
            {/*showSuggestions && filteredCategorias.length > 0 && (
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
            )*/}
            </Form.Group>
            {/* Descripcion */}
            <Form.Group controlId="descripcion">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              value={currentGasto.descripcion || ''} 
              onChange={(e) => setCurrentGasto({ ...currentGasto, descripcion: e.target.value })}
              //onChange={(e) => setCurrentIngreso({ ...currentGasto, valor: e.target.value })}
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
          <Button variant="primary" onClick={()=>handleSaveChanges(currentGasto)}>
          Guardar Cambios
          </Button>
        </Modal.Footer>
        </Modal>
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