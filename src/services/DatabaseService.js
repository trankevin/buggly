// Firestore
import { collection, query, orderBy, doc, getDocs, addDoc, deleteDoc, updateDoc, where } from "firebase/firestore"; 
import db from '../firebase.js';
import { Timestamp } from "firebase/firestore";
import { useSelector } from "react-redux";
import store from "../state/redux-store.js"

const getBugs = async (uid) => {
    
    const state = store.getState();
    let bugList = [];

    // const projectIds = state.myProjects.reduce((acc, project) => {
    //     acc.push(project.id);
    //     return acc;
    // }, []);
    
    //if(projectIds.length) {
        // get bugs by project
        //const querySnapshot = await getDocs(query(collection(db, "bugs"),  where("projectID", "in", projectIds), orderBy("dateAdded", "desc")));

        // get bugs by user (createdBy)
        const querySnapshot = await getDocs(query(collection(db, "bugs"),  where("createdBy", "==", uid), orderBy("dateAdded", "desc")))
   
        querySnapshot.forEach((doc) => {
            const bug = {id:doc.id, ...doc.data()};
            //console.log(bug.dateAdded.fromMillis());
            bug.dateAdded = bug.dateAdded instanceof Timestamp ? bug.dateAdded.toMillis() : '';
            bugList.push(bug);
        });
    //}
    

    return bugList;
}

const getMyProjects = async ( uid ) => {
    //const state = store.getState();

    const querySnapshot = await getDocs(query(collection(db, "projects"), where("users", "array-contains", uid)));
    //const querySnapshot = await getDocs(query(collection(db, "projects")));

    const projects = [];
    querySnapshot.forEach((doc) => {
        const {dateCreated = '', ...data} = doc.data();
        const project = {"id": doc.id, "dateCreated": dateCreated ? dateCreated.toMillis() : '', ...data};
        projects.push(project);
    });

    projects.sort((a, b) => { 
       if(a.projectName < b.projectName) return -1; 
       if(a.projectName > b.projectName) return 1; 
       return 0;
    } );

    return projects;
}

const DatabaseService = {
    getBugs,
    getMyProjects,
}

export default DatabaseService;