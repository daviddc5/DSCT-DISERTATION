import React from "react";

export default function Todo({ todo, toggleTodo, editTodo }) {
  const handleEditClick = () => {
    editTodo(todo);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.checked}
        onChange={() => toggleTodo(todo.id)}
        id={`todo-${todo.id}`}
      />
      <label htmlFor={`todo-${todo.id}`}>
        {todo.name} - {todo.description} - {todo.software.join(", ")} -{" "}
        {todo.goalType} - {todo.days.join(", ")} - {todo.tags.join(", ")}
      </label>
      <button className="btn-edit" onClick={handleEditClick}>
        Edit
      </button>
    </div>
  );
}
