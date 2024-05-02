// 1.a) Copied the code of signup {https://getbootstrap.com/docs/4.1/components/forms/} and pasted here and removed every thing except email and password 
// 1.b) changed for --> htmlfor, class --> className then wraped inside class="container" and added onsubmit in form and added link for new user signup page and imported link
// 2) We changed url createuser --> loginuser and imported navigate for naviting to home page after login
// 3) Study about jwt tokens and bcrypt encryption
// 4) bcrypt excryption - through this we do hashing/encryption of password which will then get stored in our database
// 5) then we go to swapnil@Swapnils-MacBook-Air backend i.e. in backend in termial then we go to {https://www.npmjs.com/package/jsonwebtoken} and copied the npm command and run in the termial {npm i jsonwebtoken}
// 6) we also copied bcrypt code from {https://www.npmjs.com/package/bcrypt} command {npm i bcrypt} and run in backend terminal
// 7) then we go to CreateUser.js
// 8) Now we save the authentication token genrated in backend in local storage before navigate localStorage.setItem("authToken",json.authToken);
// 9) localStorage.setItem("authToken",json.authToken); --> authToken is the variable and calling json.authToken
// 10) Now we'll edit the frontend part for which we need food items to fetch that we go to db.js
// 11) then we created a local variable for email like this localStorage.setItem("userEmail", credentials.email) and go to OrderData.js

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';

export default function Login() {
    const [credentials, setcredentials] = useState({ email: "", password: "" })
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials")
        } else {
            localStorage.setItem("userEmail", credentials.email)
            localStorage.setItem("authToken", json.authToken);
            console.log(localStorage.getItem("authToken"))
            navigate('/');
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="backgoundimage" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", height: "100vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div><Navbar style={{ margin: "0", padding: "0" }} /></div>
                <div className="card mt-3" style={{ display: "flex", justifyContent: "center", alignItems: "center", transform: "translateY(50%)", margin: "10%", backgroundColor: "#343a40" }}>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control " name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                            </div>
                            <button type="submit" className="m-3 btn btn-success">Submit</button>
                            <Link to="/createuser" className='m-3 btn btn-danger'>New user</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

