// 1) we make the mongoose schema
// 2) we copied code from {https://mongoosejs.com/docs/guide.html} and changed the variable insdie according to our need.
// 2) We are making schema so it will take input from user in this manner only
// 3) Then we exported UserSchema as mongoose models with name as user

const mongoose = require('mongoose')

const { Schema } = mongoose;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    }, 
    location:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', UserSchema)