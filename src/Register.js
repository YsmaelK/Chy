import React, {useState, useEffect} from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/pages/Home.js';
import Buy from './components/pages/Buy.jsx';
import Sell from './components/pages/Sell.js';

import UserPool from './UserPool'
import { Amplify, Auth } from 'aws-amplify';
import {withAuthenticator} from '@aws-amplify/ui-react'
import awsExports from './aws-exports';
Amplify.configure(awsExports);

export function Register ({signOut, user}) {
  return(
      <>
      <h1> Hello {user.username}</h1>
      <button onClick={signOut}>Sign Out</button>
      </>
  );

}
export default withAuthenticator(Register)




// import React, {useState} from 'react';
// import UserPool from './UserPool'

// export const Register = (props) => {
//     const [email, setEmail ] = useState("");
//     const [pass,setPass] = useState("");
//    // const [name,setName] = useState('');

//     const onSubmit = (event) => {
//         event.preventDefault();
//         UserPool.signUp(email, pass, null, (err,data) =>{
//             if (err){
//                 console.error(err);
//             }
//             console.log(data);
//         });
//     }

//     return(
//         <div className = "auth-form-container">
//             <h2>Register</h2>
//         <form onSubmit= {onSubmit}>
//         {/* <label htmlFor="email">Name</label>
//             <input value={name} onChange={(event) => setName(event.target.value)} /> */}
//             <label htmlFor="email">Email</label>
//             <input value={email} onChange={(event) => setEmail(event.target.value)} />
//             <label htmlFor="password">Password</label>
//             <input
//              value={pass} 
//              onChange={(event) => setPass(event.target.value)}/>
//             <button type="submit"> Log In</button>
//         </form>
//         <button className= "link-btn" onClick={() => props.onFormSwitch('login')}> Already have an account? Login here.</button>
//         </div>
//     )
// }