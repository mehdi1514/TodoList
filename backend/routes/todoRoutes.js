const express = require('express');
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controllers/todoController');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Routes for handling todos
router.route('/')
    .get(protect, getTodos)       // Get all todos of the logged-in user
    .post(protect, createTodo);   // Create a new todo

router.route('/:id')
    .put(protect, updateTodo)     // Update a todo by its ID
    .delete(protect, deleteTodo); // Delete a todo by its ID

module.exports = router;
