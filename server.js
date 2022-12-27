const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")
const colors = require("colors")
const connectDB = require("./config/connectDB")
// config dot env
dotenv.config()

// database call
connectDB()

// rest object
const app=express()

// middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

// routes
app.get("/", (req, res) => {
    res.send("<h1> Hello world, Cyrus</h1>")
})

// port 
const PORT = 8080 || process.env.PORT

// listen server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.bgWhite.blue)
})
