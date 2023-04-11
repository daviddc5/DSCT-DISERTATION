// importing react hooks
import React, { useState, useRef, useEffect } from "react";
import ToDoList from "./ToDoList";
import './NewTask.css';
import NavBar from "../NavBar/NavBar";
import { v4 as uuidv4 } from 'uuid';


// defining a variable for storing the todos
const LOCAL_STORAGE_KEY = "todoApp.todos";

// add long or short term goal
// one is adding manualy and another is timer
// main react App
function NewTask() {
  // Initialize the state variable 'todos' as an empty array and declare the function 'setTodos' to update it
  const [todos, setTodos] = useState([]);

  // editingTodo state is used to keep track of which todo is being edited
  const [editingTodo, setEditingTodo] = useState(null);

// used to access the values of the input fields in the form at any given time
  const todoNameRef = useRef();
  const todoDescriptionRef = useRef();
  const todoAppsRef = useRef();
  


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
  
// This function handles toggling the checked state of a day based on the provided index.
function handleToggleDay(index) {

  // We use the 'setDays' function from the state hook to update the 'days' array in state.
  // We pass a function to setDays that takes the previous state 'prevDays' as input and returns the updated state.
  setDays((prevDays) => {
    // We create a deep copy of the previous state using JSON.parse(JSON.stringify()).
    const updatedDays = JSON.parse(JSON.stringify(prevDays));
    
    // We toggle the checked state of the day at the provided index.
    updatedDays[index].checked = !updatedDays[index].checked;
    
    // We log the updated state to the console.
    console.log(updatedDays)

    // We return the updated state to update the 'days' array in state.
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


 // 1. useEffect hook that runs when the editingTodo state changes.
useEffect(() => {
  // 2. Check if a todo is being edited (editingTodo is not null).
  if (editingTodo) {
    // 3. Create a new array of updated days based on the editingTodo.days array.
    const updatedDays = days.map((day) => {
      return {
        ...day,
        // 4. Set the 'checked' property of each day based on whether the day is included in the editingTodo.days array.
        checked: editingTodo.days.includes(day.name),
      };
    });
    // 5. Update the 'days' state with the new array of updated days.
    setDays(updatedDays);
  } else {
    // 6. If no todo is being edited (editingTodo is null), reset the 'checked' property of each day to 'false'.
    const resetDays = days.map((day) => ({ ...day, checked: false }));
    // 7. Update the 'days' state with the new array of reset days.
    setDays(resetDays);
  }
  // 8. Add editingTodo to the dependency array of the useEffect hook to ensure the hook runs when the editingTodo state changes.
}, [editingTodo]);




  // This is a function that handles the addition of a new todo item.
  function handleAddTodo() { 
    const name = todoNameRef.current.value;
    const description = todoDescriptionRef.current.value;

    const apps = todoAppsRef.current.value;
   
      // array of selected day names

    
      const selectedDays = days

      .filter((day) => day.checked)
      .map((day) => day.name);
      console.log(selectedDays)
      
// If either field is empty, the function returns without doing anything.
    if (name === "" || description === "" || 
       apps === "" || selectedDays.length  === 0) return;

// Set the checked property of each day object to false
      const resetDays = days.map((day) => ({ ...day, checked: false }));

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
              apps: apps,
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
          id: uuidv4(),
          name: name, 
          description: description, 
          complete: false,
          apps: apps,
       
          days:selectedDays
        },
      ]);
    }
    todoNameRef.current.value = null;
    todoDescriptionRef.current.value = null;
   
    //Resetting the checkbox inputs to unchecked after adding a todo, using forEach on the todoDaysRefs array.
   
    todoAppsRef.current.value = null;
    
    setDays(resetDays);
    // set the days to false
  }
  
// changes the values of a selected todo
  function handleEditTodoClick(todo) {
    setEditingTodo(todo);
    todoNameRef.current.value = todo.name;
    todoDescriptionRef.current.value = todo.description;
    todoAppsRef.current.value = todo.apps;
      // Update the 'days' state based on the editingTodo.days array
      setDays((prevDays) => {
      return prevDays.map((day) => {
      return {
      ...day,
      checked: todo.days.includes(day.name),
      };
      });
      });
  
  }



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
    placeholder="Name of the Goal"
    ref={todoNameRef}
      />
{/*  Description reference */}

    <input
    type="text"
    className="form-control"
    placeholder="Add a description for the todo"
    ref={todoDescriptionRef}
    />

{/* days reference */}
{/* Add a new input for each day in your form, using the name property from each day object as the label and the checked property as the value: */}

{days.map((day, index) => (
  <div className="form-check form-check-inline" key={index}>
    <input
      className="form-check-input"
      type="checkbox"
      id={`day-${day.name}`}
      checked ={day.checked}
      onChange={() => handleToggleDay(index)}
    />
    <label className="form-check-label" htmlFor={`day-${day.name}`}>
      {day.name}
    </label>
  </div>

))}


{/* apps to block */}
<input
  type="text"
  className="form-control"
  placeholder="Applications required for the goal"
  ref={todoAppsRef}
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
