import bitcoinIcon from "../images/bitcoin-icon.png";
import React, { useState, useEffect } from "react";

const StickyButton = () => {
  const [price, setPrice] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`
    )
      .then((response) => response.json())
      .then((json) => {
        if (!json.message) {
          setPrice(json.bitcoin);
        }
      });
  }, []);

  return (
    <div className="stickyButton-container">
      {price && (
        <a
          href="https://www.coindesk.com/price/bitcoin/"
          target="_blank"
          rel="noreferrer"
        >
          <img src={bitcoinIcon} alt="bitcoin-icon" />
          <div className="stickyButton-inner-div">
            ${price.usd.toLocaleString()}
          </div>
        </a>
      )}
    </div>
  );
};

export default StickyButton;
