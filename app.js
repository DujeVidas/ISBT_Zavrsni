document.addEventListener("DOMContentLoaded", async () => {
  // Povezivanje s lokalnom Ganache mrežom
  const web3 = new Web3("http://localhost:7545"); 

  // Adresa pametnog ugovora i ABI
  const contractAddress = "0x84550e3a2b2c32DDBE23C9046A778f34c9be8F7a";
  const contractABI =[{
    "inputs": [
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_symbol",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "_decimals",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "_initialSupply",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokenTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokensBurned",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "TokensMinted",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "accountBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "tokenDecimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "tokenName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "tokenOwner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "tokenSymbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "totalTokenSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transferTokens",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_address",
        "type": "address"
      }
    ],
    "name": "checkAccountBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "mintTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "burnTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }]
  const dujeTokenContract = new web3.eth.Contract(contractABI, contractAddress);

  // Funkcija za dohvaćanje salda
  window.getBalance = async () => {
    const address = document.getElementById("address").value;
    const balance = await dujeTokenContract.methods
      .checkAccountBalance(address)
      .call();
    document.getElementById(
      "balanceResult"
    ).textContent = `Balance of ${address}: ${balance}`;
  };

  // Funkcija za prijenos tokena
  window.transferTokens = async () => {
    try {
      const senderAddress = document.getElementById('senderAddress').value;
      const recipientAddress = document.getElementById('recipientAddress').value;
      const transferAmount = document.getElementById('transferAmount').value;
  
      // Provjera da li su svi unosi popunjeni
      if (!senderAddress || !recipientAddress || !transferAmount) {
        alert('Please fill in all fields');
        return;
      }
  
      await dujeTokenContract.methods.transferTokens(recipientAddress, transferAmount).send({ from: senderAddress });
      document.getElementById('transferResult').textContent = `Tokens transferred successfully`;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Funkcija za mintanje (stvaranje novih tokena)
  window.mintTokens = async () => {
    try {
      const mintOwnerAddress =
        document.getElementById("mintOwnerAddress").value;
      const mintAmount = document.getElementById("mintAmount").value;
      await dujeTokenContract.methods
        .mintTokens(mintAmount)
        .send({ from: mintOwnerAddress });
      document.getElementById(
        "mintResult"
      ).textContent = `New tokens minted successfully`;
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Funkcija za spaljivanje tokena
  window.burnTokens = async () => {
    try {
      const burnOwnerAddress =
        document.getElementById("burnOwnerAddress").value;
      const burnAmount = document.getElementById("burnAmount").value;
      await dujeTokenContract.methods
        .burnTokens(burnAmount)
        .send({ from: burnOwnerAddress });
      document.getElementById(
        "burnResult"
      ).textContent = `Tokens burned successfully`;
    } catch (error) {
      console.error("Error:", error);
    }
  };
});
