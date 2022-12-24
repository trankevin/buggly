import logo from './bug-icon.png';
import React, { Component, useEffect } from 'react';
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
import { init } from './counterSlice'

const App = () => {
    
    const bugList = useSelector(state => state.bugs);

    useEffect(() => {

    }, [bugList])

    return (
    
        <ThemeProvider
        breakpoints={['xl','lg', 'md', 'sm', 'xs']}
        >
            <Container fluid>
                <Row>
                <Col xs={2}>
                    <SideNav/>
                </Col>
                <Col xs={{offset: 2 }}>
                    <BrowserRouter>
                    <main>
                        <Container>
                        {/* <PageTitle title={this.state.currentProject.projectName || "Dashboard"}/> */}
                        {/* <Summary /> */}
                        {/* <AddModal submitHandler={(formData) => this.handleAddFormSubmit(formData)}/> */}
                        <BugList 
                                // handleDelete={(bugId) => this.handleDelete(bugId)} 
                                // handleUpdate={(bugId, formData) => this.handleUpdateFormSubmit(bugId, formData)}
                                />
                        </Container>
                    </main>
                    </BrowserRouter>
                </Col>
                </Row>
                
            </Container>
        </ThemeProvider>
    
    );
    
}

class AppBK extends Component {

  constructor(props) {
      super(props);

      this.state = {
          bugList: [],
          currentProject: {},
      };

  }

  /**
   * Initial fetch bugs from Firestore
   */
  
  async componentDidMount() {
    
    if(this.state.bugList.length !== 0) return;

    try {

      DatabaseService.getBugs().then((bugList) => {
        // this.setState({
        //   bugList: bugList
        // })
        
      });
      
      
    }
    catch (error) {
      console.log(error);
    }

    
  }

  /**
   * Handle add bug submit form
   * @param  {formData}  Values from Add Bug form
   */
  async handleAddFormSubmit(formData) {

    let nextBug =  {
      ...formData
    }

    try {
      const docRef = await addDoc(collection(db, "bugs"), nextBug);

      if (docRef.id !== undefined) {
       nextBug.id = docRef.id;

       this.setState({
         bugList: [
          nextBug,
          ...this.state.bugList,
         ]
       });
      }
    }
    catch(error) {
       console.log('Error: ', error);
    }

  }

  /**
   * Handle update bug submit form
   * @param  {formData}  Values from Add Bug form
   */
  async handleUpdateFormSubmit(bugId, formData) {

    try {
      await updateDoc(doc(db, "bugs", bugId), formData).then(() => {
        this.setState({
          bugList: [
           ...this.state.bugList.map(bug => {
            if (bug.id == bugId) {
              return {id: bugId, ...formData};
            }
            return bug;
           }),
          ]
        });
      });
    }
    catch(e) {
       console.log('Error: ', e);
    }

  }

  /**
   * Handle delete bug 
   * @param  {bugId}  Bug ID to delete
   */
  async handleDelete(bugId) {

    try {
      await deleteDoc(doc(db, "bugs", bugId)).then(() => {
        this.setState({
          bugList: [
            ...this.state.bugList.filter((bug) => bug.id !== bugId)
          ]
        });
        console.log('deleted');
      });
    }
    catch(e) {
       console.log('Error: ', e);
    }
    
  }

  /**
   * Update current project in state
   * @param {projectID} Project ID
   */
  onChangeProject(project) {
    this.setState({
      currentProject: project
    })
  }
  
  render() {
    return (
      
        <ThemeProvider
          breakpoints={['xl','lg', 'md', 'sm', 'xs']}
        >
          {/* <Navbar>
                    <Container fluid="xl">
                      <Navbar.Brand href=""><img
                      alt=""
                      src={logo}
                      width="30"
                      height="30"
                      className="d-inline-block align-top"
                    />{' '}
                    Buggly</Navbar.Brand>
                    </Container>
                  </Navbar> */}
          <Container fluid>
            <Row>
              <Col xs={2}>
                <SideNav onChangeProject={(project) => this.onChangeProject(project)}/>
              </Col>
              <Col xs={{offset: 2 }}>
                <BrowserRouter>
                  <main>
                    <Container>
                      <PageTitle title={this.state.currentProject.projectName || "Dashboard"}/>
                      <Summary bugList={this.state.bugList} currentProject={this.state.currentProject}/>
                      <AddModal submitHandler={(formData) => this.handleAddFormSubmit(formData)}/>
                      <BugList bugList={this.state.bugList} 
                              handleDelete={(bugId) => this.handleDelete(bugId)} 
                              handleUpdate={(bugId, formData) => this.handleUpdateFormSubmit(bugId, formData)}
                              currentProject={this.state.currentProject}/>
                    </Container>
                  </main>
                </BrowserRouter>
              </Col>
            </Row>
            
          </Container>

        </ThemeProvider>
      
    );
  }

}


export default App;
