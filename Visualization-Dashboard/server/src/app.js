const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const connectDB = require('../database');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
//connectDB();

// Routes
app.use('/api', apiRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});