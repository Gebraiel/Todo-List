import { useState } from "react";
export default function TodoList({ todos, onToggle }) {
  const [todoList, setTodoList] = useState(todos);
  const [todoDescription, setTodoDescription] = useState("");
  const [filter, setFilter] = useState("ALL");
  let shownList = todoList.filter((todo) => {
    switch (filter) {
      case "COMPLETED":
        return todo.completed;
        break;
      case "ACTIVE":
        return !todo.completed;
        break;
      case "ALL":
        return true;
        break;
      default:
        return true;
    }
  });
  function handleCheck(todo) {
    let completed = !todo.completed;
    let checkedTodo = { ...todo, completed };
    console.log(checkedTodo);
    setTodoList(
      todoList.map((t) => (t.id === todo.id ? (t = checkedTodo) : t))
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    console.log(e.target.value);
    let newTodo = {
      id: crypto.randomUUID(),
      todo: todoDescription,
      completed: false,
    };
    setTodoDescription("");
    setTodoList(Array.from([...todoList, newTodo]));
  }
  function handleDelete(id) {
    setTodoList(Array.from(todoList.filter((todo) => todo.id !== id)));
  }
  function clearHandle() {
    setTodoList(Array.from(todoList.filter((todo) => !todo.completed)));
  }
  function filterHandle(filter) {
    setFilter(filter);
  }
  return (
    <div className="todo-list container">
      <div className="row space-between mb-50">
        <h1>Todo</h1>
        <button className="toggle" onClick={onToggle}>
          <img className="sun" src="images/icon-sun.svg" alt="" />
          <img className="moon" src="images/icon-moon.svg" alt="" />
        </button>
      </div>
      <form
        className="row todo-container input-container mb-30"
        onSubmit={(e) => handleSubmit(e)}
      >
        <button className="check"></button>
        <input
          type="text"
          placeholder="Create A New Todo..."
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
      </form>
      <div className="todos">
        {shownList.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            onCheck={handleCheck}
            onDelete={handleDelete}
          />
        ))}
      </div>
      <TodoStats
        todos={shownList}
        onClear={clearHandle}
        onFilter={filterHandle}
      />
    </div>
  );
}

function Todo({ todo, onCheck, onDelete }) {
  return (
    <div className={`${todo.completed ? "completed" : ""} todo todo-container`}>
      <div className="row">
        <button className="check" onClick={() => onCheck(todo)}></button>
        <p className="title">{todo.todo}</p>
      </div>
      <button className="cancel" onClick={() => onDelete(todo.id)}>
        <img src="images/icon-cross.svg" />
      </button>
    </div>
  );
}
function TodoStats({ todos, onClear, onFilter }) {
  const [activeFilter, setActiveFilter] = useState("ALL");
  function filterHandle(filter) {
    onFilter(filter);
    setActiveFilter(filter);
  }
  return (
    <>
      <div className="desktop row space-between todos-stats todo-container">
        <div className="count">
          {todos.filter((todo) => !todo.completed).length} Items Left
        </div>
        <div className="filter">
          <button
            className={`${activeFilter === "ALL" ? "active" : ""}`}
            onClick={() => filterHandle("ALL")}
          >
            All
          </button>
          <button
            className={`${activeFilter === "ACTIVE" ? "active" : ""}`}
            onClick={() => filterHandle("ACTIVE")}
          >
            {" "}
            Active
          </button>
          <button
            className={`${activeFilter === "COMPLETED" ? "active" : ""}`}
            onClick={() => filterHandle("COMPLETED")}
          >
            Completed
          </button>
        </div>
        <button className="clear" onClick={() => onClear()}>
          Clear Completed
        </button>
      </div>
      <div className="mobile todos-stats ">
        <div className="row space-between todo-container mb-30">
          <div className="count">
            {todos.filter((todo) => !todo.completed).length} Items Left
          </div>
          <button className="clear" onClick={() => onClear()}>
            {" "}
            Clear Completed{" "}
          </button>
        </div>
        <div className="filter todo-container ">
          <button
            className={`${activeFilter === "ALL" ? "active" : ""}`}
            onClick={() => filterHandle("ALL")}
          >
            All
          </button>
          <button
            className={`${activeFilter === "ACTIVE" ? "active" : ""}`}
            onClick={() => filterHandle("ACTIVE")}
          >
            {" "}
            Active
          </button>
          <button
            className={`${activeFilter === "COMPLETED" ? "active" : ""}`}
            onClick={() => filterHandle("COMPLETED")}
          >
            Completed
          </button>
        </div>
      </div>
    </>
  );
}
