import React, { useState } from "react";

const Input = ({ onChange, placeholder, value, setUserInput }) => {
  if (value == null) {
    value = "";
  }
  const [input, setInput] = useState("");

  return (
    <div className="input-container">
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
        type="text"
        className="custom-input"
        placeholder={placeholder}
      />
      <div
        onClick={() => {
          setUserInput(input);
        }}
        className="input-button"
      >
        Search network
      </div>
    </div>
  );
};

export default Input;
