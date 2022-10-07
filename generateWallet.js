import {
  getTransactions,
  writeTransactions,
  getWallets,
  writeWallets,
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

// use the third argument of the console input as name for the wallet
const newWalletName = process.argv[2];

let wallets = getWallets();
const transactions = getTransactions();
let keypair = ec.genKeyPair();

// create a new wallet with a random keypair in hex format
let publicKey = keypair.getPublic().encode("hex");
let privateKey = keypair.getPrivate().toString("hex");

// add name as a key in wallets.json, with public and private key as properties
wallets[newWalletName] = {
  publicKey,
  privateKey,
};

// push an object to the end of the transactions.json array with buyerAddress property of null, sellerAddress property = public key of the new wallet, and a price property of 40 (number)
transactions.push({
  buyerAddress: null,
  sellerAddress: publicKey,
  price: 40, // This is the game giving you some coins for buying items
});

writeWallets(wallets);
writeTransactions(transactions);
