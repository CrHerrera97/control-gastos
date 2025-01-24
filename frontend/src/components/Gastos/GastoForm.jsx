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
        {/* Modal */}
        
    )
}

export default GastosForm