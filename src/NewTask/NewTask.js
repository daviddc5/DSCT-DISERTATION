// Importing React and hooks
import React, { useState, useRef, useEffect } from "react";

// Importing external libraries
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";

// Importing local components and utilities
import ToDoList from "./ToDoList";
import NavBar from "../NavBar/NavBar";
import softwareOptions from "./softwareOptions";
// import weely page


// Importing styles
import "./NewTask.css";


// Defining a variable for storing the todos
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

//Add a new state variable to store the selected goal type.
    const [goalType, setGoalType] = useState(null);

// new state variable for the selected software:

const [selectedSoftware, setSelectedSoftware] = useState([]);




//function to handle the change in the selected software

function handleSelectedSoftwareChange(selectedOptions) {
  setSelectedSoftware(selectedOptions);
}


// handle the change of the goal type.
  function handleGoalTypeChange(e) {
    setGoalType(e.target.value);
  }
    

  function handleDaysChange(selectedOptions) {
    const selectedDayNames = selectedOptions.map(option => option.value);
    setDays(prevDays => {
      return prevDays.map(day => {
        return {
          ...day,
          checked: selectedDayNames.includes(day.name)
        };
      });
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
// array of selected day names

      const selectedDays = days

      .filter((day) => day.checked)
      .map((day) => day.name);
      console.log(selectedDays)

    const software = selectedSoftware.map((option) => option.value)


      
// If any field is empty or not selected, the function returns without doing anything.
if (
  name === "" ||
  description === "" ||
  selectedDays.length === 0 ||
  goalType === null ||
  selectedSoftware.length === 0
) return;


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
              software: software,
              days:selectedDays,
              goalType: goalType
              
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
          software: software,
          days:selectedDays,
          goalType: goalType
        },
      ]);
    }
    todoNameRef.current.value = null;
    todoDescriptionRef.current.value = null;
   
    //Resetting the checkbox inputs to unchecked after adding a todo, using forEach on the todoDaysRefs array.

    setDays(resetDays);
    setGoalType(null);

    // Reset the selected software to an empty array
    setSelectedSoftware([]);
   

    // set the days to false
  }
  
// changes the values of a selected todo
  function handleEditTodoClick(todo) {
    setEditingTodo(todo);
    todoNameRef.current.value = todo.name;
    todoDescriptionRef.current.value = todo.description;
    
    setGoalType(todo.goalType);

      // Update the 'days' state based on the editingTodo.days array
      setDays((prevDays) => {
      return prevDays.map((day) => {
      return {
      ...day,
      checked: todo.days.includes(day.name),
      };
      });
      });

    // ...
  const selectedSoftwareOptions = todo.software.map((software) =>
  softwareOptions.find((option) => option.value === software)
);
setSelectedSoftware(selectedSoftwareOptions);
      

  
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

<div className="container-fluid">
<div className="row mt-3">
{/* ToDoList column */}
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
<ToDoList
todos={todos}
toggleTodo={handleToggleComplete}
editTodo={handleEditTodoClick}
/>



</div>

{/* Form column */}
<div className="col-xl-4 col-lg-6 col-md-6 col-sm-12">
<div className="form-container">
{/* Form content */}

{/*  Name reference */}
<label htmlFor="todoName">Name of the Goal</label>
<input
type="text"
className="form-control"
placeholder="Name of the Goal"
ref={todoNameRef}
/>
{/*  Description reference */}
<label htmlFor="todoDescription">Add a description for the todo</label>
<input
type="text"
className="form-control"
placeholder="Add a description for the todo"
ref={todoDescriptionRef}
/>

{/* days reference */}
{/* Add a new input for each day in your form, using the name property from each day object as the label and the checked property as the value: */}

<div className="form-group">
<label htmlFor="days">Days to work on goal</label>
<Select
isMulti
className="basic-multi-select"
classNamePrefix="select"
id="days"
options={days.map(day => ({ value: day.name, label: day.name }))}
value={days.filter(day => day.checked).map(day => ({ value: day.name, label: day.name }))}
onChange={handleDaysChange}
/>
</div>



{/* radio buttons for short-term and long-term goals inside the form. */}
<label htmlFor="shortOrLongTermDescription">Select the type of Goal:</label>
<div className="form-group">
<div className="form-check">
<input
className="form-check-input"
type="radio"
name="goalType"
id="short-term"
value="short-term"
checked={goalType === "short-term"}
onChange={handleGoalTypeChange}
/>
<label className="form-check-label" htmlFor="short-term">
Short-term Goal
</label>
</div>
<div className="form-check">
<input
className="form-check-input"
type="radio"
name="goalType"
id="long-term"
value="long-term"
checked={goalType === "long-term"}
onChange={handleGoalTypeChange}
/>
<label className="form-check-label" htmlFor="long-term">
Long-term Goal
</label>
</div>
</div>


{/* software */}
<div className="form-group">
  <label htmlFor="software">Applications required for the goal</label>
  <Select
    isMulti
    className="basic-multi-select"
    classNamePrefix="select"
    id="software"
    options={softwareOptions}
    value={selectedSoftware}
    onChange={handleSelectedSoftwareChange}
  />
</div>



<button
  type="button"
  className="btn btn-primary mt-2" // Added margin-top for better spacing
  onClick={handleAddTodo}
>
  Add to do
</button>


</div>
</div>
</div>


 {/* Clear storage */}
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
      
   
);

}

export default NewTask;
