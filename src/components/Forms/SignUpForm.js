import { Timestamp } from 'firebase/firestore';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormService from 'services/FormService';
import UserAuthService from 'services/UserAuthService';

const SignUpForm = () => {

    const [formState, setFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [formStatus, setFormStatus] = useState('');

    const handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        setFormState({
            ...formState,
            [name]: value
        });        
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormStatus('');
        try {
            await UserAuthService.signUpUser({dateCreated: Timestamp.now(), ...formState});
        } catch (error) {
            setFormStatus('Error');
        }
        
    }

    return (
        <Form id="SignUpForm" className="mb-3"  onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="SignUpFormFirstName">
				<Form.Label>First Name*</Form.Label>
				<Form.Control type="text" name="firstName" value={formState.firstName} onChange={handleChange}  required/>
			</Form.Group>

            <Form.Group className="mb-3" controlId="SignUpFormLastName">
				<Form.Label>Last Name</Form.Label>
				<Form.Control type="text" name="lastName" value={formState.lastName} onChange={handleChange} required/>
			</Form.Group>

            <Form.Group className="mb-3" controlId="SignUpFormEmail">
				<Form.Label>Email</Form.Label>
				<Form.Control type="email" name="email" value={formState.email} onChange={handleChange} autoComplete="off" required />
			</Form.Group>

            <Form.Group className="mb-3" controlId="SignUpFormPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" name="password" value={formState.password} onChange={handleChange} autoComplete="off" required/>
			</Form.Group>

            {formStatus == 'Error' && 
                <p class="error">There was an issue signing you up, please try again.</p>
            }
            
            <Button variant="primary" type="submit">
				Sign Up
			</Button>

            
            
        </Form>
    );
}

export default SignUpForm;