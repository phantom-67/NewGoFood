// 1) First we did rfc and go to navbar 
// 2) then copied signup code from {https://getbootstrap.com/docs/5.0/forms/overview/} and pasted inside div then made div empty tag
// 3) closed all input tag and change class to className and copied email input code and chaged it to Name , type="text"
// 4) Changed language from javascript to react and wrap whole code inside div with className="container"
// 5) Then we created a link button connected it to login page and changed color of both button {btn-success,btn btn-danger} and appled margin m-3
// 6) Then we added in form a event handler onsubmit and made one arrow function for this 
// 7) Then we called a synthetic function preventDefault() and made a variable response to fetch details from createuser
// 8) Now we have to send details so we copied method and header from thunder client
// 9) Then we imported useState and made a useState then associate this value with out form for this input we added name='name' value={credentials.name} for evry credentials
// 10) Then on these we add onchange event listner and made a function for onChange because then only it will change the value of credentials then called onChage function in every credentials box
// 11) Then in predentDefault we added body which is to be sent and printed the response then check if response is success or not
// 12) If response is not succes then we do alert
// 13) Then go to backend index.js
// 14) Then we changed for --> htmlFor
// 15) Then we go to Createusr.js and there we create a react.post for login user
/* 16)
16.a) useState Hook: The useState Hook is used to initialize state in a functional component. In this case, it initializes a state variable credentials and a function setcredentials to update this state. The initial state of credentials is an object with properties for name, email, password, and geolocation, all initially set to empty strings.
16.b) handleSubmit Function: This function is triggered when the form is submitted. It prevents the default form submission behavior using e.preventDefault() to prevent the page from reloading.
16.c) Fetch API: It sends a POST request to the specified URL (http://localhost:4000/api/createuser) using the Fetch API. The request includes headers specifying that the content type is JSON ('Content-Type': 'application/json'). The body of the request is JSON stringified representation of the credentials state object.
16.d) Response Handling: After the server processes the request, it sends a JSON response. The code awaits this response and parses it into JSON format using response.json(). It then logs the JSON response to the console.
16.e) Alert for Invalid Credentials: If the response JSON indicates that the request was unsuccessful (json.success is false), an alert is shown to the user indicating that they should enter valid credentials.
16.f)In summary, this code captures form input values into state, submits them to the backend server using a POST request, handles the response from the server, and displays an alert if the credentials are invalid.
*/
/*17)
17.a) Function Definition: const onChange = (event) => { ... r}: This defines an arrow function named onChange that takes an event object as its argument.
17.b) Updating State: setcredentials({...credentials,[event.target.name]:event.target.value}): Inside the function, the setcredentials function is called to update the state. It spreads the current state (...credentials) and then updates the property corresponding to the input field that triggered the change.
event.target.name: This extracts the name attribute of the input field that triggered the change. This attribute is set to 'name', 'email', 'password', or 'geolocation' depending on the input field.
event.target.value: This extracts the value entered into the input field that triggered the change. It represents the new value of the input field.
17.c) Usage in Input Fields: In each input field, the onChange event handler is attached to the onChange event. This means that whenever the value of the input field changes (e.g., when the user types something or selects an option), the onChange function will be called.
Example: <input type="text" className="form-control " name='name' value={credentials.name} onChange={onChange} />
17.d) So, essentially, the onChange event handler listens for changes in the input fields and updates the corresponding property in the credentials state object accordingly. This ensures that the state stays in sync with the user's input.
*/

import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';


export default function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })
        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter valid credentials")
        }
        navigate('/login')
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="backgoundimage" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)", height: "100vh", backgroundSize: "cover", backgroundPosition: "center" }}>
                <div><Navbar style={{ margin: "0", padding: "0" }} /></div>
                <div className="card mt-3" style={{ display: "flex", justifyContent: "center", alignItems: "center", transform: "translateY(30%)", margin: "10%", backgroundColor: "#343a40" }}>
                    <div className="container">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputName" className="form-label">Name</label>
                                <input type="text" className="form-control " name='name' value={credentials.name} onChange={onChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control " name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputLocation" className="form-label">Location</label>
                                <input type="text" className="form-control" name='geolocation' value={credentials.geolocation} onChange={onChange} id="exampleInputAddress1" />
                            </div>
                            <button type="submit" className="m-3 btn btn-success">Submit</button>
                            <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
