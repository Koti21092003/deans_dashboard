const mongoose = require('mongoose');

// Define the schema for storing student results
const resultsModel = new mongoose.Schema({
    sr : {
        type: Number,
        required: true,
    },
    studentId: {
        
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    studentRollNo: {
        type: String,
        required: true,
    },
    SGPA: {
        type: Number,
        required: true,
    },
    CGPA: {
        type: Number,
        required: true,
    },
    Backlogs: {
        type: Number,
        required: true,
    },
    AllBacklogs: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the model from the schema
const Results = mongoose.model('Results', resultsModel);

module.exports = Results;
