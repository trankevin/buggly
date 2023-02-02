import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormService from 'services/FormService';

const AddProjectForm = ({ handleClose }) => {

    const [formState, setFormState] = useState({
        projectName: '',
    });


    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setFormState({
            ...formState,
            [name]: value
        });        
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        FormService.handleAddProjectForm(formState).then(() => {
            
            // Reset Form State
            setFormState({
                projectName: '',
            });

            handleClose();
        })
    }

    return (
        <Form id="AddProjectForm" className="mb-3" onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="addProjectFormName">
				<Form.Label>Project Name</Form.Label>
				<Form.Control type="text" name="projectName" value={formState.projectName} onChange={handleChange} required/>
			</Form.Group>

            <Button variant="primary" type="submit" >
				Add Project
			</Button>
            
        </Form>
    );
}

export default AddProjectForm;