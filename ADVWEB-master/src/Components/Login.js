import { useState, useEffect } from "react"
import { useHistory, useLocation } from "react-router"

const useQuery = () => {
  return new URLSearchParams( useLocation().search )
}

export function Login ( props ) {

  const [returnPath,setReturnPath] = useState()
  const [validEmail,setValidEmail] = useState()
  const [emailErrors,setEmailErrors] = useState()
  const [validPassword,setValidPassword] = useState()
  const [passwordErrors,setPasswordErrors] = useState()
  const [validForm,setValidForm] = useState(false)

  const history = useHistory()
  const query = useQuery()

  useEffect( () => {
    const path = query.get('returnPath')
    if( path !== undefined ) {
      setReturnPath( path )
    }
  })

  useEffect( () => {
    if( validEmail && validPassword ) {
      setValidForm( true )
    }
  },[validEmail,validPassword])


  const submitHandler = ( event ) => {
    event.preventDefault()
    const data = new FormData( event.target )
    props.handler( data.get('email'), data.get('password') )
    .then( (response) => {
      if(response === true ) {
        console.log(returnPath)
        history.push( (returnPath) ? '/'+ returnPath : '/' )
      }
    })
    .catch( (error) => {
      console.log( error )
    })
  }

  const validateEmail = (event) => {
    const email = event.target.value
    let errors = []
    
  }

  return(
    <div className="row mt-4">
      <form className="col-md-4 offset-md-4" id="login" onSubmit={ submitHandler }>
        <h4>Sign in to your account</h4>
        <label className="form-label" htmlFor="email">Email</label>
        <input className="form-control" type="email" name="email" id="email" />
        <label className="form-label" htmlFor="password">Password</label>
        <input className="form-control" type="password" name="password" id="password" />
        <div className="d-flex justify-content-center mt-3">
          <button 
            type="submit" 
            className="btn btn-primary flex-fill"
            //disabled={ (!validForm) ? true : false }
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}