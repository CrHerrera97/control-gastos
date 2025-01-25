import { Table, Spinner, Modal, Form, Button, ListGroup } from 'react-bootstrap';

// Obtengo los estados a través de las props
const GastosForm = ({ showModal, handleClose }) => {
    return (
        <div>
            <Modal show={showModal} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title></Modal.Title>
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
        </div>
        
    )
}

export default GastosForm