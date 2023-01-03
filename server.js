const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");

const databaseConnection = require("./config/databaseConnection");

// ------------------------------- config dot env file
dotenv.config();

// --------------------------------------- databse call
databaseConnection();

// -------------------------------(back end) rest object
const app = express();


// ----------------------------------------- middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// --------------------------------------------- routes
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));

//transactions routes
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));
// ----------------------------------------------------

// ----------------------------------------------- port
const PORT = 8080 || process.env.PORT;

// -------------------------------------listening server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
