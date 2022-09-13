import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import "../src/styles/Input.scss";
import SimpleKeyValPair from "./components/SimpleKeyValPair";
import BlockResults from "./components/BlockResults";
import blockchainlogo from "./images/blockchainlogo.png";

import bitcoinIcon from "./images/bitcoin-icon.png";
import TransactionResults from "./components/TransactionResults";
import StickyButton from "./components/StickyButton";

const isUserInputBlock = (hash) => hash.substring(0, 5) === "00000";

function App() {
  const [userInput, setUserInput] = useState("");
  const [block, setBlock] = useState(null);
  const [tx, setTx] = useState(null);

  useEffect(() => {
    if (!userInput) return;

    isUserInputBlock(userInput) ? searchBlock(userInput) : searchTx(userInput);
  }, [userInput]);

  const searchTx = (txHash) => {
    fetch(`http://127.0.0.1:5000/transactions?txHash=${txHash}`)
      .then((response) => response.json())
      .then((json) => {
        if (json && !json.message) {
          setTx(json.fullTxInfo);
          setBlock(null);
        }
      });
  };

  const searchBlock = (blockHash) => {
    fetch(`http://127.0.0.1:5000/block?blockHash=${blockHash}`)
      .then((response) => response.json())
      .then((json) => {
        if (json && !json.message) {
          setTx(null);
          setBlock(json.blockData.blockData);
        }
      });
  };

  return (
    <div>
      <nav>
        <a
          href="https://www.blockchain.com/explorer?view=btc-testnet"
          target={"_blank"}
          rel="noreferrer"
        >
          <img src={blockchainlogo} alt="blockchainlogo" />
        </a>
      </nav>
      <div className="body-container">
        <div>
          <div className="input-section">
            <h1>Upišite hash od blocka ili tranzakcije sa bitcoin testneta</h1>
            <Input
              placeholder={"Enter your txid, block hash, block num..."}
              setUserInput={setUserInput}
            />
          </div>
        </div>

        {block && <BlockResults block={block} txOnClick={searchTx} />}
        {tx && (
          <TransactionResults
            tx={tx}
            blockOnClick={searchBlock}
            txOnClick={searchTx}
          />
        )}
        <StickyButton />
      </div>
    </div>
  );
}

export default App;
