import { useRef, useState } from "react";

const initialTodos = [
  {
    id: 1,
    name: "Practice React",
    state: "Todo",
  },
  {
    id: 2,
    name: "Learn how to drag and drop",
    state: "In progress",
  },
  {
    id: 3,
    name: "Format PC",
    state: "Done",
  },
];

function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, setTodos] = useState(initialTodos);
  const todoIdBeingDraggedRef = useRef(null);

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      name: newTodoName,
      state: "Todo",
    };
    setTodos((previousTodos) => [...previousTodos, newTodo]);
  };

  const handleNewTodoOnChange = (event) => {
    const { value } = event.target;
    setNewTodoName(value);
  };

  const handleOnDragStartTodo = (todoId) => {
    todoIdBeingDraggedRef.current = todoId;
  };

  const handleOnDragOverTodo = (event) => {
    event.preventDefault();
  };

  const handleOnDropTodo = (event) => {
    // Get list state the todo was dropped on
    const { listState } = event.currentTarget.dataset;

    // Get the task that is beign dragged and
    // update its state with the list state
    const todoIdBeingDragged = todoIdBeingDraggedRef.current;
    const todoBeingDragged = todos.find(
      (todo) => todo.id === todoIdBeingDragged
    );

    const todoUpdated = {
      ...todoBeingDragged,
      state: listState,
    };

    // Update todos
    const updatedTodos = todos.map((todo) => {
      return todo.id === todoUpdated.id ? todoUpdated : todo;
    });

    setTodos(updatedTodos);
  };

  return (
    <div>
      <section>
        <h2>Add todo</h2>
        <form onSubmit={handleAddNewTodo}>
          <input
            placeholder="New todo name"
            onChange={handleNewTodoOnChange}
            value={newTodoName}
          />
        </form>
      </section>
      <section className="board">
        <div>
          <h3>Todo</h3>
          <div
            data-list-state="Todo"
            onDragOver={handleOnDragOverTodo}
            onDrop={handleOnDropTodo}
            className="list"
          >
            {todos &&
              todos
                .filter((todo) => todo.state === "Todo")
                .map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      draggable
                      onDragStart={() => handleOnDragStartTodo(todo.id)}
                      className="todo"
                    >
                      <p>{todo.name}</p>
                    </div>
                  );
                })}
          </div>
        </div>
        <div>
          <h3>In Progress</h3>
          <div
            data-list-state="In progress"
            onDragOver={handleOnDragOverTodo}
            onDrop={handleOnDropTodo}
            className="list"
          >
            {todos &&
              todos
                .filter((todo) => todo.state === "In progress")
                .map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      draggable
                      onDragStart={() => handleOnDragStartTodo(todo.id)}
                      className="todo"
                    >
                      <p>{todo.name}</p>
                    </div>
                  );
                })}
          </div>
        </div>
        <div>
          <h3>Done</h3>
          <div
            data-list-state="Done"
            onDragOver={handleOnDragOverTodo}
            onDrop={handleOnDropTodo}
            className="list"
          >
            {todos &&
              todos
                .filter((todo) => todo.state === "Done")
                .map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      draggable
                      onDragStart={() => handleOnDragStartTodo(todo.id)}
                      className="todo"
                    >
                      <p>{todo.name}</p>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
