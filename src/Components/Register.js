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
    <div className="row pt-4 bg-custom-blue text-light" style={{height:'100%'}}>
      <form className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4" id="register" onSubmit={submitHandler}>
        <h3 className="text-center">Create a new account</h3>
        <input 
          className={validationClass("form-control mt-5",validUserName)}
          type="text" 
          name="username" 
          id="username" 
          onChange={validateUserName} 
          placeholder="Username" 
        />
        <div className="invalid-feedback">{userNameErrors}</div>
        <input 
          className={validationClass("form-control mt-4",validEmail)} 
          type="email" 
          name="email" 
          id="email" 
          onChange={validateEmail}
          placeholder="email@address.com" 
        />
        <div className="invalid-feedback">{emailErrors}</div>
        <input 
          className={validationClass("form-control mt-4",validPassword)} 
          type="password" 
          name="password" 
          id="password" 
          placeholder="Password" 
          onChange={validatePassword}
        />
        <div className="invalid-feedback">{passwordErrors}</div>
        <div className="d-flex justify-content-center mt-3">
          <button 
            type="submit" 
            className="btn btn-custom-blue flex-fill mt-2 "
            disabled = { (!validForm) ? true : false }
          >
            Register
          </button>
        </div>
      </form>
    </div>
  )
}