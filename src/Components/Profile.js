// import React from 'react'

// export const Profile = () => {
//     return (
//         <div className="row pt-4 bg-custom-blue text-light" style={{height:'100%'}}>
//       <form className="col-md-6 offset-md-3 col-lg-4 offset-lg-4 mt-4" >
//         <h3 className="text-center">Create a new account</h3>
//         <input 
          
//           type="text" 
//           name="username" 
//           id="username" 
          
//           placeholder="Username" 
//         />
//         <div ></div>
//         <input 
           
//           type="email" 
//           name="email" 
//           id="email" 
//           onChange={validateEmail}
//           placeholder="email@address.com" 
//         />
//         <div className="invalid-feedback">{emailErrors}</div>
//         <input 
        
//           type="password" 
//           name="password" 
//           id="password" 
//           placeholder="Password" 
//           onChange={validatePassword}
//         />
//         <div className="invalid-feedback">{passwordErrors}</div>
//         <div className="d-flex justify-content-center mt-3">
//           <button 
//             type="submit" 
//             className="btn btn-custom-blue flex-fill mt-2 "
//             disabled = { (!validForm) ? true : false }
//           >
//             Register
//           </button>
//         </div>
//         <div className="my-2 text-center">
//             <Link className="text-light" to="login">Already have an account? Login here.</Link>
//           </div>
//       </form>
//     </div>
//     )
// }
