import React from 'react'
import { useState } from 'react/cjs/react.development'
import "firebase/auth"
import firebase from 'firebase'
import { IsConstructor } from 'es-abstract'


export const Profile = (props) => {

    const [password, setPassword] = useState()

    const user = firebase.auth().currentUser
    


  


    return (
        <>
        <form  >
            <div className="mb-3">
                <label for="email" class="form-label">Email address</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text"> We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label for="password" class="form-label">Old Password</label>
                <input type="password" class="form-control" id="password" name="oldpassword" />
            </div>
            <div className="mb-3">
                <label for="password" class="form-label">New Password</label>
                <input type="password" class="form-control" name="newpassword" id="password"/>
            </div>
            <div className="mb-3">
                <label for="confirmedPassword" class="form-label">Confirm Password</label>
                <input type="password" class="form-control" name="newpasswordconfirm" id="confirmedPassword"/>
            </div>
            <button type="submit" class="btn btn-primary" >Update</button>
        </form>
        </>
    )
}
