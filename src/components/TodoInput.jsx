import { useState } from "react"

export default function TodoInput(props) {
    const { handleAddTodos, todoValue, setTodoValue } = props

    const handleSubmit = () => {
        handleAddTodos(todoValue);
        setTodoValue('');
    };

    return (
        <header>
            <input value={todoValue} onChange={(e) => {
                setTodoValue(e.target.value);
            }} onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    handleSubmit(); // Calls the submit function when "Enter" is pressed
                }
            }} placeholder="Enter todo..." />
            <button onClick={() => {
                handleAddTodos(todoValue)
                setTodoValue('')
            }}>Add</button>
        </header>
    )
}