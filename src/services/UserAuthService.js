// Firestore
import { collection, query, orderBy, doc, getDocs, addDoc, deleteDoc, updateDoc, where } from "firebase/firestore"; 
import db from '../firebase.js';
import { Timestamp } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import store from '../state/redux-store';
import { loginSuccess, logoutSuccess, loggingIn } from "state/userAuthSlice.js";

const userAuthDispatch = (action) => {
    store.dispatch(action);
}

const checkUserAuth = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;

        userAuthDispatch(loggingIn());
        
        setTimeout(() =>{
            userAuthDispatch(loginSuccess(user.toJSON()));
        }, 2000);
       
      } else {
        // User is signed out
        
      }
    });
}

const login = (email, password) => {

    const auth = getAuth();
    userAuthDispatch(loggingIn());

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        setTimeout(() =>{
            userAuthDispatch(loginSuccess(user.toJSON()));
        }, 2000);
        
      })
      .catch((error) => {
        console.log(error.message);
      }); 

}

const logout = () => {

    const auth = getAuth();

    signOut(auth).then(() => {
        userAuthDispatch(logoutSuccess());
    }).catch((error) => {
        console.log(error.message);
    });

}

const UserAuthService = { 
    login,
    logout,
    checkUserAuth
}

export default UserAuthService;