// importing react hooks
import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";

import './NewTask.css';
import NavBar from "../NavBar/NavBar";

// defining a variable for storing the todos
const LOCAL_STORAGE_KEY = "todoApp.todos";

// main react App
function NewTask() {
  // Initialize the state variable 'todos' as an empty array and declare the function 'setTodos' to update it
  const [todos, setTodos] = useState([]);

  // editingTodo state is used to keep track of which todo is being edited
  const [editingTodo, setEditingTodo] = useState(null);




// used to access the values of the input fields in the form at any given time
  const todoNameRef = useRef();
  const todoDescriptionRef = useRef();
  const todoGoalRef = useRef();
 
  const todoHoursRef = useRef();
  const todoAppsRef = useRef();
  const todoContactsRef = useRef();


  // 1. Update your state to include an array of day objects:
  const [days, setDays] = useState([
    { name: "Sunday", checked: false },
    { name: "Monday", checked: false },
    { name: "Tuesday", checked: false },
    { name: "Wednesday", checked: false },
    { name: "Thursday", checked: false },
    { name: "Friday", checked: false },
    { name: "Saturday", checked: false },
  ]);
  
  //2. Create a function to handle toggling the checked state of a day:
  function handleToggleDay(index) {
    setDays((prevDays) => {
      const updatedDays = [...prevDays];
      updatedDays[index].checked = !updatedDays[index].checked;
     
      return updatedDays;
    });
  }
  


  // These effects handle the storage of todos in local storage. 
  // The first effect retrieves any previously saved todos and updates the todos state with them on mount. 
  // The second effect updates local storage with any changes to the todos state.
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) setTodos((prevTodos) => [...prevTodos, ...storedTodos]);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);







  // This is a function that handles the addition of a new todo item.
  function handleAddTodo() { 
    const name = todoNameRef.current.value;
    const description = todoDescriptionRef.current.value;
    const goal = todoGoalRef.current.value;
    const hours = todoHoursRef.current.value;
    const apps = todoAppsRef.current.value;
    const contacts = todoContactsRef.current.value;

    // array of selected day names
    const selectedDays = days
    .filter((day) => day.checked)
    .map((day) => day.name);

    


    // If either field is empty, the function returns without doing anything.
    if (name === "" || description === "" || goal === "" ||  hours === "" || apps === "" || contacts === "") return;

    // If editingTodo is not null, this means that an existing todo is being edited. 
    // The function updates the todo by mapping through the previous todos and replacing the todo with the matching editingTodo ID with an updated version 
    if (editingTodo) {
        // array of selected day names
       
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === editingTodo.id) {
            return { 
              ...todo, 
              name: name, 
              description: description, 
              goal: goal,
              hours: hours,
              apps: apps,
              contacts: contacts,
              days:selectedDays
              
            };
          } else {
            return todo;
          }
        })
      );
      // After updating the todos, the function sets editingTodo to null to indicate that no todo is being edited.
      setEditingTodo(null);
    } 
    // If not editing an existing todo, create a new todo object and add it to the todos state with default values for additional properties

    else {
       

      setTodos((prevTodos) => [
        ...prevTodos,
        { 
          
          name: name, 
          description: description, 
          complete: false,
          goal: goal,
          hours: hours,
          apps: apps,
          contacts: contacts,
          days:selectedDays
        },
      ]);
    }
    todoNameRef.current.value = null;
    todoDescriptionRef.current.value = null;
    todoGoalRef.current.value = null;
    //Resetting the checkbox inputs to unchecked after adding a todo, using forEach on the todoDaysRefs array.
    todoHoursRef.current.value = null;
    todoAppsRef.current.value = null;
    todoContactsRef.current.value = null;
  }
  
// changes the values of a selected todo
  function handleEditTodoClick(todo) {
    setEditingTodo(todo);
    todoNameRef.current.value = todo.name;
    todoDescriptionRef.current.value = todo.description;
    todoGoalRef.current.value = todo.goal;
   
    todoHoursRef.current.value = todo.hours;
    todoAppsRef.current.value = todo.apps;
    todoContactsRef.current.value = todo.contacts;}

// loops through todos, checks for todos with given id parameter and changes its status to complete, ironically by negating the complete status
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
    {/* navBar div */}
    <NavBar /> 
    </div>
{/* Runs toDoList component */}
    
    <div className="container-fluid">
    <div className="row mt-3">
    <div className="col-lg-4 col-md-6">
    <ToDoList
    todos={todos}
    toggleTodo={handleToggleComplete}
    editTodo={handleEditTodoClick}
    
    />
    </div>
{/*  Name reference */}
    <div className="col-lg-4 col-md-6">
    <form>
    <div className="form-group">
    <input
    type="text"
    className="form-control"
    placeholder="Add a new todo"
    ref={todoNameRef}
      />
{/*  Description reference */}

    <input
    type="text"
    className="form-control"
    placeholder="Add a description for the todo"
    ref={todoDescriptionRef}
    />

   
{/* Goal reference */}
  <input
  type="text"
  className="form-control"
  placeholder="Add a goal for the todo"
  ref={todoGoalRef}
/>
{/* days reference */}
{/* Add a new input for each day in your form, using the name property from each day object as the label and the checked property as the value: */}

{days.map((day, index) => (
  <div className="form-check form-check-inline" key={index}>
    <input
      className="form-check-input"
      type="checkbox"
      id={`day-${day.name}`}
      value={day.checked}
      onChange={() => handleToggleDay(index)}
    />
    <label className="form-check-label" htmlFor={`day-${day.name}`}>
      {day.name}
    </label>
  </div>

))}




{/* number of hours to complete */}
<input
  type="number"
  className="form-control"
  placeholder="Add the number of hours to complete the todo"
  ref={todoHoursRef}
/>
{/* apps to block */}
<input
  type="text"
  className="form-control"
  placeholder="Add the apps to block"
  ref={todoAppsRef}
/>

{/* "Add any contacts needed for the todo" */}
<input
  type="text"
  className="form-control"
  placeholder="Add any contacts needed for the todo, these will take priority"
  ref={todoContactsRef}
/>

</div>
{/* button that when clicked calls the handle add to do function */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleAddTodo}
            >
              Add to do
            </button>
          </form>
        </div>
{/* sets button that when clicked  will clear storage */}
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

export default NewTask;
