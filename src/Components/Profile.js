import React from 'react'

export const Profile = () => {
    return (
        <>
        <form>
            <div className="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text"> We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" id="password"/>
            </div>
            <div className="mb-3">
                <label for="confirmedPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" id="confirmedPassword"/>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
        </>
    )
}
