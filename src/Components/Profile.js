import React from 'react'
import { useState } from 'react/cjs/react.development'
import "firebase/auth"
import firebase from 'firebase'
import { IsConstructor } from 'es-abstract'


export const Profile = (props) => {

    const [password, setPassword] = useState()

    const user = firebase.auth().currentUser
    


  


    return (
        <div>
            {/* User modification section */}
            <div className="row p-5 bg-custom-blue text-light" style={{height:'100%'}}>
                <h3 className="text-center">My profile</h3>
                <form className="col-md-6 offset-md-3 mt-4" id="">
                <h5>Update your details</h5>
                    <div className="mb-3 mt-4">
                        <label for="username" className="form-label">Update your username</label>
                        <input type="text" className="form-control" id="username" placeholder="New username"/>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Update your password</label>
                        <input type="password" className="form-control" id="password" name="oldpassword" placeholder="Old password" />
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="newpassword" id="password" placeholder="New password"/>
                    </div>
                    <div className="mb-3">
                        <input type="password" className="form-control" name="newpasswordconfirm" id="confirmedPassword"placeholder="Confirm new password"/>
                    </div>
                    <div className="d-flex justify-content-center mt-3">
                        <button type="submit" className="btn btn-custom-blue flex-fill mt-2 "
                            //disabled = { (!validForm) ? true : false }
                        >
                            Update
                        </button>
                        </div>
                </form>
            </div>

            {/* View past reviews section */}
            <div className="row p-4 bg-custom-green text-light ">
                <div className="col-md-6 offset-md-3 mt-4">
                   <h4>Your activity</h4> 
                   <div style={{backgroundColor:'#a1ac9e'}}>
                       <p>Past reviews go here</p>
                   </div>
                </div>
            </div>

        </div>
    )
}
