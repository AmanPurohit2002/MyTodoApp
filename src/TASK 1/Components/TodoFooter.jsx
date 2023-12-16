import React from "react";

const TodoFooter = (props) => {

  const {setFilter,handleAllDelete}=props;
  return (
    <div className="footer">
      <strong>Show : </strong>
      <button onClick={()=> setFilter('All')}>All</button>
      <button onClick={()=> setFilter('Active')}>Active</button>
      <button onClick={()=> setFilter('Completed')}>Completed</button>
      <button onClick={handleAllDelete}>Delete All</button>
    </div>
  );
};

export default TodoFooter;
