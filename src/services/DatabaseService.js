// Firestore
import { collection, query, orderBy, doc, getDocs, addDoc, deleteDoc, updateDoc, where } from "firebase/firestore"; 
import db from '../firebase.js';
import { Timestamp } from "firebase/firestore";

const getBugs = async () => {
    let bugList = [];

    const querySnapshot = await getDocs(query(collection(db, "bugs"), orderBy("dateAdded", "desc")));
   
    querySnapshot.forEach((doc) => {
        const bug = {id:doc.id, ...doc.data()};
        //console.log(bug.dateAdded.fromMillis());
        bug.dateAdded = bug.dateAdded instanceof Timestamp ? bug.dateAdded.toMillis() : '';
        bugList.push(bug);
    });

    return bugList;
}

const getMyProjects = async () => {
    // TODO: add user state
    const querySnapshot = await getDocs(query(collection(db, "projects"), where("users", "array-contains", "e8Nv4pJsMKWRVXaIjAnt")));

    const projects = [];
    querySnapshot.forEach((doc) => {
        projects.push({"id": doc.id, ...doc.data()});
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