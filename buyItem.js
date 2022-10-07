import {
  getAddressBalance,
  getTransactions,
  getItemPrice,
  writeTransactions,
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const buyerPrivateKey = process.argv[2];
const itemBought = process.argv[3];

const itemPrice = getItemPrice(itemBought);
const keyPair = ec.keyFromPrivate(buyerPrivateKey);
const publicKey = keyPair.getPublic().encode("hex");
const addressBalance = getAddressBalance(publicKey);

if (addressBalance >= itemPrice) {
  const transactions = getTransactions();
  const hexMessage = (publicKey + itemPrice.toString() + itemBought).toString(
    "hex"
  );
  const signature = keyPair.sign(hexMessage).toDER("hex");

  let transaction = {
    buyerAddress: publicKey,
    sellerAddress: null,
    price: itemPrice,
    itemBought: itemBought,
    signature,
  };

  transactions.push(transaction);
  writeTransactions(transactions);
} else {
  console.log("Balance isnt high enough");
}
