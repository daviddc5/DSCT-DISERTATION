import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
// import NavBar from "./NavBar";
import { v4 as uuidv4 } from "uuid";

// import { BrowserRouter as Router } from 'react-router-dom';

const LOCAL_STORAGE_KEY = "todoApp.todos"

function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  
  useEffect(() => {
    // Get any stored todos from local storage
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    
    // If there are any stored todos, set them as the initial state
    if (storedTodos) setTodos( prevTodos => [...prevTodos, ...storedTodos] );
    
    // This useEffect hook only needs to run once, so we pass an empty array as the second argument
  }, []);
  
  useEffect(() => {
    // Whenever the todos state changes, save it to local storage
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  

  function handleAddTodo() {
    // Get the value of the input field
    const name = todoNameRef.current.value;
  
    // If the input field is empty, return and do nothing
    if (name === "") return;
  
    // Otherwise, add the new todo to the list by creating a new array
    // with the old todos plus the new one
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }];
    });
  
    // Clear the input field by setting its value to null
    todoNameRef.current.value = null;
  }
  // function handleToggleComplete(id) {
  //   setTodos(prevTodos => {
  //     const updatedTodos = prevTodos.map(todo => {
  //       if (todo.id === id) {
  //         return { ...todo, complete: !todo.complete };
  //       }
  //       return todo;
  //     });
  //     return updatedTodos;
  //   });
  // }
  
  return (
    <div className="container-fluid">
      {/* <NavBar /> */}

      <div className="row mt-3">
        <div className="col-lg-4 col-md-6">
          <ToDoList todos={todos} />
        </div>

        <div className="col-lg-4 col-md-6">
          <form>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Add a new todo"
                ref={todoNameRef}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTodo}
            >
              Add to do
            </button>
          </form>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-secondary mr-2">
              Clear completed
            </button>
            <div className="pt-2">{todos.length} left to do</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
