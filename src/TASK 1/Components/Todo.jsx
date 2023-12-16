import React from "react";
import TodoForm from "./TodoForm";
import TodoHeader from "./TodoHeader";
import '../CSS/Todo.css';

const Todo = () => {
  return (
    <div className="todo">
      <TodoHeader />
      <TodoForm />
    </div>
  );
};

export default Todo;
