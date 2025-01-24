import { useState } from "react"

import { Table, Spinner, Modal, Form, Button, ListGroup } from 'react-bootstrap';

const GastosForm = () => {

    // Ponemos los estados para el modal reutilizable
    const [ showModal, setShowModal ] = useState(false);

    // Handle para modale
    // Hanlde cierre modal

    const handleCloseModal = () => setShowModal(false);

    // Handle Mostar modal

    const handleShowModal = () => {
        // Mostrar modal
        setShowModal(true)
    }

    // Todo return modal

    return (
        <div>
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
                    <Button variant="danger" onClick={()=>handleDelete(currentIngreso)}>
                      Eliminar
                    </Button>
                  </Modal.Footer>
                </Modal>
        </div>
        
    )
}

export default GastosForm