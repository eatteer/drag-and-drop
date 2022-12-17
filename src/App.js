import { useRef, useState } from "react";

const initialLists = [
  {
    id: 1,
    name: "Todo",
  },
];

function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, setTodos] = useState([]);
  const todoIdBeingDraggedRef = useRef(null);

  const [newListName, setNewListName] = useState("");
  const [lists, setLists] = useState(initialLists);

  const handleAddNewTodo = (event) => {
    event.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      name: newTodoName,
      state: "Todo",
    };
    setTodos((previousTodos) => [...previousTodos, newTodo]);
    setNewTodoName("");
  };

  const handleAddNewList = (event) => {
    event.preventDefault();
    const newList = {
      id: lists.length + 1,
      name: newListName,
    };
    setLists((previousLists) => [...previousLists, newList]);
    setNewListName("");
  };

  const handleNewTodoOnChange = (event) => {
    const { value } = event.target;
    setNewTodoName(value);
  };

  const handleNewListOnChange = (event) => {
    const { value } = event.target;
    setNewListName(value);
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
      <section>
        <h2>Add list</h2>
        <form onSubmit={handleAddNewList}>
          <input
            placeholder="New list name"
            onChange={handleNewListOnChange}
            value={newListName}
          />
        </form>
      </section>
      <section className="board">
        {lists &&
          lists.map((list) => {
            return (
              <div>
                <h3>{list.name}</h3>
                <div
                  data-list-state={list.name}
                  onDragOver={handleOnDragOverTodo}
                  onDrop={handleOnDropTodo}
                  className="list"
                >
                  {todos &&
                    todos
                      .filter((todo) => todo.state === list.name)
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
            );
          })}
      </section>
    </div>
  );
}

export default App;
