export function Login ( props ) {

    const submitHandler = (event) => {
        event.preventDefault()
        const data = new FormData( event.target )
        props.handler( data.get('email'), data.get('password') )
    }

    return(
        <form id="login" onSubmit={submitHandler} >
            <h4>Sign in to your account</h4>
            <label className="form-label" htmlFor="email">Email</label>
            <input className="form-control" type="email" name="email" id="email" />
            <label className="form-label" htmlFor="password">Password</label>
            <input className="form-control" type="password" name="password" id="password" />
            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    )
}