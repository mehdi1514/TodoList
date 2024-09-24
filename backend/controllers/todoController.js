const Todo = require('../models/Todo');

// Get all todos for the logged-in user
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });  // Find todos by user ID
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new todo
const createTodo = async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ message: 'Todo text is required' });
    }

    try {
        const todo = new Todo({
            text,
            user: req.user.id
        });

        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Update a todo by its ID
const updateTodo = async (req, res) => {
    const { text, completed } = req.body;

    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check if the logged-in user owns this todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Update fields
        todo.text = text || todo.text;
        todo.completed = completed !== undefined ? completed : todo.completed;

        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Delete a todo by its ID
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        // Check if the logged-in user owns this todo
        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        // Use findByIdAndDelete instead of todo.remove()
        await Todo.findByIdAndDelete(req.params.id);
        
        res.json({ message: 'Todo removed' });
    } catch (error) {
        console.error('Error deleting todo:', error.message); // Log the error message
        res.status(500).json({ message: 'Server Error', error: error.message }); // Include error message in response
    }
};

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
};
