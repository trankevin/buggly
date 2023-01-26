import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormService from 'services/FormService';
import UserAuthService from 'services/UserAuthService';

const LoginForm = () => {

    const [formState, setFormState] = useState({
        email: '',
        password: ''
    });

    //const [formStatus, setFormStatus] = useState();

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
        UserAuthService.login(formState.email, formState.password);
    }

    return (
        <Form id="LoginForm" className="mb-3">

            <Form.Group className="mb-3" controlId="LoginFormEmail">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" name="email" value={formState.email} onChange={handleChange} autoComplete="username" />
			</Form.Group>

            <Form.Group className="mb-3" controlId="LoginFormPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" name="password" value={formState.password} onChange={handleChange} autoComplete="current-password" />
			</Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>
				Login
			</Button>
            
        </Form>
    );
}

export default LoginForm;