import React from 'react';
import { useState,useEffect } from 'react';
import "firebase/auth";
import firebase from 'firebase';
import { IsConstructor } from 'es-abstract';
import { passwordValidator } from './Validators';
import { UserReviews } from "./UserReviews";
import ReactStars from "react-rating-stars-component";

export const Profile = (props) => {

    const [validPassword, setValidPassword] = useState()
    const [passwordErrors, setPasswordErrors] = useState([])
    const [validForm, setValidForm] = useState(false)
    const [message,setMessage] = useState()
    const [error,setError] = useState(false)
    const [reviews,setReviews] = useState()
    const [bookReviews,setBookReviews] = useState()
    const [book, setBook] = useState()
    
    useEffect( () => {
        if( validPassword ) {
          setValidForm( true )
        }
        else {
          setValidForm( false )
        }
      },[validPassword])


    const submitHandler = (event) => {
        event.preventDefault()
        const data = new FormData(event.target)
        props.handler(data.get('newpassword'))
        .then((response) => {
            if (response) {
                setMessage('Password updated successfully.')
                setError(false)
            }
        })
        .catch((error) => {
            setMessage('Error updating password.')
            console.log(error)
            setError(true)
        })
    }

    const validatePassword = ( event) => {
    const password = event.target.value
    const validate = passwordValidator( password )
    if( validate.valid === false ) {
        setPasswordErrors( validate.errors.join(', ') )
        setValidPassword( false )
    }
    else {
        setValidPassword( true )
    }
    }

    const validationClass = ( mainClass, validState) => {
    if( validState === true ) {
        return `${mainClass}  is-valid`
    }
    else if( validState === false ) {
        return `${mainClass}  is-invalid`
    }
    else {
        return mainClass
    }
    }

    const Feedback = (props) => {
    setTimeout( () => {
        setMessage(null)
        setError(false)
    }, props.duration )
    return(
        <div className={ (error) ? "alert alert-danger" : "alert alert-success" }
        style={{ display: (message) ? "block" : "none" }}>
        {props.content}
        </div>
        )
    }

    // Get user's reviews (the ones with their usernames)
    useEffect(() => {
        if (!book) {
          props.handler(props.user.email)
            .then(() => console.log("Successfully loaded reviews"))
            .catch((error) => console.log(error))
        }
        if( !bookReviews ) {
          props.getReviews( props.user.email )
          .then( (result) => {
            setBookReviews( result )
          })
          .catch( (error) => console.log(error) )
        }
      })

    return (
        <div>
            {/* User modification section */}
            <div className="row p-5 bg-custom-blue text-light" style={{height:'100%'}}>
                <h3 className="text-center">My profile</h3>
                <form className="col-md-6 offset-md-3 mt-4" id="update" onSubmit={submitHandler}>
                <h5>Update your password</h5>
                    <div className="mb-3 mt-3">
                        <input 
                        type="password" 
                        className={validationClass("form-control",validPassword)}
                        name="newpassword" 
                        id="newpassword" 
                        placeholder="New password"
                        onChange={validatePassword}/>
                    </div>
                    <div className="invalid-feedback">{passwordErrors}</div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-custom-blue flex-fill mt-2 "
                            //disabled = { (!validForm) ? true : false }
                        >
                            Update
                        </button>
                    </div>
                    <div className="my-3">
                        <Feedback duration={3000} content={message} />
                    </div>
                </form>
            </div>

            {/* View past reviews section */}
            <div className="row p-4 bg-custom-green text-light ">
                <div className="col-md-6 offset-md-3 mt-4">
                   <h4>Your activity</h4> 
                    <div className="d-flex mt-4">
                        <UserReviews items={bookReviews}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
