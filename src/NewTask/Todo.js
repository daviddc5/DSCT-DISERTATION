import React from "react";


export default function Todo({ todo, toggleTodo, editTodo }) {

  function handleEditClick() {
    editTodo(todo);
  }



  return (
    <li>
      <input
        type="checkbox"
        checked={todo.complete}
        onChange={() => toggleTodo(todo.id)}
      />
      <span>{todo.name} - {todo.description} - {todo.software} -  {todo.goalType} - {todo.days} </span>
      {console.log(todo.days)}
      
      <button onClick={handleEditClick}>Edit</button>
    </li>
  );
}
