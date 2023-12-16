import React from "react";
import { AiFillDelete, AiFillEdit, AiTwotoneSave } from "react-icons/ai";

const TodoList = (props) => {
  const { isEdit, setIsEdit, updateTaskText, editTask, setEditTask} = props;

  const handleSave = (key) => {
    updateTaskText(key, editTask);
    setIsEdit(null);
    setEditTask("");
  };

  const handleUpdate = (data) => {
    setIsEdit(data.key);
    setEditTask(data.newTask);
  };

  return (
    <div className="listRender">
      { props.list.map((val) => {
        return (
          <div className="listPutting">
            <input
              type="checkbox"
              checked={val.completed}
              onChange={() => props.toggleCompleted(val.key)}
            />

            {isEdit === val.key ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleSave(val.key);
                  }}
                >
                  <AiTwotoneSave style={{color:'green'}}/>
                </button>
              </>
            ) : (
              <>
                <label>{val.newTask}</label>

                <button onClick={() => handleUpdate(val)}>
                  <AiFillEdit id='AiFillEdit' style={{ color: "#1725ca" }} />
                </button>
              </>
            )}

            <button onClick={() => props.delete(val.key)}>
              <AiFillDelete />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
