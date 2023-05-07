import React from "react";

import "./ToDoList.css";

function ToDoList(props) {
  return (
    <ul className="list-group todo-list">
      {props.todos.map((todo) => (
        <li
          className={`list-group-item d-flex justify-content-between align-items-center ${
            todo.checked ? "bg-success text-white" : ""
          }`}
          key={todo.id}
        >
          <div className="d-flex align-items-center flex-grow-1">
            <div className="form-check mr-3">
              <input
                className="form-check-input big-checkbox"
                type="checkbox"
                checked={todo.checked}
                onChange={() => props.toggleTodo(todo.id)}
              />
            </div>
            <div className="flex-grow-1">
              <div className="form-check mb-2">
                <label
                  className={`form-check-label h4 mb-0 ${
                    todo.checked ? "text-white" : ""
                  }`}
                >
                  {todo.name}
                </label>
              </div>
              <div className="mb-2">
                <p className="mb-0">
                  <strong>Goal type:</strong> {todo.goalType}
                </p>
                <p className="mb-0">
                  <strong>Description:</strong> {todo.description}
                </p>
                <p className="mb-0">
                  <strong>Days to work on:</strong> {todo.days.join(", ")}
                </p>
                <p className="mb-0">
                  <strong>Apps required:</strong> {todo.software.join(", ")}
                </p>
                {todo.dueDate && (
                  <p className="mb-0">
                    <strong>Due date:</strong> {todo.dueDate}
                  </p>
                )}
                {todo.tags && todo.tags.length > 0 && (
                  <p className="mb-0">
                    <strong>Tags:</strong> {todo.tags.join(", ")}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <button
              className="btn btn-sm btn-outline-secondary mr-2"
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
