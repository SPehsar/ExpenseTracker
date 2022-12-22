const express = require('express');
const dotenv = require('dotenv');

const app = express(); 
dotenv.config({ path: './config/config.env' });  // to let it know were .en file is

const PORT = 5000;  // if orreasom can find it it goes to port 5000

// remeber is back tick not a sinle qoute
app.listen(PORT, console.log(`Cyrus, Server running in port 5000`));
