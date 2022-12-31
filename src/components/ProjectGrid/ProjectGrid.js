import { useSelector } from "react-redux";

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style  from "./ProjectGrid.module.scss";
import { useEffect, useState } from "react";

const ProjectGrid = () => {
    const myProjects = useSelector(state => state.myProjects);
    const bugs = useSelector(state => state.bugs);
    const [countMap, setCountMap] = useState({});

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
        <Row  xs={2} sm={2} md={3} lg={4} className={style.projectGrid}>
            {myProjects.map(project => {
                return (
                    <Col key={project.id}>
                        <Card>
                            <Card.Body>
                            <Card.Title>{project.projectName}</Card.Title>
                            <Card.Text>
                                <span>{countMap[project.id]} Bugs</span>
                                <span>{project.users.length} {project.users.length == 1 ? 'User' : 'Users'}</span>
                            </Card.Text>
                            </Card.Body>
                        </Card>                    
                    </Col>
                );
            })}
        </Row>
    );
}

export default ProjectGrid;