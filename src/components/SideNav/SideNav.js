import DatabaseService from 'services/DatabaseService';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import logo from '../../bug-icon.png';
import style from './SideNav.module.scss'
import { FaHome, FaFolderOpen } from "react-icons/fa";
import { Badge } from 'react-bootstrap';

export default function SideNav({ onChangeProject }) {
    
    //const [myProjects, setMyProjects] = useState([]);
    const myProjects = useSelector(state => state.myProjects);
    const [currentProject, setCurrentProject] = useState({});
    const { pathname } = useLocation();

    const onClickProjectLink = (e) => {
       // e.preventDefault();
        const project = myProjects.filter(project => project.id == e.target.dataset.projectId)[0];
        setCurrentProject(project);
        
        //onChangeProject(project);
    }

    const [showMobileNav, setShowMobileNav] = useState(false);

    const handleClose = () => setShowMobileNav(false);
    const handleShow = () => setShowMobileNav(true);

    return(
        <>
            <Navbar bg="transparent" variant="dark" expand="lg" className={`${style.nav} mb-1`}>
                <Container fluid="lg">
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} onClick={handleShow}/>
                    <Navbar.Brand className='brand'>
                        <a href="/">
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}
                            Buggly
                        </a></Navbar.Brand>
                    
                    <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-lg`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
                    placement="start"
                    show={showMobileNav}
                    onHide={handleClose}
                    >
                    <Offcanvas.Header closeButton>
                        <div></div>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                            />{' '}Buggly
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                    <Nav defaultActiveKey={pathname} className={` flex-column`} align-items-end="true">
                        <Nav.Link eventKey="/" as={Link} to="/" onClick={handleClose}><FaHome/> Dashboard</Nav.Link>
                        {/* <Link to="/projects" className="nav-link">Projects</Link> */}
                        <Nav.Link eventKey="/projects" as={Link} to="/projects" onClick={handleClose}><FaFolderOpen/> Projects</Nav.Link>
                        {myProjects.map((project) => {
                            return (
                                <Nav.Link key={project.id} 
                                    eventKey={`/project/${project.id}`}
                                    as={Link} to={`/project/${project.id}`}
                                    data-project-id={project.id} 
                                    // onClick={onClickProjectLink} 
                                    onClick={handleClose}
                                    //${project.id == currentProject.id ? "active" : ""}
                                    className="projectMenuLink">
                                    {/* <Badge>9</Badge> */}
                                    {project.projectName}
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                    <div></div>
                </Container>
            </Navbar>



        {/* <div className={style.sidenavFooter}>

        </div> */}
        </>
        
    );
}