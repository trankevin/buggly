// import React from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Badge from 'react-bootstrap/Badge';
import { Timestamp } from 'firebase/firestore';
import Modal from 'react-bootstrap/Modal';
import UpdateForm from 'components/Forms/UpdateForm.js';
import style from './BugList.module.scss';
import {useState, useEffect} from 'react';
import SearchBar from 'components/SearchBar/SearchBar';
import { useSelector, useDispatch } from 'react-redux';
import FormService from 'services/FormService';


const BugList = (props) => {

	const bugs = useSelector(state => state.bugs);

  	const dispatch = useDispatch();
	
	const displayStatus = (status, type) => {
		let statuses = {
			'open': { text: 'Open', badgeClass: 'primary'},
			'in-progress': { text: 'In Progress', badgeClass: 'secondary'},
			'under-review': { text: 'Under Review', badgeClass: 'warning'},
			'done': { text: 'Done', badgeClass: 'success'}
		};

		return statuses[status][type];
	}

	// Update Modal Form
	const [show, setShow] = useState(false);
	const [updateBug, setUpdateBug] = useState();

	const handleClose = () => setShow(false);
	const handleShow = (bugId) => {
		setUpdateBug(bugs.find(bug => bug.id == bugId));
		setShow(true);
	}

	const handleUpdateFormSubmit = (bugId, formData) => {
		//props.handleUpdate(bugId, formData);
		handleClose();
	}

	// Delete Confirmation Modal
	const [showDelete, setShowDelete] = useState(false);
	const [deleteBugId, setDeleteBugId] = useState(false);
	
	const handleDeleteClose = () => setShowDelete(false);
	const handleDeleteShow = (bugId) => {
		setDeleteBugId(bugId);
		setShowDelete(true);
	}
	const handleDelete = () => {

		//props.handleDelete(deleteBugId);
		FormService.handleDelete(deleteBugId);
		setShowDelete(false);
	}

	// Bug List Filters
	// ------------

	// Status 
	const [filterStatusActive, setFilterStatusActive] = useState(false);
	const filterStatus = (status) => {
		
		if(status !== filterStatusActive){
			setFilterStatusActive(status);
		}
		else {
			setFilterStatusActive(false);
		}

	}

	// Priority 
	const [filterPriorityActive, setFilterPriorityActive] = useState(false);
	const filterPriority = (priority) => {

		if(priority !== filterPriorityActive){
			setFilterPriorityActive(priority);
		}
		else {
			setFilterPriorityActive(false);
		}

	}

	// Search Bar
	const [searchValue, setSearchValue] = useState('');
	const onChangeSearchValue = (value) => {
		if(value) {
			setSearchValue(value);
		}
		else {
			setSearchValue('');
		}
	}

	// Apply filters 
	const filterBugs = () => {

		if(!bugs.length) return;

		// let bugList = props.bugList;
		let bugList = bugs;

		if(Object.keys(props.project).length) {
			bugList = bugList.filter((bug) => bug.projectID == props.project.id);
		}

		if(filterPriorityActive || filterStatusActive){
			
			bugList = bugList.filter((bug) => {
				
				if(filterPriorityActive && filterStatusActive){

					if(bug.priority == filterPriorityActive && bug.status == filterStatusActive) {
						console.log(bug);
						return true;

					}
					return false;
				}
				else{
					if(filterPriorityActive && bug.priority !== filterPriorityActive) return false;
					if(filterStatusActive && bug.status !== filterStatusActive) return false;
					return true;
				}

			});

		}

		if(searchValue) {
			bugList = bugList.filter((bug) => bug.bugTitle.toLowerCase().indexOf(searchValue) >= 0);
		}

		setBugs(bugList);
		
	}

	// Build rows of bugs
	// const [bugList, setBugList] = useState([]);
	const [bugRows, setBugRows] = useState([]);

	const setBugs = (bugList) => {
		

		const createdBugRows = bugList.map((row,i) => {
			return (
				<tr key={row.id}>
				  <td className={`${style.priority} ${row.priority}`}>{row.priority}</td>
				  <td className={style.bugTitle}>{row.bugTitle}</td>
				  <td className={style.dateAdded}>{row.dateAdded ? Timestamp.fromMillis(row.dateAdded).toDate().toLocaleDateString(undefined, {day:   '2-digit',month: '2-digit',year:  'numeric'}) : ""}</td>
				  {/* <td className={style.dateAdded}>{row.dateAdded}</td> */}
				  <td className="assignedTo">{row.assignedTo}</td>
				  <td><Badge className={style.badge} bg={displayStatus(row.status, 'badgeClass')}>{displayStatus(row.status, 'text')}</Badge></td>
				  <td><Button size="sm" variant="primary" onClick={() => handleShow(row.id)}>Edit</Button> <Button size="sm" variant="danger" onClick={() => handleDeleteShow(row.id)}>Delete</Button></td>
				</tr>
			)
		});

		//setBugList(bugs);
		setBugRows(createdBugRows);

	}

	const resetFilters = () => {

		setBugs(bugs);
		setFilterPriorityActive(false);
		setFilterStatusActive(false);
		setSearchValue('');

	}

	useEffect(() => {
		filterBugs();
	}, [bugs, filterPriorityActive, filterStatusActive, searchValue, props.project ]);

	return (
		<>	
			{/* Search Bar */}
			<SearchBar searchValue={searchValue} onChangeSearch={onChangeSearchValue} />

			{/* List Filters */}
			<div className={style.bugListFilters}>

				    <div className={style.filterPriority}>  	
				      <Button className={`priorityLow ${(filterPriorityActive == 'Low') ? 'active':''}`} size="sm" onClick={() => filterPriority('Low')}>Low</Button>
				      <Button className={`priorityMedium ${(filterPriorityActive == 'Medium') ? 'active':''}`} size="sm" onClick={() => filterPriority('Medium')}>Medium</Button>
				      <Button className={`priorityHigh ${(filterPriorityActive == 'High') ? 'active':''}`} size="sm" onClick={() => filterPriority('High')}>High</Button>
					</div>

					<div>
						{
							filterPriorityActive || filterStatusActive || searchValue ? <Button className="resetFilter" size="sm" onClick={() =>resetFilters()}>Reset Filters</Button> : ''
						}
					</div>
				    <div className={style.filterStatus}>  	
				      <Button className={(filterStatusActive == 'open') ? 'active':''} size="sm" variant="primary" onClick={() => filterStatus('open')}>Open</Button>
				      <Button className={(filterStatusActive == 'in-progress') ? 'active':''} size="sm" variant="secondary" onClick={() => filterStatus('in-progress')}>In Progress</Button>
				      <Button className={(filterStatusActive == 'under-review') ? 'active':''} size="sm" variant="warning" onClick={() => filterStatus('under-review')}>Under Review</Button>
				      <Button className={(filterStatusActive == 'done') ? 'active':''} size="sm" variant="success" onClick={() => filterStatus('done')}>Done</Button>
					</div>
			</div>	
			{/* Bug List */}
			<Table className={style.buglist} responsive>
				<thead>
				  <tr>
				    <th width="10%">Priority</th>
				    <th width="40%">Bug</th>
				    <th width="12%" className={style.dateAdded}>Date Added</th>
				    <th width="12%">Assigned To</th>
				    <th width="12%">Status</th>	
				    <th width="16%">Edit</th>
				  </tr>
				</thead>
				<tbody>
				  {bugRows}
				</tbody>
			</Table>

		  	{/* Modal - Update Form */}
		  	<Modal className={style.Modal} contentClassName={style.modalContent} show={show} onHide={handleClose}>
		        <Modal.Header closeButton closeVariant="white" className={style.modalHeader}>
		          <Modal.Title>Update Bug</Modal.Title>
		        </Modal.Header>
		        <Modal.Body className={style.modalBody}>
		        	<UpdateForm handleClose={handleClose} submitHandler={(bugId, formData) => handleUpdateFormSubmit(bugId, formData)} updateBug={updateBug}/>
		        </Modal.Body>
      		</Modal>

      		{/* Modal - Delete Confiration */}
		  	<Modal className={style.Modal} contentClassName={style.modalContent} show={showDelete} onHide={handleDeleteClose}>
		        <Modal.Header closeButton closeVariant="white" className={style.modalHeader}>
		          <Modal.Title>Are you sure?</Modal.Title>
		        </Modal.Header>
		        <Modal.Body className={style.modalBody}>
		        	<p>Bug will deleted permenantly.</p>
		        </Modal.Body>
		        <Modal.Footer className={style.modalFooter}>
		          <Button variant="primary" onClick={handleDeleteClose}>
		            Back
		          </Button>
		          <Button variant="danger" onClick={handleDelete}>
		            Delete Bug
		          </Button>
		        </Modal.Footer>
      		</Modal>
		</>
	);
}

export default BugList;