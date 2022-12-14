import React from "react";

const SimpleKeyValPair = ({ objKey, value }) => {
  return (
    <div className="data-val-container">
      <h5>{objKey}</h5>
      <p>{value}</p>
    </div>
  );
};

export default SimpleKeyValPair;
