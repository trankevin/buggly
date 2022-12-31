import logo from './bug-icon.png';
import React, { Component, useEffect, useState } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';
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
import ProjectsPage from 'pages/ProjectsPage';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';

const App = () => {
    
    const dispatch = useDispatch();
    const myProjects = useSelector(state => state.myProjects);
    const [project, setProject] = useState({});
   
    useEffect(() => {
      // Fetch bugs from Firestore
      dispatch(fetchBugs());

      // Fetch user projects
      dispatch(fetchMyProjects());
      
    }, [])

    // useEffect(() => {
    //   if(projectID){
    //     console.log(projectID);
    //     const project = myProjects.filter(project => project.id == projectID)[0];
    //     setProject(project);
    //   }
    // }, [projectID]);

    // Update current project in state
    const onChangeProject = (project) => {
      setProject(project);
    }

    return (
      <BrowserRouter>
        <ScrollToTop/>
        <ThemeProvider
        breakpoints={['xl','lg', 'md', 'sm', 'xs']}
        >
            <Container fluid>
                <Row>
                  <Col xs={12} lg={2} className="col-sidenav">
                      <SideNav onChangeProject={(project) => onChangeProject(project)}/>
                  </Col>
                  <Col xs={12} lg={{span: 10, offset: 2 }}>
                        <main>
                            <Container fluid="lg">
                              <Routes>

                                <Route path="/" element={
                                  <>
                                    <PageTitle title="Dashboard"/>
                                    <Summary/>
                                    <AddModal />
                                    <BugList />                                  
                                  </>
                                } />
                              
                                <Route exact path="/projects" element={<ProjectsPage />} />
                                <Route path="/project/:projectID" element={
                                  <>
                                    <PageTitle />
                                    <Summary />
                                    <AddModal />
                                    <BugList/>                                  
                                  </>
                                } />

                                <Route exact path='*' element={<h1>Page Not found!</h1>} />
                              </Routes>
                              
                            </Container>
                        </main>
                  </Col>
                </Row>
                
            </Container>
        </ThemeProvider>
      </BrowserRouter>
    
    );
    
}

export default App;
