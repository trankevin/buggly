import logo from './bug-icon.png';
import React, { Component } from 'react';
import ThemeProvider from 'react-bootstrap/ThemeProvider';

// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

// Components
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import BugList from './components/BugList.js';
//import AddForm from './components/AddForm.js';
import AddModal from './components/AddModal.js';
import Summary from './components/Summary.js';

// Firestore
import { collection, query, orderBy, doc, getDocs, addDoc, deleteDoc, updateDoc } from "firebase/firestore"; 
import db from './firebase.js';

class App extends Component {

  constructor(props) {
      super(props);

      this.state = {
          bugList: []
      };

  }


  /**
   * Initial fetch bugs from Firestore
   */
  async componentDidMount() {
    
    if(this.state.bugList.length !== 0) return;

    let bugList = [];
    const querySnapshot = await getDocs(query(collection(db, "bugs"), orderBy("dateAdded", "desc")));
   
    querySnapshot.forEach((doc) => {
      bugList.push({id:doc.id, ...doc.data()});
    });
    
    this.setState({
      bugList: bugList
    })
    
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
    catch(e) {
       console.log('Error: ', e);
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
    console.log(bugId);
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

  
  render() {
    return (
        <ThemeProvider
          breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        >
          <Navbar>
            <Container>
              <Navbar.Brand href=""><img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Buggly</Navbar.Brand>
            </Container>
          </Navbar>

          <div className="col-sm-12">
            <Container>
              <Summary bugList={this.state.bugList}/>
            </Container>
          </div>

          <div className="col-sm-12">
            <Container>
               <AddModal submitHandler={(formData) => this.handleAddFormSubmit(formData)}/>
             {/* <AddForm submitHandler={(formData) => this.handleAddFormSubmit(formData)}/>*/}
            </Container>
          </div>

          <div className="col-sm-12">
            <Container>
              <BugList bugList={this.state.bugList} handleDelete={(bugId) => this.handleDelete(bugId)} handleUpdate={(bugId, formData) => this.handleUpdateFormSubmit(bugId, formData)}/>
            </Container>
          </div>

        </ThemeProvider>
    );
  }

}


export default App;
