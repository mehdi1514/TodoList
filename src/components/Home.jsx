import { useEffect, useState } from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [todoValue, setTodoValue] = useState('');
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    // function persistData(newList) {
    //     localStorage.setItem('todos', JSON.stringify({ todos: newList }));
    // }

    // function handleAddTodos(newTodo) {
    //     const newTodoList = [...todos, { text: newTodo, completed: false }];
    //     persistData(newTodoList);
    //     setTodos(newTodoList);
    // }

    // function handleDeleteTodo(index) {
    //     const newTodoList = todos.filter((todo, todoIndex) => todoIndex !== index);
    //     persistData(newTodoList);
    //     setTodos(newTodoList);
    // }

    // function handleEditTodo(index) {
    //     const valueToBeEdited = todos[index].text;
    //     setTodoValue(valueToBeEdited);
    //     handleDeleteTodo(index);
    // }

    // function handleToggleComplete(index) {
    //     const newTodoList = todos.map((todo, todoIndex) => {
    //         if (todoIndex === index) {
    //             return { ...todo, completed: !todo.completed };
    //         }
    //         return todo;
    //     });
    //     persistData(newTodoList);
    //     setTodos(newTodoList);
    // }

    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate replace to="/login" />;
    }
    const name = localStorage.getItem('userName');

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token from local storage
        window.location.href = '/login';
    };

    useEffect(() => {
        if (token) {
            // Fetch the user's todos from the backend
            axios.get('http://localhost:5000/api/todos', {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => {
                    if (response.data.length > 0) {
                        setTodos(response.data);
                    }
                    setIsDataLoaded(true);
                })
                .catch(error => {
                    console.error('Error fetching todos', error);
                });
        }
    }, []);

    // Add a new todo
    const handleAddTodos = async (newTodo) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post('http://localhost:5000/api/todos', { text: newTodo }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos([...todos, response.data]);
        } catch (error) {
            console.error('Error adding todo', error);
        }
    };

    // Delete a todo
    const handleDeleteTodo = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:5000/api/todos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.filter((todo) => todo._id !== id));
        } catch (error) {
            console.error('Error deleting todo', error);
        }
    };

    // Mark a todo as complete/incomplete
    const handleToggleComplete = async (id, completed) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { completed: !completed }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.map(todo => todo._id === id ? response.data : todo));
        } catch (error) {
            console.error('Error toggling todo', error);
        }
    };

    // Edit a todo
    const handleEditTodo = async (id, newText) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`, { text: newText }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTodos(todos.map(todo => todo._id === id ? response.data : todo));
        } catch (error) {
            console.error('Error editing todo', error);
        }
    };

    return (
        <>
            <header className="header">
                <h1 className="title">Hi, {name}</h1> {/* Changed to display the user's name */}
                <div className="user-info">
                    <button onClick={handleLogout} className="logout-button">Logout</button>
                </div>
            </header>
            <TodoInput todoValue={todoValue} setTodoValue={setTodoValue} handleAddTodos={handleAddTodos} />
            {isDataLoaded ? (<TodoList
                handleEditTodo={handleEditTodo}
                handleDeleteTodo={handleDeleteTodo}
                handleToggleComplete={handleToggleComplete}
                todos={todos}
            />) : (<h2 className='center-text'>Loading...</h2>)}
        </>
    );


};

export default Home;
