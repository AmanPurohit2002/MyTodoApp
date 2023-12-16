import React, { useState } from "react";

const DialogBox = (props) => {
  const [dropdownData, setDropDownData] = useState('0');
  const [isChecked,setIsChecked]=useState(false);
  // console.log(typeof(dropdownData),dropdownData);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setIsChecked(selectedValue !== '0');
  }


  return (
    <div className="dialog-box">

      <div className="dialog-content">
        <div className="dialog-heading">
          <h2>Are you sure you want to reset</h2>
        </div>

        <div className="dialog-body">
          <div className="dialog-body-dropdown">
          <label>Select reset duration:</label>
            <select
              value={dropdownData}
              onChange={(e) => {
                setDropDownData(e.target.value);
                handleChange(e); // Call handleChange when dropdown value changes
              }}
            >
              <option value={0} >
                Always
              </option>
              <option value={1} >
                10 seconds
              </option>
              <option value={3} >
                30 seconds
              </option>
              <option value={5} >
                50 seconds
              </option>
              <option value={7} >
                70 seconds
              </option>
            </select>
          </div>
          <div className="dialog-body-checkbox">
            <input type="checkbox" checked={isChecked} onChange={handleChange}/>
            <label>Interval</label>
          </div>
        </div>

        <div className="dialog-footer">
          <input
            type="button"
            value={"Yes"}
            onClick={(e) => props.onWork(e.target.value,dropdownData)}
          />
          <input
            type="button"
            value={"No"}
            onClick={(e) => props.onWork(e.target.value,dropdownData)}
          />
        </div>
      </div>
    </div>
  );
};

export default DialogBox;
