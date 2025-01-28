import { Modal, Form, Button, ListGroup } from 'react-bootstrap';

const GastosForm = ({ 
  showModal, handleClose, tipoModal, currentGasto, setCurrentGasto, handleSaveChanges, 
  handleCategoriaChange, filteredCategoriasGasto, handleCategoriaGastoSelect, showSuggestionsCategoriaGasto, 
  handleSubCategoriaChange, showSuggestionsSubCategoriaGasto, filteredSubCategoriasGasto, handleSubCategoriaGastoSelect 
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
                <Form.Label>Id Gasto</Form.Label>
                <Form.Control type="text" value={currentGasto.id || ''} readOnly />
              </Form.Group>
              <Form.Group controlId="idCategoria">
                <Form.Label>Id Categoría</Form.Label>
                <Form.Control type="text" value={currentGasto?.categoria?._id || ''} readOnly />
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
                <Form.Label>Id subCategoría</Form.Label>
                <Form.Control
                  type="text"
                  value={currentGasto?.subCategoria?._id || ''}
                  readOnly
                />
                <Form.Label>Sub Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={currentGasto?.subCategoria?.nombre || ''}
                  placeholder="Escribe para buscar Subcategorías..."
                  onChange={(e) => {
                    handleSubCategoriaChange(e);
                    setCurrentGasto({ ...currentGasto, subCategoria: { nombre: e.target.value } });
                  }}
                />
                {filteredSubCategoriasGasto.length > 0 && (
                  <ListGroup>
                    {filteredSubCategoriasGasto.map((subCategoria) => (
                      <ListGroup.Item
                        key={subCategoria._id}
                        onClick={() => {
                          handleSubCategoriaGastoSelect(subCategoria);
                          setCurrentGasto({ ...currentGasto, subCategoria: subCategoria });
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
    </div>
  );
};

export default GastosForm;
