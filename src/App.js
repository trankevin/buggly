import logo from './bug-icon.png';
import React, { Component, useEffect, useState } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import DatabaseService from 'services/DatabaseService';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import BugList from 'components/Buglist/BugList';
import AddModal from './components/AddModal/AddModal.js';
import Summary from 'components/Summary/Summary';
import SideNav from 'components/SideNav/SideNav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PageTitle from 'components/PageTitle/PageTitle';

// Firestore
import { collection, query, orderBy, doc, getDocs, addDoc, deleteDoc, updateDoc, where } from "firebase/firestore"; 
import db from './firebase.js';


// State
import { useDispatch, useSelector } from 'react-redux'
import { fetchBugs } from 'state/bugsSlice'
import { fetchMyProjects } from 'state/myProjectsSlice'

const App = () => {
    
    const dispatch = useDispatch();
    const [project, setProject] = useState({});

    useEffect(() => {
      // Fetch bugs from Firestore
      dispatch(fetchBugs());

      // Fetch user projects
      dispatch(fetchMyProjects());
    }, [])

    // Update current project in state
    const onChangeProject = (project) => {
      setProject(project);
    }

    return (
    
        <ThemeProvider
        breakpoints={['xl','lg', 'md', 'sm', 'xs']}
        >
            <Container fluid>
                <Row>
                <Col xs={2}>
                    <SideNav onChangeProject={(project) => onChangeProject(project)}/>
                </Col>
                <Col xs={{offset: 2 }}>
                    <BrowserRouter>
                    <main>
                        <Container>
                        <PageTitle title={project.projectName || "Dashboard"}/>
                        <Summary project={project}/>
                        <AddModal />
                        <BugList 
                                // handleDelete={(bugId) => this.handleDelete(bugId)} 
                                // handleUpdate={(bugId, formData) => this.handleUpdateFormSubmit(bugId, formData)}
                                project={project}/>
                        </Container>
                    </main>
                    </BrowserRouter>
                </Col>
                </Row>
                
            </Container>
        </ThemeProvider>
    
    );
    
}

export default App;
