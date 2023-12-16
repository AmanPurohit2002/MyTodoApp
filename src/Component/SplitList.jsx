import React from "react";

const SplitList = (props) => {

    const {splitList}=props;
  return (
    <div className="split-list">
      <table className="split-list-table">
        <thead>
          <tr>
            <th>ID</th>
            {/* <th>Interval</th> */}
            <th>Timestamp</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {splitList.map((item, index) => (
            <tr key={index}>
              <td >{index + 1}</td>
              {/* <td className="timestamp-cell">{item.interval|| "---"}</td> */}
              <td className="timestamp-cell">{item.timeStamp || "---"} </td>
              <td>{item.value || "---"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SplitList;
