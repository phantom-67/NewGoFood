// 1) Importing express.js and setting route and calling user so data will be stored in this manner
// 2) Then we are creating user credentials
// 3) In thunder client we are running {localhost:4000/api/createuser} and in thunder client change Get-->Post
// 4) From the express validator website {https://express-validator.github.io/docs/6.10.0/} we copied the code for installing, importing anding restrictions.
// 5) For installing express validator in termial npm install --save express-validator
// 6) copied code for validation of username and password and psted before async
// 7) customised the tags like name, user according to need
// 8) Now we changed how the input will be taken before we are directly giving input like this name: "Swapnil Priyadarshi", password: "pass123", email: "swappri123@gmail.com", location: "Qkwnf smknd" to take input from user
// but now like this User.create({ name: req.body.name, password: req.body.password, email: req.body.email, location: req.body.location }) and from thunder we provide input.
// 9) Now to add message in {body('email').isEmail(),} beside 'email' or 'password' etc we gan give message by giving cauma ,
// 10) Now we'll create a new screen signup in mernapp/screens
// 11) create a react.post for login user and match credentials with database and then we go to login
// 12) Then we searched how to use bcrypt js in chatgpt and accordingly we added encryption for the password , then we use this secPassword in User.create() and then we go to thunder client and given input to see the change
// 13) Now after this the data will be stored in encrypted format and inside login function we compared user password with body.password before successful login
// 14) Now we'll use jwt tokens then we did chatgpt for how to use it
// 15) we imported jwt tokens for generating authentication token and sending it back to user
// 16) then we created a string jwtSecret and created a jwt token for id in mondodb atlas--user and returned the authentication token 
// 17) when we run code in thunder client we can see the token being generated in input we provide password and email
// 18) then we go to frontend in login user and saved this auth token
/* 19) 
19.a) Schema Definition (User.js): You define a Mongoose schema for your user data in the User.js file. This schema specifies the structure of the documents that will be stored in the MongoDB collection. It includes fields like name, email, password, location, etc., along with their respective data types and validation rules.
19.b) Model Creation (User.js): After defining the schema, you create a Mongoose model named User based on this schema. The model provides an interface for interacting with the MongoDB collection. It allows you to perform operations like inserting, updating, deleting, and querying documents in the collection.
19.c) Route for Creating User (CreateUser.js): You define a route in CreateUser.js to handle the creation of new users. This route listens for HTTP POST requests to the /api/createuser endpoint. When a request is received, it extracts the user data from the request body (e.g., name, email, password, location).
19.d) User Creation (CreateUser.js): Inside the route handler, you use Mongoose's User.create() method to insert a new user document into the MongoDB collection. This method takes an object representing the user data as its argument and inserts it into the database.
19.e) Data Insertion: When the route handler is called (e.g., by making a POST request to /api/createuser), it executes the logic to create a new user document based on the provided data. This document is then inserted into the MongoDB collection using Mongoose's User.create() method.
19.f) Database Connection (index.js): At the top level of your application (in index.js), you establish a connection to the MongoDB database using Mongoose. This connection allows your application to interact with the MongoDB database and perform operations like inserting, querying, updating, and deleting data.
19.g) Middleware and Route Usage (index.js): You define middleware to handle CORS (Cross-Origin Resource Sharing) and specify routes for handling requests to create and display user data. These routes are mounted on the Express application using app.use().
19.h) To summarize, data is added to the MongoDB database using Mongoose's User.create() method, which inserts new user documents into the MongoDB collection based on the provided data. This process is triggered when a POST request is made to the /api/createuser endpoint, and the route handler executes the logic to create and insert the new user document into the database.
*/
// 20) Similarly we did to create signup page and take input from user and match it with out database to allow that user
/* 21)
21.a) User.findOne({ email }), the user's ID is extracted from the userData object. Then, a payload object is created containing this user ID. Next, the jwt.sign() function from the jsonwebtoken library is used to generate a JWT (JSON Web Token). This function takes two arguments:
21.b) Payload: This is the data you want to include in the token. In this case, it's the data object containing the user ID extracted earlier.
21.c) Secret: This is a secret key used to sign the token. It should be a string that only your server knows. This key is necessary to verify the authenticity of the token later.
The jwt.sign() function returns a string representing the JWT, which is the authentication token. Finally, the authentication token (authToken) is sent back to the client as part of the JSON response along with a success: true flag. This allows the client to store the token and use it for authentication in subsequent requests.
*/

const express = require('express')
const route = express.Router()
const { body, validationResult } = require('express-validator');
const User = require('../Model/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret="HelloThisIsMyFoodApp"

route.post("/createuser",
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password', 'Incorrect password').isLength({ min: 5 }), async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt);


        try {
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

route.post("/loginuser",
    body('email').isEmail(),
    body('password', 'Incorrect password').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid Email" });
            }

            const pwdCompare = bcrypt.compare(userData.password,req.body.password);
            if (!pwdCompare) {
                return res.status(400).json({ errors: "Incorrect Password" });
            }
            const data ={
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data, jwtSecret)
            return res.json({ success: true, authToken: authToken })

        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }
    })

module.exports = route;









