import React from "react";
import "../styles/dashboard.scss";
import DataKey from "./DataKey";
import InfoTitle from "./InfoTitle";
import DataPair from "./DataPair.jsx";

const TransactionResults = ({ tx, txOnClick }) => {
  const txInfo = tx.txInfo;

  return (
    <div className="transaction-container">
      <InfoTitle
        title="Summary"
        hoverText="An overview of the transactions inputs,
         outputs, amounts and whether or not it's been confirmed."
      />

      <div>
        {<DataPair objKey="Hash" value={txInfo.hash} />}
        {<DataPair objKey="Size" value={txInfo.size} />}
        {<DataPair objKey="VSize" value={txInfo.vsize} />}
        {<DataPair objKey="Weight" value={txInfo.weight} />}
        {<DataPair objKey="Amount of outputs" value={txInfo.vout.length} />}
        {<DataPair objKey="Amount of inputs" value={txInfo.vin.length} />}
        {<DataPair objKey="Fee" value={tx.txFee + "BTC"} />}

        <InfoTitle
          title="Inputs"
          hoverText="The addresses and amounts specifying the BTC spent."
        />
        {txInfo.vin.map((el, index) => {
          return (
            <div className="vin-container" key={index}>
              <div>
                <DataKey itemKey="Index" val={index} />
              </div>
              <div onClick={() => txOnClick(el.txid)} className="clickable">
                <DataKey itemKey="TxID" val={el.txid} />
              </div>
              {el.scriptSig?.asm && (
                <DataKey itemKey="Script Sig" val={el.scriptSig.asm} />
              )}
              <DataKey itemKey="Sequence" val={el.sequence} />
              <h5>TXin witness</h5>
              {el.txinwitness &&
                el.txinwitness.map((el2, index) => (
                  <DataKey itemKey={index} val={el2} />
                ))}
              <div className="divider-grey" />
            </div>
          );
        })}
        <InfoTitle
          title="Outputs"
          hoverText="The addresses and amounts specifying BTC received."
        />
        {txInfo.vout.map((el, index) => {
          return (
            <div className="vin-container" key={index}>
              <div>
                <DataKey itemKey="Index" val={el.n} />
              </div>
              <DataKey itemKey="Value" val={`${el.value} BTC`} />
              {el.scriptPubKey && (
                <>
                  <DataKey itemKey="Script Sig" val={el.scriptPubKey.asm} />
                  <h4>Addresses</h4>

                  {el.scriptPubKey?.addresses?.length &&
                    el.scriptPubKey.addresses.map((address, index) => (
                      <div
                        onClick={() => {
                          txOnClick(address);
                        }}
                        className="clickable"
                      >
                        <DataKey itemKey={index} val={address} />
                      </div>
                    ))}
                </>
              )}
              <div className="divider-grey" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionResults;
