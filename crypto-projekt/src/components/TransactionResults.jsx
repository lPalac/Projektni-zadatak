import React from "react";
import "../styles/dashboard.scss";
import SimpleKeyValPair from "./SimpleKeyValPair";
import CleanKeyVal from "./CleanKeyVal";
import InfoTitle from "./InfoTitle";

const TransactionResults = ({ tx, blockOnClick, txOnClick }) => {
  console.log(tx);
  console.log("_-----------");
  const txInfo = tx.txInfo;

  return (
    <div className="transaction-container">
      <InfoTitle
        title="Summary"
        hoverText="An overview of the transactions inputs, outputs, amounts and whether or not it's been confirmed."
      />

      <div>
        {<SimpleKeyValPair objKey="Hash" value={txInfo.hash} />}
        {<SimpleKeyValPair objKey="Size" value={txInfo.size} />}
        {<SimpleKeyValPair objKey="VSize" value={txInfo.vsize} />}
        {<SimpleKeyValPair objKey="Weight" value={txInfo.weight} />}
        {
          <SimpleKeyValPair
            objKey="Amount of outputs"
            value={txInfo.vout.length}
          />
        }
        {
          <SimpleKeyValPair
            objKey="Amount of inputs"
            value={txInfo.vin.length}
          />
        }
        {<SimpleKeyValPair objKey="Fee" value={tx.txFee + "BTC"} />}

        <InfoTitle
          title="Inputs"
          hoverText="The addresses and amounts specifying the BTC spent."
        />
        {txInfo.vin.map((el, index) => {
          return (
            <div className="vin-container" key={index}>
              <div>
                <CleanKeyVal itemKey="Index" val={index} />
              </div>
              <div onClick={() => txOnClick(el.txid)} className="clickable">
                <CleanKeyVal itemKey="TxID" val={el.txid} />
              </div>
              {el.scriptSig?.asm && (
                <CleanKeyVal itemKey="Script Sig" val={el.scriptSig.asm} />
              )}
              <CleanKeyVal itemKey="Sequence" val={el.sequence} />
              <h5>TXin witness</h5>
              {el.txinwitness &&
                el.txinwitness.map((el2, index) => (
                  <CleanKeyVal itemKey={index} val={el2} />
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
                <CleanKeyVal itemKey="Index" val={el.n} />
              </div>
              <CleanKeyVal itemKey="Value" val={`${el.value} BTC`} />
              {el.scriptPubKey && (
                <>
                  <CleanKeyVal itemKey="Script Sig" val={el.scriptPubKey.asm} />
                  <h4>Addresses</h4>

                  {el.scriptPubKey?.addresses?.length &&
                    el.scriptPubKey.addresses.map((address, index) => (
                      <div
                        onClick={() => {
                          txOnClick(address);
                        }}
                        className="clickable"
                      >
                        <CleanKeyVal itemKey={index} val={address} />
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
