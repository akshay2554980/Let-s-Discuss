import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from './firebase'
import './Login.css'
import { useStateValue } from './StateProvider'
import {actionTypes} from './reducer'
function Login() { 
 const [{user},dispatch]=useStateValue();     //using the stateprovier here.
//  here dispatch is the one who send data to the data layer and updates it.
    const signIn=()=>{
          auth.signInWithPopup(provider)
          .then((result)=>{
              dispatch({                      //this will updae in the data layer.
                  type:actionTypes.SET_USER,
                  user:result.user
              })
          })
          .catch((error)=>alert(error)); 
    }
    return (
       <div className="login">
       <div className="login__container">
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUs8WfRF-ZkzyDlOXs3rjI4d_d0rLBxUgNMA&usqp=CAU" alt="whatsapp logo" />
            <div className="logintext">
                <h1>Sign in to Let's Discuss</h1>
            </div>
            <Button type="submit" onClick={signIn}>
            Sign in with google
            </Button>

       </div>
       </div>
    )
}

export default Login
