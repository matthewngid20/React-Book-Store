import { useState,useEffect } from "react"
import { useHistory } from "react-router"
import {Spinner} from './Spinner'

export function Logout ( props ) {
  const [redirect,setRedirect] = useState('/')
  const history = useHistory()

  useEffect( () => {
    if( props.redirect ) {
      setRedirect( props.redirect )
    }
    props.handler().then( () => history.push(redirect) ).catch( (error) => console.log(error) )
    
  },[redirect])

  return(
    <Spinner size={64} />
  )
}