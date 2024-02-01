# DujeToken Smart Contract

This repository contains the smart contract code for the DujeToken, an Ethereum token. Below are the instructions to set up the development environment and test the smart contract using Truffle and Ganache.

## Prerequisites

Make sure you have Node.js and npm installed on your machine. You can download them from [here](https://nodejs.org/).

## Installation

1. Install Truffle globally:

    ```bash
    npm install -g truffle
    ```

2. Download and install Ganache from [here](https://www.trufflesuite.com/ganache).

3. Install web3
    ```bash
    npm i web3
    ```

## Setup

1. Open Ganache and set up a new workspace.

2. In the workspace, configure your server to match the network settings in `truffle-config.js`. Ensure the port and network ID match the configurations in the Truffle development network.

## Compile Smart Contract

Run the following command to compile the smart contract:

```bash
truffle compile
```

## Migrate Smart Contract

Deploy the smart contract to the local blockchain using Ganache. Run the following command:

```bash
truffle migrate --network development
```

## Test Smart Contract

Ensure your Ganache workspace is running, and then run the following command to execute the test cases:

```bash
truffle test
```
This will run the test suite and provide you with the results.

## Interaction using web3

In app.js put the first adress from Ganaches users tab into "contractAdress".

Also from DujeToken.json copy the ABI and put it into "contractABI".

Open the index.html in your browser.