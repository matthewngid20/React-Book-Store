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
    <div className="row pt-4 bg-custom-blue text-light" style={{height:'100%'}}>
      <form className="col-md-4 offset-md-4 mt-4" id="login" onSubmit={ submitHandler }>
        <h3 className="text-center">Login to your account</h3>
        <label className="form-label mt-4" htmlFor="email">Email</label>
        <input className="form-control" type="email" name="email" id="email" placeholder="email@address.com" />
        <label className="form-label mt-2" htmlFor="password">Password</label>
        <input className="form-control" type="password" name="password" id="password" placeholder="Password" />
        <div className="d-flex justify-content-center mt-3">
          <button 
            type="submit" 
            className="btn btn-custom-blue flex-fill mt-2"
            disabled={ (!validForm) ? true : false }
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}