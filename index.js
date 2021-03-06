const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');


// create server
const app = express();

// Connect to dababase
connectDB();

// CORS
app.use(cors())

// Enable express.json
app.use(express.json({ extended: true }));

// port 
const PORT = process.env.PORT || 4000;

// Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

// Start server
app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
})