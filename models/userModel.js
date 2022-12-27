const mongoose = require('mongoose')

// schema design
const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:[true, 'name is required']

    },

    email: {
        type:String,
        required:[true, 'email address is required and must be uniue']
    },

    password: {
        type:String,
        required:[true, 'password address is required']
    },
})

// export
const userModel = mongoose.model('users', userSchema)
module.exports = userModel