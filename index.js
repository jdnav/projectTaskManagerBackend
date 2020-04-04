const express = require('express');
const connectDB = require('./config/db')

// create server
const app = express();

// Connect to dababase
connectDB();

// port 
const PORT = process.env.PORT || 4000;

// Start server
app.listen(PORT, () => {
    console.log('Server running in port ${PORT}');
})