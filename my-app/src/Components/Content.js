import { Switch, Route } from 'react-router-dom';
import { firebaseConfig } from '../Config/Config';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import { useState } from 'react';

import { Home } from './Home';
import { About } from './About';
import { Register } from './Register';
import { Login } from './Login';
import { Logout } from './Logout';

export function Content( props ) {

    const [auth,setAuth] = useState( false )
    const [user,setUser] = useState()

    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    const registerUser = (email,password) => {

        console.log(email, password)

        firebase.auth().createUserWithEmailAndPassword(email, password) 
        .then( ( userCredential ) => {
            // do something with the user object
            setUser( userCredential.uid )
            setAuth(true)
            props.authHandler(true)
        })
        .catch( (error) => {
            // do something with the error
            console.log( error )
        })
    }

    const loginUser = (email,password) => {
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( (userCredential) => {
            // do something with the user object
            setUser( userCredential.uid )
            setAuth(true)
            props.authHandler(true)
        })
        .catch( (error) => {
            // do something with the error
            console.log( error )
        })
    }

    const logoutUser = () => {
        firebase.auth().signOut()
        .then( () => {
            // Do something after signout
            setUser(null)
            setAuth(false)
            props.authHandler(false)
        })
    }

    return (
        <div className="container">
            <h1>Hello content</h1>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/about">
                    <About />
                </Route>
                <Route path="/register">
                    <Register handler={ registerUser } />
                </Route>
                <Route path="/login">
                    <Login handler={ loginUser } />
                </Route>
                <Route path="/logout">
                    <Logout handler={ logoutUser } />
                </Route>
            </Switch>
        </div>
    )
}