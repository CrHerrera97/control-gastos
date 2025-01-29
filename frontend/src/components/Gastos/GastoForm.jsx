import { Modal, Form, Button, ListGroup } from 'react-bootstrap';

const GastosForm = ({ 
  showModal, handleClose, tipoModal, currentGasto, setCurrentGasto, handleSaveChanges, 
  handleCategoriaChange, filteredCategoriasGasto, handleCategoriaGastoSelect, showSuggestionsCategoriaGasto, 
  handleSubCategoriaChange, showSuggestionsSubCategoriaGasto, filteredSubCategoriasGasto, handleSubCategoriaGastoSelect,
  modalEliminar, handleCloseModalEliminar, handleDelete
}) => {
  return (
    <div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{tipoModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentGasto !== null && (
            <Form>
              <Form.Group controlId="id">
                <Form.Label hidden>Id Gasto</Form.Label>
                <Form.Control hidden type="text" value={currentGasto._id || ''} readOnly />
              </Form.Group>
              <Form.Group controlId="idCategoria">
                <Form.Label hidden>Id Categoría</Form.Label>
                <Form.Control hidden type="text" value={currentGasto?.categoriaDetalles?._id || ''} readOnly />
              </Form.Group>
              <Form.Group controlId="categoria">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={currentGasto?.categoriaDetalles?.nombre || ''}
                  autoComplete="off"
                  onChange={(e) => {
                    handleCategoriaChange(e);
                    setCurrentGasto({ ...currentGasto, categoriaDetalles: { nombre: e.target.value } });
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
                          setCurrentGasto({ ...currentGasto, categoriaDetalles: categoria });
                          handleCategoriaChange({ target: { value: '' } }); // Borrar listado
                        }}
                      >
                        {categoria.nombre}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form.Group>
              <Form.Group controlId="subCategoria">
                <Form.Label hidden>Id subCategoría</Form.Label>
                <Form.Control
                  type="text"
                  hidden
                  value={currentGasto?.subCategoriaDetalles?._id || ''}
                  readOnly
                />
                <Form.Label>Sub Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={currentGasto?.subCategoriaDetalles?.nombre || ''}
                  placeholder="Escribe para buscar Subcategorías..."
                  autoComplete="off"
                  onChange={(e) => {
                    handleSubCategoriaChange(e);
                    setCurrentGasto({ ...currentGasto, subCategoriaDetalles: { nombre: e.target.value } });
                  }}
                />
                {filteredSubCategoriasGasto.length > 0 && (
                  <ListGroup>
                    {filteredSubCategoriasGasto.map((subCategoria) => (
                      <ListGroup.Item
                        key={subCategoria._id}
                        onClick={() => {
                          handleSubCategoriaGastoSelect(subCategoria);
                          setCurrentGasto({ ...currentGasto, subCategoriaDetalles: subCategoria });
                          handleSubCategoriaChange({ target: { value: '' } }); // Borrar listado
                        }}
                      >
                        {subCategoria.nombre}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Form.Group>
              <Form.Group controlId="descripcion">
                <Form.Label>Descripción</Form.Label>
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

      {/* Modal Eliminar*/}
      <Modal show={modalEliminar} onHide={handleCloseModalEliminar}>
      <Modal.Header closeButton>
        <Modal.Title>Eliminar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Estás seguro de que deseas eliminar este registro de gasto?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModalEliminar}>
          Cancelar
        </Button>
        <Button variant="danger" onClick={()=>handleDelete(currentGasto)}>
          Eliminar
        </Button>
      </Modal.Footer>
      </Modal>
    </div>
  );
};

export default GastosForm;
