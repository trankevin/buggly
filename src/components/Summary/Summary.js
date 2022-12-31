import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import style from './Summary.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const Summary = ({ project }) => {
	let bugs = useSelector(state => state.bugs);
	const { projectID } = useParams();

	if(projectID) {
		bugs = bugs.filter((bug) => bug.projectID == projectID);
	}

	return(
		<Row  xs={2} sm={2} md={3} lg={5} className={style.summaryRow}>
			<Col>
				<CardGroup>
				  <Card>
				    <Card.Body>
				      <Card.Title>{bugs.length}</Card.Title>
				      <Card.Text>
				        Total Bugs
				      </Card.Text>
				    </Card.Body>
				  </Card>
				</CardGroup>
			</Col>
			<Col>
				<CardGroup>
				  <Card className={style.cardHigh}>
				    <Card.Body>
				      <Card.Title>{bugs.filter(bug => bug.priority == 'High').length}</Card.Title>
				      <Card.Text>
				      	High Priority
				      </Card.Text>
				    </Card.Body>
				  </Card>
				</CardGroup>
			</Col>
			<Col>
				<CardGroup>
				  <Card className={style.cardInProgress}>
				    <Card.Body>
				      <Card.Title>{bugs.filter(bug => bug.status == 'in-progress').length}</Card.Title>
				      <Card.Text>
				        In Progress
				      </Card.Text>
				    </Card.Body>
				  </Card>
				</CardGroup>
			</Col>
			<Col>
				<CardGroup>
				  <Card className={style.cardOpen}>
				    <Card.Body>
				      <Card.Title>{bugs.filter(bug => bug.status == 'open').length}</Card.Title>
				      <Card.Text>
				        Open
				      </Card.Text>
				    </Card.Body>
				  </Card>
				</CardGroup>
			</Col>
			<Col>
				<CardGroup>
				  <Card className={style.cardDone}>
				    <Card.Body>
				      <Card.Title>{bugs.filter(bug => bug.status == 'done').length}</Card.Title>
				      <Card.Text>
				        Done
				      </Card.Text>
				    </Card.Body>
				  </Card>
				</CardGroup>
			</Col>
		</Row>
	);
}


export default Summary;