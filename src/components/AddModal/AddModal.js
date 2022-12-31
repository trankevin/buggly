import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaPlus } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import AddForm from '../Forms/AddForm.js';
import style from './AddModal.module.scss';

const AddModal = () => {
	const [show, setShow] = useState(false);
	// const [projectID, setProjectID] = useState('');
	const { projectID } = useParams();

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	// useEffect(() => {

	// }, [projectID]);

	return(
		<>
			<Button className={style.modalBtn} onClick={handleShow}>
			  <FaPlus className={style.icon} />Add New Bug
			</Button>

			<Modal className={style.addModal} contentClassName={style.modalContent} show={show} onHide={handleClose}>
				<Modal.Header closeButton closeVariant="white" className={style.modalHeader}>
					<Modal.Title>Add New Bug</Modal.Title>
				</Modal.Header>
				<Modal.Body className={style.modalBody}>
					<AddForm handleClose={handleClose} 
							projectID = {projectID}
					/>
				</Modal.Body>
			</Modal>
	  </>
	);
}

// class AddModalbk extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//     	'show': false,
// 		'projectID': ''
//     };

//     this.handleClose = () => this.setState({'show':false});
//     this.handleShow = () => this.setState({'show':true});
//   }

//   handleAddFormSubmit(formData) {
//   	this.props.submitHandler(formData);
//   	this.handleClose();
//   }

//   componentDidMount() {
// 	const path = window.location.pathname.split("/");
// 	if(path[1] == 'project' && path[2]) this.setState({'projectID': path[2]});
// 	//console.log(path[2]);
//   }

//   componentDidUpdate(prevProps, prevState) {
// 	const path = window.location.pathname.split("/");
// 	console.log(prevState, path[2]);
// 	// if (path[2] !== this.state.projectID) {
// 	// 	const path = window.location.pathname.split("/");
// 	// 	console.log(path[2]);
// 	// 	if(path[1] == 'project' && path[2]) this.setState({'projectID': path[2]});
// 	// }
//   }
  

//   render() {
//   	return(
//   		<>
//   			<Button className={style.modalBtn} onClick={this.handleShow}>
// 		        <FaPlus className={style.icon} />Add New Bug
// 		    </Button>

// 			<Modal className={style.addModal} contentClassName={style.modalContent} show={this.state.show} onHide={this.handleClose}>
// 				<Modal.Header closeButton closeVariant="white" className={style.modalHeader}>
// 				<Modal.Title>Add New Bug</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body className={style.modalBody}>
// 					<AddForm handleClose={this.handleClose} 
// 							submitHandler={(formData) => this.handleAddFormSubmit(formData)}
// 							projectID = {this.state.projectID}
// 					/>
// 				</Modal.Body>
// 			</Modal>
// 	    </>
//   	);
    
//   }
// }

export default AddModal;