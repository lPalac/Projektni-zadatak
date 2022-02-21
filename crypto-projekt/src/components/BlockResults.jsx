import React from "react";
import InfoTitle from "./InfoTitle";
import SimpleKeyValPair from "./SimpleKeyValPair";

const BlockResults = ({ block, txOnClick }) => {
  const arrayOfKeys = Object.keys(block);
  return (
    <div>
      <InfoTitle
        title={`Block ${block.height}`}
        hoverText={`Block at height ${block.height} in the Bitcoin blockchain`}
      />
      {Object.keys(block).map((keyName, i) => {
        if (arrayOfKeys[i] !== "tx") {
          return (
            <SimpleKeyValPair objKey={arrayOfKeys[i]} value={block[keyName]} />
          );
        }
      })}
      <div>
        <h3>Block transactions</h3>
        {block.tx?.map((el) => (
          <h4
            onClick={() => {
              txOnClick(el);
            }}
            style={{ cursor: "pointer" }}
          >
            {el}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default BlockResults;
