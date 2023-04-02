import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import { v4 as uuidv4 } from "uuid";
import './NewTask.css';
import NavBar from "../NavBar/NavBar";





const LOCAL_STORAGE_KEY = "todoApp.todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const todoNameRef = useRef();
  const todoDescriptionRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos((prevTodos) => [...prevTodos, ...storedTodos]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function handleAddTodo() {
    const name = todoNameRef.current.value;
    const description = todoDescriptionRef.current.value;

    if (name === "" || description === "") return;

    if (editingTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === editingTodo.id) {
            return { ...todo, name: name, description: description };
          } else {
            return todo;
          }
        })
      );
      setEditingTodo(null);
    } 
    
    else {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: uuidv4(), name: name, description: description, complete: false },
      ]);
    }

    todoNameRef.current.value = null;
    todoDescriptionRef.current.value = null;
  }

  function handleEditTodoClick(todo) {
    setEditingTodo(todo);
    todoNameRef.current.value = todo.name;
    todoDescriptionRef.current.value = todo.description;
  }


  function handleToggleComplete(id) {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
      return updatedTodos;
    });
  }

  function handleClearStorage() {
    localStorage.clear();
    setTodos([]);
  }

  

  
  return (
    
  
<div>
<div>
      <NavBar /> {/* Include the NavBar component here */}
      <div className="container-fluid">
        {/* ... rest of the App component layout ... */}
      </div>
    </div>
    
    <div className="container-fluid">

    
       
     

     
    
      <div className="row mt-3">
        <div className="col-lg-4 col-md-6">
       <ToDoList
        todos={todos}
        toggleTodo={handleToggleComplete}
        editTodo={handleEditTodoClick}
      />
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

                <input
            type="text"
            className="form-control"
            placeholder="Add a description for the todo"
            ref={todoDescriptionRef}
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
            <button
              type="button"
              className="btn btn-secondary mr-2"
              onClick={handleClearStorage}
            >
              Clear complete
            </button>
            <div className="pt-2">
              {todos.filter((todo) => !todo.complete).length} left to do
            </div>
          </div>
        </div>
      </div>
      </div>
  </div>
  
    
  );
}  

export default App;
