import React, { useState } from 'react'
// import firebase from '../src/firebase'
import firebase from '../firebase'
// import firebase from "firebase/app";
import 'firebase/auth'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password)
        }
        catch (error) {
            console.error("Error logging in", error.message)
        }
    }

    return (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>Email:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Login</button>
          </form>
        </div>
    );
}

export default Login