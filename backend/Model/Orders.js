// 1) We made this file because our data is going to be stored here
// 2) Then we have to make schema so we copied first two lines from User.js then we made the schema
// 3) The schema have two values email to store email and order_data to store rest of the information which will be sent through state
// 4) Then we have to make end point so have created a file OrderData.js in Routes

const mongoose = require('mongoose')

const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    order_data: {
        type: Array,
        required: true,
    },

});

module.exports = mongoose.model('order', OrderSchema)