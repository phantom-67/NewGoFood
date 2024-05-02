// 1) We copied first two line of CreateUser
// 2) then we made a route.post arrow function and for this function we have given a end point /foodData 
// 3) then we send request of food_items (global.food_items is a global variable so it is accessible)
// 4) then we export route and we go to db.js for further fetching data to customize frontend
// 5) The earlier code was not working because it was getting executed before data getting fetched so we changed the function to async, await and also fetched the data here and send it back.
// 6) Now to fetch food_category data we go to db.js
// 7) then we send the data back in form of array then we go to frontend part to edit it Home.js

const express = require('express')
const route = express.Router()

route.post('/foodData', (req,res) =>{
    try {
        res.send([global.food_items, global.foodCategory ])
    } catch (error) {
        console.log(error.message)
        res.send("Server Error")
    }
})

module.exports = route;

