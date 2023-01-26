import { useSelector } from "react-redux";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style  from "./ProjectGrid.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BiCog } from "react-icons/bi";

import Modal from 'react-bootstrap/Modal';
import UpdateProjectForm from "components/Forms/UpdateProjectForm";

const ProjectGrid = () => {

    const myProjects = useSelector(state => state.myProjects);
    const bugs = useSelector(state => state.bugs);
    const [countMap, setCountMap] = useState({});

    const [show, setShow] = useState(false);
    const [updateProject, setUpdateProject] = useState({});
    

    const handleShowUpdateProject = (project) => {
        setUpdateProject(project);
        setShow(true);
    };

    const handleClose = () => setShow(false);

    useEffect(() => {

        if(bugs.length && Object.keys(countMap).length == 0) {
            setCountMap(bugs.reduce((obj, bug) => {
                const count = (obj[bug.projectID] || 0) + 1;
                return {
                    ...obj,
                    [bug.projectID]: count
                };
            }, {}));
        }
        
    }, [bugs]);

    return (
        <>
            <Row  xs={2} sm={2} md={3} lg={4} className={style.projectGrid}>
                {myProjects.map(project => {
                    return (
                        <Col key={project.id}>
                            <Card>
                                <Card.Body>
                                    {/* <a href={`/project/${project.id}`} className="stretched-link"></a> */}
                                    {/* <Link to={`/project/${project.id}`} className="stretched-link"></Link> */}
                                    <Card.Title><Link to={`/projects/${project.id}`}>{project.projectName}</Link> </Card.Title>
                                    <Card.Text>
                                        <span>{countMap[project.id]} {countMap[project.id] == 1 ? "Bug" : "Bugs" }  <BiCog size="22px" onClick={() => handleShowUpdateProject(project)} /></span>
                                        {/* <span>{project.users.length} {project.users.length == 1 ? 'User' : 'Users'}</span> */}
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>                    
                        </Col>
                    );
                })}
            </Row>

            <Modal className={style.modal} contentClassName={style.modalContent} show={show} onHide={handleClose}>
		        <Modal.Header closeButton closeVariant="white" className={style.modalHeader}>
		          <Modal.Title>Update Project</Modal.Title>
		        </Modal.Header>
		        <Modal.Body className={style.modalBody}>
		        	<UpdateProjectForm handleClose={handleClose} project={updateProject}/>
		        </Modal.Body>
      		</Modal>
        </>
    );
}

export default ProjectGrid;