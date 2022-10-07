import {
  getBlockchain,
  getTransactions,
  writeBlockchain,
  writeTransactions,
} from "./blockchain-helpers.js";

import CryptoJS from "crypto-js";
import sha256 from "crypto-js/sha256.js";

const blockchain = getBlockchain();

export const mine = (prev, tas) => {
  for (let nonce = 0; nonce < Number.MAX_SAFE_INTEGER; nonce++) {
    let hash = sha256(nonce.toString() + prev + JSON.stringify(tas)).toString(
      CryptoJS.enc.Hex
    );
    if (hash.startsWith("00")) {
      return { hash, nonce };
    }
  }
};

let previousHash = blockchain[blockchain.length - 1].hash;
let transactions = getTransactions();

const { hash, nonce } = mine(previousHash, transactions);

let block = {
  hash,
  previousHash,
  nonce,
  transactions,
};

blockchain.push(block);

writeBlockchain(blockchain);
writeTransactions([]);
