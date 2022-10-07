import {
  getAddressItems,
  getItemPrice,
  getTransactions,
  writeTransactions,
} from "./blockchain-helpers.js";

import EC from "elliptic";
const ec = new EC.ec("p192");

const sellerPrivateKey = process.argv[2];
const itemSold = process.argv[3];

const transactions = getTransactions();
const keyPair = ec.keyFromPrivate(sellerPrivateKey);
const publicKey = keyPair.getPublic().encode("hex");
const addressItems = getAddressItems(publicKey);
const price = getItemPrice(itemSold) - 5;

console.log(publicKey);
console.log(addressItems);

if (addressItems[itemSold] > 0) {
  let transaction = {
    buyerAddress: null,
    sellerAddress: publicKey,
    price,
    itemSold,
    signature: keyPair
      .sign(publicKey + price.toString() + itemSold)
      .toDER("hex"),
  };

  writeTransactions([...transactions, transaction]);
} else {
  console.log(publicKey + " doesn't own " + itemSold);
}
