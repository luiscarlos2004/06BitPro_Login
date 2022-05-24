const mongoose = require('mongoose');
const {Schema,model} = mongoose;

let user = new Schema({
    email:String,
    pass:String
})

module.exports = model('users',user);