// Firestore
import { collection, query, orderBy, doc, getDocs, addDoc, deleteDoc, updateDoc, where } from "firebase/firestore"; 
import db from '../firebase.js';
import { addBug, updateBug, deleteBug } from 'state/bugsSlice'
import { fetchMyProjects } from "state/myProjectsSlice.js";
import { useDispatch } from "react-redux";
import store from '../state/redux-store';
import { Timestamp } from "firebase/firestore";

const formDispatch = (action) => {
    store.dispatch(action);
}

/**
 * Handle add bug submit form
 * @param  {formData}  Values from Add Bug form
 */
const handleAddFormSubmit = async (formData) => {
    const state = store.getState();

    let nextBug =  {
      ...formData,
      createdBy: state.userAuth.user.uid
    }

    try {
      const docRef = await addDoc(collection(db, "bugs"), nextBug);

      if (docRef.id !== undefined) {
       nextBug.id = docRef.id;

       formDispatch(addBug({
                ...nextBug,
                dateAdded: nextBug.dateAdded.toMillis()
       }));
   
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
const handleUpdateFormSubmit = async (bugId, formData) => {

    try {
        await updateDoc(doc(db, "bugs", bugId), {
            ...formData,
            dateAdded: Timestamp.fromMillis(formData.dateAdded)
            //dateAdded: Timestamp.now()
        });
        //console.log(Timestamp.fromMillis(formData.dateAdded));
        formDispatch(updateBug({id: bugId, ...formData}));
        
    }
    catch(e) {
        console.log('Error: ', e);
    }
            
}

/**
 * Handle delete bug 
 * @param  {bugId}  Bug ID to delete
 */
const handleDelete = async (bugId) => {

    try {
        await deleteDoc(doc(db, "bugs", bugId));
        formDispatch(deleteBug(bugId));
    }
    catch(e) {
       console.log('Error: ', e);
    }

}

/**
 * Handle Add Project Form submit
 * @param  {formData}  Form data from add project
 */
const handleAddProjectForm = async (formData) => {
    const state = store.getState();
    
    let project =  {
      ...formData,
      users: [state.userAuth.user.uid]
    }

    try {
      const docRef = await addDoc(collection(db, "projects"), project);

      if (docRef.id !== undefined) {

        // Fetch projects
        formDispatch(fetchMyProjects(state.userAuth.user.uid));
        return docRef.id;        
      }
    }
    catch(error) {
       console.log('Error: ', error);
    }

}

/**
 * Handle update project submit form
 * @param  {formData}  Values from Update Project form
 */
const handleUpdateProjectFormSubmit = async (projectID, formData) => {

    try {
        await updateDoc(doc(db, "projects", projectID), {
            ...formData,
        });
        
        formDispatch(fetchMyProjects());
        
    }
    catch(e) {
        console.log('Error: ', e);
    }
            
}


const FormService = {
    handleAddFormSubmit,
    handleUpdateFormSubmit,
    handleDelete,
    handleAddProjectForm,
    handleUpdateProjectFormSubmit
}

export default FormService;