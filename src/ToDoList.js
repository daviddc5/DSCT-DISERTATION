

import React from 'react';
import Todo from './Todo';

export default function ToDoList({ todos, toggleTodo }) {

  // This is the render method of the component.
  // It returns a list of Todo components based on the input todos array.
  return (

    // We use the map method to iterate over each todo item in the todos array.
    todos.map((todo) => {

      // For each todo item, we create a new Todo component by passing the item as a prop.
      // The todo prop contains all the details of the todo item, such as its name and description.
      return (
        <Todo
          key={todo.id}
          
          todo={todo}
          toggleTodo={toggleTodo}
        />
      );
    })
  );
}
