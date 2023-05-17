import React, { useState } from "react";

export default function TodoList() {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems((prevItems) => [
        ...prevItems,
        { text: inputValue, completed: false },
      ]);
      setInputValue("");
    }
  };

  const handleToggleItem = (index) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].completed = !updatedItems[index].completed;
      return updatedItems;
    });
  };

  const remainingTasks = items.filter((item) => !item.completed).length;
  const totalTasks = items.length;

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <button onClick={handleAddItem}>Add</button>
      <ul>
        {items.map((item, index) => (
          <li
            key={index}
            className={item.completed ? "is-done" : ""}
            onClick={() => handleToggleItem(index)}
          >
            {item.text}
          </li>
        ))}
      </ul>
      <p className="task-counter">
        {remainingTasks} remaining out of {totalTasks} tasks
      </p>
    </div>
  );
}
