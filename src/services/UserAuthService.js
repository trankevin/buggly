// Firestore
import { collection, query, orderBy, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, updateDoc, where } from "firebase/firestore"; 
import db from '../firebase.js';
import { Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import store from '../state/redux-store';
import { loginSuccess, logoutSuccess, loggingIn, loggingInFailed, signingUp, signingUpSuccess } from "state/userAuthSlice.js";
import { fetchBugs } from 'state/bugsSlice'
import { fetchMyProjects } from 'state/myProjectsSlice'

const userAuthDispatch = (action) => {
    store.dispatch(action);
}

const initUserAuth = async () => {
    try {
      const uid = await checkUserAuth();

      if(uid){
        const user = await getUser(uid);
        
        userAuthDispatch(fetchMyProjects(uid));

        setTimeout(() =>{
            userAuthDispatch(fetchBugs(uid));
        }, 500);  
        
        setTimeout(() =>{
            userAuthDispatch(loginSuccess({...user, dateCreated: user.dateCreated instanceof Timestamp ? user.dateCreated.toMillis() : ''}));
        }, 1800);
      }
      
    } catch (error) {
      
    }
}

const checkUserAuth = async () => {
    const auth = getAuth();
    const onAuthPromise = new Promise ((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/firebase.User
              const uid = user.uid;
              userAuthDispatch(loggingIn());
              resolve(uid);
            } else {
              // User is signed out
              resolve(false);
            }
          });
    });

    return onAuthPromise;
}

const login = async (email, password) => {

    const auth = getAuth();
    
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        userAuthDispatch(loggingIn());
        if(userCredential.user){
            //const user = userCredential.user;
            const user = await getUser(userCredential.user.uid);
           
            userAuthDispatch(fetchMyProjects(user.uid));

            setTimeout(() =>{
                userAuthDispatch(fetchBugs(user.uid));
            }, 500);
            

            setTimeout(() =>{
                userAuthDispatch(loginSuccess({...user, dateCreated: user.dateCreated instanceof Timestamp ? user.dateCreated.toMillis() : ''}));
            }, 1800);
        }
    } catch (error) {
        console.log(error.message);

        throw new Error('404');
    }

}

const logout = () => {

    const auth = getAuth();

    signOut(auth).then(() => {
        userAuthDispatch(logoutSuccess());
    }).catch((error) => {
        console.log(error.message);
    });

}

const signUpUser = async (formData) => {
    
    const auth = getAuth();

    try {
        
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        if(userCredential.user){
            userAuthDispatch(signingUp());
            const user = await createUser({
                ...formData,
                uid: userCredential.user.uid
            })
            
            if(user) {
                setTimeout(() =>{
                    userAuthDispatch(signingUpSuccess({...user, dateCreated: user.dateCreated instanceof Timestamp ? user.dateCreated.toMillis() : ''}));
                }, 2500);    
            }

            
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    }
    
}

const createUser = async (formData) => {
    const {password, uid, ...userData} = formData;

    try {
        const docRef = await setDoc(doc(db, "users", uid), userData);
        
        return {
            uid: uid, 
            ...userData
        };
        

    } catch (error) {
        console.log(error.message);
    }
   
}

const getUser = async (uid) => {
    try {
        const docSnapshot = await getDoc(doc(db, "users", uid));
        if(docSnapshot.exists()) {
            return {
                uid:docSnapshot.id, ...docSnapshot.data()};
        }
    } catch (error) {
        console.log(error.message);
    }
    
}

const UserAuthService = { 
    login,
    logout,
    initUserAuth,
    checkUserAuth,
    signUpUser
}

export default UserAuthService;