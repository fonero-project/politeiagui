import React from "react";

const FnodataTxLink = ({ isTestnet, txId, isTxId }) => {
  const network = isTestnet ? "testnet" : "explorer";
  return !isTxId ? (
    <span>{txId}</span>
  ) : (
    <a
      href={`https://${network}.fonero.org/tx/${txId}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {txId}
    </a>
  );
};

export default FnodataTxLink;
