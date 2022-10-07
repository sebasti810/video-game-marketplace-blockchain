import { writeBlockchain, writeTransactions } from "./blockchain-helpers.js";

// initialize / reset blockchain with genesis block and transactions with empty array
writeBlockchain([
  // the object should have a hash property of 0 (zero/string), and a previousHash property of null
  {
    hash: "0",
    previousHash: null,
  },
]);

writeTransactions([]);
