import Nav from 'react-bootstrap/Nav';
import logo from '../../bug-icon.png';
import DatabaseService from 'services/DatabaseService';
import { useEffect, useState } from 'react';
import style from './SideNav.module.scss'
import { useSelector } from 'react-redux';

export default function SideNav({ onChangeProject }) {
    
    //const [myProjects, setMyProjects] = useState([]);
    const myProjects = useSelector(state => state.myProjects);
    const [currentProject, setCurrentProject] = useState({});

    // useEffect(() => {
    //     if(!myProjects.length) {
    //         try {
    //             DatabaseService.getMyProjects().then((projects) => {
    //                 setMyProjects(projects);
    //             });  
    //         } catch (error) {
                
    //         }  
    //     }
        
    // }, []);

    const onClickProjectLink = (e) => {
        e.preventDefault();
        const project = myProjects.filter(project => project.id == e.target.dataset.projectId)[0];
        setCurrentProject(project);
        
        onChangeProject(project);
    }

    return(
        <>
        <div className="brand">
            <a href="/">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                Buggly
            </a>
                
        </div>

        <nav className={style.nav}>
            <Nav defaultActiveKey="/home" className="flex-column" align-items-end="true">
                <Nav.Link href="/">Dashboard</Nav.Link>
                <Nav.Link >Projects</Nav.Link>
                {myProjects.map((project) => {
                    return (
                        <Nav.Link key={project.id} data-project-id={project.id} onClick={onClickProjectLink} className={`${style.projectMenuLink} ${project.id == currentProject.id ? "active" : ""}`}>{project.projectName}</Nav.Link>
                    );
                })}
            </Nav>
        </nav>
        </>
        
    );
}