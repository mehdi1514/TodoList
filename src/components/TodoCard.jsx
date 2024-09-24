import { useState } from 'react';

export default function TodoCard(props) {
    const { todo, handleDeleteTodo, handleEditTodo, handleToggleComplete } = props;
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(todo.text);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setNewText(todo.text); // Reset the text when toggling edit mode
    };

    const handleSave = () => {
        handleEditTodo(todo._id, newText); // Send the updated text to the edit handler
        setIsEditing(false); // Exit edit mode after saving
    };

    return (
        <li className={`todoItem ${todo.completed ? 'completed' : ''}`}>
            {isEditing ? (
                <p>
                    <input
                        type="text"
                        className="edit-input"
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                </p>
            ) : (
                <p>{todo.text}</p>
            )}

            <div className="actionsContainer">
                {!isEditing && (<button onClick={() => handleToggleComplete(todo._id, todo.completed)}>
                    {todo.completed ? <i className="fa-solid fa-circle-check"></i> : <i className="fa-regular fa-circle"></i>}
                </button>)}

                {isEditing ? (
                    <>
                        <button className="save-btn" onClick={handleSave}>
                            Save
                        </button>
                        <button className="cancel-btn" onClick={toggleEdit}>
                            Cancel
                        </button>
                    </>
                ) : (
                    <button onClick={toggleEdit}>
                        <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                )}

                {!isEditing && (<button onClick={() => handleDeleteTodo(todo._id)}>
                    <i className="fa-regular fa-trash-can"></i>
                </button>)}
            </div>
        </li>
    );
}
