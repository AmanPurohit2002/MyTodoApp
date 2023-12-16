import React, { useEffect, useState } from "react";
import TodoList from "./TodoList";
import TodoFooter from "./TodoFooter";

const TodoForm = () => {
  const [task, setTask] = useState("");
  const [list, setAddList] = useState(
    localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
  );
  const [filter, setFilter] = useState("All");
  const [isEdit, setIsEdit] = useState(null);
  const [editTask, setEditTask] = useState("");

  useEffect(() => {
    const update = JSON.parse(localStorage.getItem("todo")) || [];

    setAddList(update);
  }, []);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };


  const handleClick = () => {
    if ( task === null || task.length===0) return;
    if(task.trim()==='') return;
    // if( task.length >0 && task==='') return;
    // console.log("task length is ",task.length);
    // console.log("task is" , task===" ");

    setAddList([
      ...list,
      {
        key: list.length === 0 ? 1 : list[list.length - 1].key + 1,
        newTask: task,
        completed: false,
      },
    ]);

    setIsEdit(null);
    setTask("");
  };

  const handleDelete = (childData) => {
    setAddList(list.filter((item) => item.key !== childData));
  };

  const toggleCompleted = (childKey) => {
    const updatedList = list.map((item) => {
      if (item.key === childKey) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });
    setAddList(updatedList);
  };

  const filterList = () => {
    if (filter === "Active") {
      return list.filter((item) => !item.completed);
    } else if (filter === "Completed") {
      return list.filter((item) => item.completed);
    } else {
      return list;
    }
  };

  const handleAllDelete = () => {
    setAddList([]);
  };

  const updateTaskText = (key, newText) => {
    const updateTask = list.map((item) =>
      item.key === key ? { ...item, newTask: newText } : item
    );

    setAddList(updateTask);
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add Your Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          id="formInput"
        />
        <button onClick={handleClick} id="formBtn">
          Add
        </button>
        <TodoList
          key={list.key}
          list={filterList()}
          delete={handleDelete}
          toggleCompleted={toggleCompleted}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          updateTaskText={updateTaskText}
          editTask={editTask}
          setEditTask={setEditTask}
        />
        <TodoFooter setFilter={setFilter} handleAllDelete={handleAllDelete} />
      </form>
    </div>
  );
};

export default TodoForm;
