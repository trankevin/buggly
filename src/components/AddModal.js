import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddForm from './AddForm.js';
import style from './AddModal.module.scss';


class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	'show': false
    };

    this.handleClose = () => this.setState({'show':false});
    this.handleShow = () => this.setState({'show':true});
  }

  handleAddFormSubmit(formData) {
  	this.props.submitHandler(formData);
  	this.handleClose();
  }

  render() {
  	return(
  		<>
  			<Button className={style.modalBtn} onClick={this.handleShow}>
		        Add New Bug
		    </Button>

        <Modal className={style.addModal} contentClassName={style.modalContent} show={this.state.show} onHide={this.handleClose}>
	        <Modal.Header closeButton closeVariant="white" className={style.modalHeader}>
	          <Modal.Title>Add New Bug</Modal.Title>
	        </Modal.Header>
	        <Modal.Body className={style.modalBody}>
	        	 <AddForm submitHandler={(formData) => this.handleAddFormSubmit(formData)}/>
	        </Modal.Body>
	        {/*<Modal.Footer>
	          <Button variant="secondary" onClick={this.handleClose}>
	            Close
	          </Button>
	          <Button variant="primary" onClick={this.handleClose}>
	            Save Changes
	          </Button>
	        </Modal.Footer>*/}
      	</Modal>
	    </>
  	);
    
  }
}

export default AddModal;