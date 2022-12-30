const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")

const PORT = 8080 
const databaseConnection = require("./config/databaseConnection")

dotenv.config()

databaseConnection()

const app=express()

app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("<h1> Hello world, Cyrus</h1>")
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
