import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Timestamp } from 'firebase/firestore';
import ProjectFormSelect from './ProjectFormSelect';
import { useDispatch } from 'react-redux';
import { addBug } from 'state/bugsSlice';
import FormService from 'services/FormService';


class UpdateForm extends React.Component {
  constructor(props) {
    super(props);

    const bug = this.props.updateBug;
    
    this.state = {
    	id: bug.id,
    	status: bug.status,
    	bugTitle: bug.bugTitle,
    	description: bug.description || '',
    	assignedTo: bug.assignedTo,
    	priority: bug.priority || 'Medium',
    	dateAdded: bug.dateAdded,
		projectID: bug.projectID
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
		let name = event.target.name;
		let value = event.target.value;
		this.setState({
		   [name]: value
		});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.value);
    event.preventDefault();

    // Call parent submitHandler function sent through props
    const {id, ...formData} = this.state;
    // this.props.submitHandler(id, formData);

	FormService.handleUpdateFormSubmit(id, formData).then(() => {
		this.props.handleClose();
	});
    
  }

  render() {
  	return(
  		<Form id="bugUpdateForm" className="mb-3">

			<Form.Group className="mb-3" controlId="addFormBugName">
				<Form.Label>Bug Title</Form.Label>
				<Form.Control type="text" name="bugTitle" value={this.state.bugTitle} onChange={this.handleChange} />
			</Form.Group>

			<input type="hidden" name="dateAdded" value={this.state.dateAdded || Date.now()}/>

			<Form.Group className="mb-3" controlId="addFormBugDescription">
			  <Form.Label>Description</Form.Label>
			  <Form.Control as="textarea" rows={3} name="description" onChange={this.handleChange} defaultValue={this.state.description}/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="addFormProject">
					<Form.Label>Project</Form.Label>
				<ProjectFormSelect handleChange={this.handleChange} defaultProject={this.state.projectID}/>
			</Form.Group>

			<Form.Group className="mb-3" controlId="addFormBugStatus">
					<Form.Label>Status</Form.Label>
				<Form.Select  aria-label="Bug Status" name="status" defaultValue={this.state.status} onChange={this.handleChange} >
				    {/*<option>Select Status</option>*/}
				    <option value="open">Open</option>
				    <option value="in-progress">In Progress</option>
				    <option value="under-review">Under Review</option>
				    <option value="done">Done</option>
				</Form.Select>
			</Form.Group>

			{/*<Form.Group className="mb-3" controlId="addFormBugPriority">
					<Form.Label>Priority</Form.Label>
				<Form.Select  aria-label="Bug Priority" name="priority" defaultValue={this.state.priority} onChange={this.handleChange} >
				    <option value="Low">Low</option>
				    <option value="Medium">Medium</option>
				    <option value="High">High</option>
				</Form.Select>
			</Form.Group>*/}

			<Form.Group className="mb-3" controlId="addFormBugPriority">
				<Form.Label>Priority</Form.Label><br/>
				<Form.Check
					inline
					label="Low"
					name="priority"
					type="radio"
					value="Low"
					onChange={this.handleChange}
					checked={this.state.priority === "Low"}
				/>
				<Form.Check
					inline
					label="Medium"
					name="priority"
					type="radio"
					value="Medium"
					onChange={this.handleChange}
					checked={this.state.priority === "Medium"}
				/>
				<Form.Check
					inline
					label="High"
					name="priority"
					type="radio"
					value="High"
					onChange={this.handleChange}
					checked={this.state.priority === "High"}
				/>
			</Form.Group>

			{/* <Form.Group className="mb-3" controlId="addFormBugAssignTo">
					<Form.Label>Assign To</Form.Label>
				<Form.Select  aria-label="Assign To" name="assignedTo" defaultValue={this.state.assignTo} onChange={this.handleChange} >
				    <option value="kevin">Kevin</option>
				    <option value="john">John</option>
				    <option value="mike">Mike</option>
				</Form.Select>
			</Form.Group> */}

			<Button variant="primary" type="submit" onClick={this.handleSubmit}>
				Update Bug
			</Button>
	    </Form>
  	);
    
  }
}

export default UpdateForm;