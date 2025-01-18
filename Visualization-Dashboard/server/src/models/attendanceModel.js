const mongoose = require('mongoose');

// Define the schema for the Attendance data
const attendanceModel = new mongoose.Schema({
    sr: {
        type: Number,
        required: true,
    },
    uniqueId: {
        type: String,
        required: true,
    },
    rollno: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    subjects: {
        type: Array,
        required: true,
    },
    subjectsMarks: {
        type: Array,
        required: true,
    },
    totalMarks: {
        type: Array,
        required: true,
    },
    // Add any other fields as required
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Create the model from the schema
const Attendance = mongoose.model('Attendance', attendanceModel);

module.exports = Attendance;
