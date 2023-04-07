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
      <span>{todo.name} - {todo.description} - {todo.apps} -  {todo.days} - {todo.contacts}</span>
      {console.log(todo.days)}
      
      <button onClick={handleEditClick}>Edit</button>
    </li>
  );
}
