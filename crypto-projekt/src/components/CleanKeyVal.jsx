import React from "react";

const CleanKeyVal = ({ itemKey, val }) => {
  return (
    <div className="clean-keyval-container">
      <h5>{itemKey}</h5>
      <p>{val}</p>
    </div>
  );
};

export default CleanKeyVal;
