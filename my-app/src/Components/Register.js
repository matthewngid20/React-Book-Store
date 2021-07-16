export function Register ( props ) {

    const submitHandler = (event) => {
        event.preventDefault()
        const data = new FormData( event.target )
        props.handler( data.get('email'), data.get('password') )
    }

    return(
        <form id="register" onSubmit={submitHandler} >
            <h4>Register for an account</h4>
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-control" type="email" name="email" id="email" />
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control" type="password" name="password" id="password" />
            <button type="submit" className="btn btn-primary">Register</button>
        </form>
    )
}