import React from "react";
import { v4 as uuidv4 } from 'uuid';



function ToDoList(props) {
  return (
    <ul className="list-group">
      {props.todos.map((todo) => (
        <li
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.complete ? "bg-success text-white" : ""
          }`}
          key={uuidv4()}
        >
          <div className="d-flex align-items-center">
            <div className="form-check mr-3">
              
              <input
                className="form-check-input big-checkbox"
                type="checkbox"
                checked={todo.complete}
                onChange={() => props.toggleTodo(todo.id)}
              />
            </div>
            <div>
              <div className="form-check mb-0">
                <label
                  className={`form-check-label h4 mb-0 ${
                    todo.complete ? "text-white" : ""
                  }`}
                >
                  {todo.name}
                </label>
              </div>
              <p className="mb-0">{todo.description}</p>
              <p className="mb-0">Name of the goal: {todo.goal}</p>
              <p className="mb-0">Days to work on: {todo.days.join(", ")}</p>
                  
              <p className="mb-0">Apps to block: {todo.apps}</p>
              <p className="mb-0">Contacts: {todo.contacts}</p>
            </div>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => props.editTodo(todo)}
            >
              Edit
            </button>
            

            
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ToDoList;
