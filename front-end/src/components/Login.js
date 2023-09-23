import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    })

    const handleLogin = async () => {

        try {
            let result = await fetch("http://localhost:5000/login", {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            result = await result.json();

            if (result.auth) {
                localStorage.setItem("user", JSON.stringify(result.user));
                localStorage.setItem("token", JSON.stringify(result.auth));
                navigate("/");
            } else {
                alert("Please Alert Correct Details.")
            }

        } catch (err) {
            console.log(err);
        }

    }

    return (
        <div className='login'>
            <input type='email' className='inputBox' placeholder='Enter Email' value={email}
                onChange={(e) => setEmail(e.target.value)} />
            <input type='password' className='inputBox' placeholder='Enter Password' value={password}
                onChange={(e) => setPassword(e.target.value)} />
            <button type='button' className='appButton' onClick={handleLogin} >Login</button>
        </div>
    )
}

export default Login
