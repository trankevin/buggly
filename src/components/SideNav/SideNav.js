import DatabaseService from 'services/DatabaseService';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button, Offcanvas } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import logo from '../../bug-icon.png';
import style from './SideNav.module.scss'
import { FaHome, FaFolderOpen, FaUserAlt } from "react-icons/fa";
import { Badge } from 'react-bootstrap';
import UserAuthService from 'services/UserAuthService';
import { useNavigate } from "react-router-dom";
import userAuthSlice from 'state/userAuthSlice';

export default function SideNav({ onChangeProject }) {
    
    const myProjects = useSelector(state => state.myProjects);
    const { pathname } = useLocation();
    const [showMobileNav, setShowMobileNav] = useState(false);
    const userAuth = useSelector(state => state.userAuth);

    const handleClose = () => setShowMobileNav(false);
    const handleShow = () => setShowMobileNav(true);
    const navigate = useNavigate();

    const handleLogout = (e) => {
        e.preventDefault();
        UserAuthService.logout();
        navigate('/');
    }

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
                    // show={showMobileNav}
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
                    <Nav activeKey={pathname} className={` flex-column`} align-items-end="true">
                        <Nav.Link eventKey="/" as={Link} to="/" onClick={handleClose}><FaHome/> Dashboard</Nav.Link>
                        {/* <Link to="/projects" className="nav-link">Projects</Link> */}
                        <Nav.Link eventKey="/projects" as={Link} to="/projects" onClick={handleClose}><FaFolderOpen/> Projects</Nav.Link>
                        {myProjects.map((project) => {
                            return (
                                <Nav.Link key={project.id} 
                                    eventKey={`/projects/${project.id}`}
                                    as={Link} to={`/projects/${project.id}`}
                                    data-project-id={project.id} 
                                    onClick={handleClose}
                                    className="projectMenuLink">
                                    {/* <Badge>9</Badge> */}
                                    {project.projectName}
                                </Nav.Link>
                            );
                        })}
                    </Nav>
                    <div className={style.sideNavFooter}>
                        { userAuth.user && <p className={style.userName}><FaUserAlt/> {userAuth.user.firstName} {userAuth.user.lastName}</p>}
                        <a href="#" className={style.logoutLink} onClick={handleLogout}>Logout</a>
                    </div>
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