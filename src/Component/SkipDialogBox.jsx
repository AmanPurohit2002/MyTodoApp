import React from "react";

const SkipDialogBox = (props) => {
  return (
    <div className="skipDialogBox">
      <div className="skip-dialog-content">
        <h1>Do you want to skip?</h1>
        <button onClick={props.handleYesClick}>Yes</button>
        <button onClick={props.handleNoClick}>No</button>
      </div>
    </div>
  );
};

export default SkipDialogBox;
