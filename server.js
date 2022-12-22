const path = require('path');
const express = require('express');
const dotenv = require('dotenv');


dotenv.config({ path: './config/config.env' });  // to let it know were .env file is

const app = express();

app.get('/', (req, res) => res.send('hello world'))
const PORT = process.env.PORT || 5000;  // if for some reasom cannot find it it goes to port 5000

// remeber is back tick not a sinle qoute
app.listen(PORT, console.log(`Cyrus, Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

