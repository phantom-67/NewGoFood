// 1) then we copied first two line from display data
// 2) then we have written the code for update the data to the schema and we created a variable to locally store email value in login.js
// 3) then we go to index.js and added line for api calling
// 4) then we create a new handle function which will send the data here for this we go to Cart.js
// 5) we create myorderdata function to fetch data then we create a new screen to display this data with name MyOrder.js in screen

const express = require('express')
const route = express.Router()
const Order = require('../Model/Orders')

route.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    await data.splice(0, 0, { Order_date: req.body.order_date })

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })
    console.log(eId)
    if (eId === null) {
        try {
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.json({ success: true })
            })
        }
        catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
    else {
        try {
            await Order.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }).then(() => {
                    res.json({ success: true })
                })
        }
        catch (error) {
            res.send("Server Error", error.message)
        }
    }
})

route.post('/myorderData', async (req, res) => {
    try {
        let myData = await Order.findOne({ 'email': req.body.email })
        res.json({ orderData: myData })
    } catch (error) {
        res.send("Server Error", error.message)
    }
})
module.exports = route;