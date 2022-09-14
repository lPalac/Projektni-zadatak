import React from "react";

const DataKey = ({ itemKey, value }) => {
  return (
    <div className="clean-keyval-container">
      <h5>{itemKey}</h5>
      <p>{value}</p>
    </div>
  );
};

export default DataKey;
