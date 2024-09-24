import React from 'react';
import TodoCard from './TodoCard';

export default function TodoList({ todos, handleDeleteTodo, handleEditTodo, handleToggleComplete }) {
  return (
    <ul className="main">
      {todos.length > 0 ? todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          handleDeleteTodo={handleDeleteTodo}
          handleEditTodo={handleEditTodo}
          handleToggleComplete={handleToggleComplete}
        >
          {todo.text}
        </TodoCard>
      )) : (<h2 className="center-text">No todos created</h2>)}
    </ul>
  );
}
