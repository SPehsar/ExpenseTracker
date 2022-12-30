const mongoose = require("mongoose")

const databaseConnection = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Server is running on ${mongoose.connection.host}`)
    }
catch (error){
    console.log(`${error}`)
}}

module.exports = databaseConnection;