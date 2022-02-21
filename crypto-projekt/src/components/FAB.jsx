import React, { useState, useEffect } from "react";
import bitcoinIcon from "../images/bitcoin-icon.png";

const FAB = () => {
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
    <div className="fab-container">
      {price && (
        <a
          href="https://www.coingecko.com/en/coins/bitcoin"
          target="_blank"
          rel="noreferrer"
        >
          <img src={bitcoinIcon} alt="bitcoin-icon" />
          <div className="fab-inner-div">${price.usd.toLocaleString()}</div>
        </a>
      )}
    </div>
  );
};

export default FAB;
