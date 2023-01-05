import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import AddForm from '../Forms/AddForm.js';
import AddProjectForm from 'components/Forms/AddProjectForm.js';
import style from './AddModal.module.scss';

const AddModal = ({ type, title }) => {
	const [show, setShow] = useState(false);
	const { projectID } = useParams();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	return(
		<>
			<Button className={style.modalBtn} onClick={handleShow}>
			  <FaPlus className={style.icon} />{title}
			</Button>

			<Modal className={style.addModal} contentClassName={style.modalContent} show={show} onHide={handleClose}>

				<Modal.Header closeButton closeVariant="white" className={style.modalHeader}>
					<Modal.Title>{title}</Modal.Title>
				</Modal.Header>

				<Modal.Body className={style.modalBody}>
					{ type == "bug" && <AddForm handleClose={handleClose} projectID = {projectID}/>}
					{ type == "project" && <AddProjectForm handleClose={handleClose} />}
				</Modal.Body>

			</Modal>
	  </>
	);
}

export default AddModal;