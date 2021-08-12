import { useState,useEffect } from "react"
import {emailValidator, userNameValidator, passwordValidator} from './Validators'

export function Register(props) {
  const [validUserName,setValidUserName] = useState()
  const [userNameErrors,setUserNameErrors] = useState([])
  const [validEmail,setValidEmail] = useState()
  const [emailErrors,setEmailErrors] = useState([])
  const [validPassword,setValidPassword] = useState()
  const [passwordErrors,setPasswordErrors] = useState([])
  const [validForm,setValidForm] = useState(false)

  useEffect( () => {
    if( validUserName && validEmail && validPassword ) {
      setValidForm( true )
    }
    else {
      setValidForm( false )
    }
  },[validUserName,validEmail,validPassword])

  const submitHandler = (event) => {
    event.preventDefault()
    const data = new FormData(event.target)
    props.handler(data.get('email'), data.get('password'))
  }

  const validateUserName = (event) => {
    const name = event.target.value
    const validate = userNameValidator(name)
    if( validate.valid === false ) {
      setUserNameErrors( validate.errors.join(', ') )
      setValidUserName( false )
    }
    else {
      setValidUserName( true )
    }
  }

  const validateEmail = ( event ) => {
    const email = event.target.value
    const validate = emailValidator(email)
    if( validate.valid === false ) {
      setEmailErrors( validate.errors.join(', ') )
      setValidEmail( false )
    }
    else {
      setValidEmail( true )
    }
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

  return (
    <div className="row mt-4">
      <form className="col-md-6 offset-md-3 col-lg-4 offset-lg-4" id="register" onSubmit={submitHandler}>
        <h4>Register for an account</h4>
        <label className="form-label" htmlFor="username">Username</label>
        <input 
          className={validationClass("form-control",validUserName)}
          type="text" 
          name="username" 
          id="username" 
          onChange={validateUserName} 
          placeholder="letters and numbers no spaces" 
        />
        <div className="invalid-feedback">{userNameErrors}</div>
        <label className="form-label" htmlFor="email">Email</label>
        <input 
          className={validationClass("form-control",validEmail)} 
          type="email" 
          name="email" 
          id="email" 
          onChange={validateEmail}
          placeholder="me@example.com" 
        />
        <div className="invalid-feedback">{emailErrors}</div>
        <label className="form-label" htmlFor="password">Password</label>
        <input 
          className={validationClass("form-control",validPassword)} 
          type="password" 
          name="password" 
          id="password" 
          placeholder="minimum 8 characters" 
          onChange={validatePassword}
        />
        <div className="invalid-feedback">{passwordErrors}</div>
        <div className="d-flex justify-content-center mt-3">
          <button 
            type="submit" 
            className="btn btn-primary flex-fill"
            disabled = { (!validForm) ? true : false }
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}