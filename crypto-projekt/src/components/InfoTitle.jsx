import React from "react";

const InfoTitle = ({ title, hoverText }) => {
  return (
    <div className="section-title">
      <h3>{title}</h3>
      {hoverText && (
        <div className="info-i-container">
          <div className="info-i">i</div>
          <div className="hover-container">{hoverText}</div>
        </div>
      )}
    </div>
  );
};

export default InfoTitle;
