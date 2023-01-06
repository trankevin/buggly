import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormService from 'services/FormService';

const UpdateProjectForm = ({ project, handleClose }) => {

    const [formState, setFormState] = useState({
        projectName: project.projectName,
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

        FormService.handleUpdateProjectFormSubmit(project.id, formState).then(() => {

            handleClose();
        })
    }

    return (
        <Form id="UpdateProjectForm" className="mb-3">

            <Form.Group className="mb-3" controlId="updateProjectFormName">
				<Form.Label>Project Name</Form.Label>
				<Form.Control type="text" name="projectName" value={formState.projectName} onChange={handleChange} />
			</Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
				Update Project
			</Button>
            
        </Form>
    );
}

export default UpdateProjectForm;