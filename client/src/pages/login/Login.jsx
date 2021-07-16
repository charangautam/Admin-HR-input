import React, { useContext, useRef } from 'react'
import './login.css'
import axios from 'axios'
import logo from '../../images/logo.jpg'
import { CircularProgress } from '@material-ui/core'
import { AuthContext } from '../../contextAPI/AuthContext'


export default function Login() {
    const username = useRef()
    const password = useRef() 
    const { user, isFetching, dispatch } = useContext(AuthContext)

    const loginCall = async (userCreds, dispatch) => {
        dispatch({ type: 'LOGIN_START' })
        try {
            const res = await axios.post('/auth/login', userCreds)
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data })
        } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        loginCall(
            { username: username.current.value, password: password.current.value }, 
            dispatch
        )
        console.log(user)
    }

    return (
        <div class='login'>
            <div className="loginWrapper">
                <div className='loginLeft'>
                    <div className="logoContainer">
                        <img className='logoImg' src={logo} alt="logo" />
                        <h2 className='logoText'>Sportal</h2>
                    </div>
                    <span className='loginDesc'>Sportal is designed to be a vast portal for all sport enthusiasts.</span>
                </div>
                <div className='loginRight'>
                    <form className='loginBox' onSubmit={handleSubmit}>
                        <input
                            className='loginInput'
                            type="text" 
                            required
                            placeholder='Username'
                            ref={username}
                        />
                        <input 
                            className='loginInput' 
                            type="password" 
                            required
                            placeholder='Password'
                            minLength='6'
                            ref={password}
                        /> 
                        <button className='loginButton' type='submit' disabled={isFetching}>
                            {isFetching ? <CircularProgress size='20px'/> : 'LOGIN'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
