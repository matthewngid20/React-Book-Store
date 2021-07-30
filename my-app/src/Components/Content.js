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
import { AddData } from './Admin/AddData';

export function Content( props ) {

    const [auth,setAuth] = useState( false )
    const [user,setUser] = useState()

    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore()

    const addData = ( data ) => {
        return new Promise( ( resolve,reject ) => {
            db.collection('books').add( data )
            .then( () => resolve( true ) )
            .catch( (error) => reject(error) )
        })
    }

    const storage = firebase.storage()

    // Path is a string
    const addImage = ( path, image ) => {
        return new Promise( (resolve, reject) => {
            storage.ref( path ).put(image)
            .then( () => {
                storage.ref( path ).getDownloadURL()
                .then((url) => resolve(url))
                .catch((errors) => reject(errors))
            })
            .catch((errors) => reject(errors) )
        })
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
                <Route path="/add">
                    <AddData handler={ addData } imageHandler={ addImage } />
                </Route>
            </Switch>
        </div>
    )
}