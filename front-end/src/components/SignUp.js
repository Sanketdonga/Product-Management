import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    })

    const collectData = async () => {

        try {

            let result = await fetch('http://localhost:5000/register', {
                method: 'post',
                body: JSON.stringify({ name, email, password }),
                headers: {
                    'Content-Type': 'application/json',
                }
            })

             result = await result.json();

            if (result) {
                navigate("/")
            }

            localStorage.setItem("user", JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className='register'>

            <h1>Register</h1>

            <input type='text' className='inputBox' value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />

            <input type='email' className='inputBox' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />

            <input type='password' className='inputBox' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' />

            <button className='appButton' onClick={collectData} type='button'>Sign Up</button>

        </div>
    )
}

export default SignUp;