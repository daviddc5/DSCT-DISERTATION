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
      <span>{todo.name} - {todo.description}</span>
      <button onClick={handleEditClick}>Edit</button>
    </li>
  );
}
