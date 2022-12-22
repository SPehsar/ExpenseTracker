const express = require('express');
const dotenv = require('dotenv');

const app = express(); 
dotenv.config({ path: './config/config.env' });  // to let it know were .en file is

const PORT = 5000;  // if orreasom can find it it goes to port 5000

// remeber is back tick not a sinle qoute
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
