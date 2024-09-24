const mongoose = require('mongoose');

// Define the schema for a todo
const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  // Reference to the User model
        required: true
    },
    text: {
        type: String,
        required: [true, 'Todo text is required']
    },
    completed: {
        type: Boolean,
        default: false  // Set default status to incomplete
    },
    date: {
        type: Date,
        default: Date.now  // Automatically set to current date
    }
});

// Create and export the Todo model
const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
