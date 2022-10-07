import { getBlockchain } from "./blockchain-helpers.js";

import EC from "elliptic";
import { mine } from "./mine-block.js";
const ec = new EC.ec("p192");

const blockchain = getBlockchain();

const validateTransactions = (transactions) => {
  for (let transaction of transactions) {
    if (transaction.hasOwnProperty("signature")) {
      const keyPair = ec.keyFromPublic(
        transaction.buyerAddress || transaction.sellerAddress,
        "hex"
      );
      const message = transaction.hasOwnProperty("itemBought")
        ? (
            transaction.buyerAddress +
            transaction.price +
            transaction.itemBought
          ).toString("hex")
        : (
            transaction.sellerAddress +
            transaction.price +
            transaction.itemSold
          ).toString("hex");
      const validTransaction = keyPair.verify(message, transaction.signature);
      if (!validTransaction) {
        throw Error("Blockchain isnt valid!");
      }
    }
  }
};

const validateBlock = (block) => {
  const { previousHash, transactions } = block;
  validateTransactions(transactions);
  const { hash, nonce } = mine(previousHash, transactions);
  if (hash !== block.hash || nonce !== block.nonce) {
    throw Error("Blockchain isnt valid!");
  }
};

for (let i = 0; i < blockchain.length; i++) {
  const block = blockchain[i];
  if (i === 0) {
    const isValid = block.hash === "0" && block.previousHash === null;
    if (!isValid)
      throw Error("Blockchain isnt valid, Genesisblock is invalid!");
  } else {
    const previousHashIsValid = block.previousHash === blockchain[i - 1].hash;
    if (!previousHashIsValid) throw Error("Blockchain isnt valid!");
    validateBlock(block);
  }
}

console.log("BLOCKCHAIN IS VALID!");
