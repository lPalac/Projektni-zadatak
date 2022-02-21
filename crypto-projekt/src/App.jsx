import React, { useEffect, useState } from "react";
import Input from "./components/Input";
import "../src/styles/Input.scss";
import SimpleKeyValPair from "./components/SimpleKeyValPair";
import BlockResults from "./components/BlockResults";

import bitcoinIcon from "./images/bitcoin-icon.png";
import TransactionResults from "./components/TransactionResults";
import FAB from "./components/FAB";

const isUserInputBlock = (hash) => {
  return hash.substring(0, 5) === "00000";
};

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
          setBlock(json.blockInfo.blockInfo);
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
          <h1>Block explorer</h1>
        </a>
      </nav>
      <div className="body-container">
        <div>
          <div className="bitcoin-title-container">
            <div>
              <h2>
                <img src={bitcoinIcon} alt="bitcoin-icon" />
                Bitcoin testnet
              </h2>
            </div>

            <Input
              placeholder={"Enter your txid, block hash, block num..."}
              setUserInput={setUserInput}
            />
          </div>
          <p>
            This is my Bitcoin blockchain explorer to view blocks and
            transactions on Bitcoin Testnet. Feel free to search for a
            transaction or block in the search!
          </p>
        </div>
        <h2>Results</h2>
        {block && <BlockResults block={block} txOnClick={searchTx} />}
        {tx && (
          <TransactionResults
            tx={tx}
            blockOnClick={searchBlock}
            txOnClick={searchTx}
          />
        )}
        <FAB />
      </div>
    </div>
  );
}

export default App;
