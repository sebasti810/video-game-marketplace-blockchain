# VIDEO GAME MARKETPLACE BLOCKCHAIN

## Solution for FCC-Web3-Curriculum - Build a Video Game Marketplace Blockchain

> For this project, you need to create a blockchain for a video game marketplace where you can buy items from and sell items to the game.

Work within the build-a-video-game-marketplace folder, where you are started with some boilerplate code and files. You should not need to change any of the boilerplate code.

The .json files will store information about your blockchain, there are functions in blockchain-helpers.js for reading from and writing to them. You will need to look at those to see what arguments they need and what they do. They are already included in the files where you need them.

The items you can buy or sell are in items.json, along with their purchase prices.

Many of the files are finished for you. You only need to add code in the init-blockchain.js, generate-wallet.js, buy-item.js, sell-item.js and mine-block.js files, and run terminal commands, to fulfill the user stories below, pass all the tests, and finish the project.

User Stories:

- [x] Your blockchain should be stored in blockchain.json. See example-blockchain.json for an idea of how it should look

- [x] You can initialize your blockchain by running node init-blockchain.js

- [x] Running node init-blockchain.js should replace everything in blockchain.json with an array that has one object (the genesis block). The object should have a hash property of 0 (zero/string), and a previousHash property of null

- [x] Running node init-blockchain.js should replace everything in transactions.json with an empty array

- [x] All your wallet names and their keys should be stored in wallets.json. See example-wallets.json for an idea of how it should look

- [x] You should be able to create a wallet by running node generate-wallet.js <name>

- [x] Running node generate-wallet.js name should add name as a key in wallets.json with publicKey and privateKey properties. The values should be a public and private keypair, in 'hex' format. Use the defined ec variable to generate the keypair

- [x] When you generate a wallet, it should push an object to the end of the transactions.json array. The object should have a buyerAddress property of null, a sellerAddress property that is the public key of the new wallet, and a price property of 40 (number). This is the game giving you some coins for buying items

- [x] Running node mine-block.js should add an object at the end of the blockchain.json array with hash, previousHash, nonce, and transactions properties. The hash should be created using the defined sha256 variable by concatenating the nonce, the hash of the previous block, and a stringified version of whatever is in the transactions.json file (nonce + previousHash + JSON.stringify(transactions)). The previousHash should be the hash of the last block on the chain, the nonce should be the number used to find the hash, and the transactions should be whatever is currently in the transactions.json file in JSON format.

- [x] The hash of each mined block should start with at least two zeros (00). Hint: Increment your nonce to search for hash values until you find one

- [x] After mining a block, your transactions.json file should be an empty array

- [x] Transactions not yet added to the chain should be stored in transactions.json. See example-transactions.json for an idea of how it should look

- [x] The address for "the game" should be null on all transactions

- [x] You should be able to buy an item by running node buy-item.js <privateKey> <item>. <privateKey> is the private key of the wallet address, and <item> is the name of the item being purchased

- [x] When you buy an item, it should add an object to the end of the transactions.json array containing these properties and values: buyerAddress should be the matching public key for the <privateKey> entered, sellerAddress should be null, price should be the purchase price of the item bought, itemBought should be the name of the item bought, and signature should use the buyer's keypair to sign a concatenation of the buyerAddress, price, and itemBought, in that order, in hex format

- [x] When buying an item, an object should not be added to transactions.json if the buyer address does not have enough funds. Use the getAddressBalance helper. Note: The transaction pool is included when calculating the balance

- [x] You should be able to sell an item by running node sell-item.js <privateKey> <item>. <privateKey> is the private key of the wallet address, and <item> is the name of the item being sold

- [x] When you sell an item, it should add an object to the end of the transactions.json array containing these properties and values: buyerAddress should be null, sellerAddress should the matching public key for the <privateKey> entered, price should be 5 coins less than the purchase price of the item, itemSold should be the name of the item sold, and signature should use the seller's keypair to sign a concatenation of the sellerAddress, price, and itemSold, in that order, in hex format

- [x] When selling an item, an object should not be added to transactions.json if the seller address does not have the item they are selling. Use the getAddressItems helper. Note: The transaction pool is included when calculating the items

- [x] Only the transactions created from running the buy-item.js or sell-item.js files should include a signature

- [x] Your wallets.json file should have at least three wallets

- [x] Your blockchain should contain at least 10 blocks, at least 20 total transactions, and at least 10 transactions that include a signature

- [x] Your blockchain should be valid, that includes all the hash, previousHash, nonce, and transaction signature values. You should not add any properties that are not described above

- [x] Bonus: Create a function to validate your blockchain
