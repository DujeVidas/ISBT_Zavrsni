// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DujeToken {
    string public tokenName;
    string public tokenSymbol;
    uint8 public tokenDecimals;
    uint256 public totalTokenSupply;

    mapping(address => uint256) public accountBalance;

    address public tokenOwner;

    event TokenTransferred(address indexed from, address indexed to, uint256 amount);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    modifier onlyTokenOwner() {
        require(msg.sender == tokenOwner, "Only the owner can call this function");
        _;
    }

    constructor(
        string memory _name,
        string memory _symbol,
        uint8 _decimals,
        uint256 _initialSupply
    ) {
        tokenName = _name;
        tokenSymbol = _symbol;
        tokenDecimals = _decimals;
        totalTokenSupply = _initialSupply * 10**uint256(_decimals);
        accountBalance[msg.sender] = totalTokenSupply;
        tokenOwner = msg.sender;
    }

    function transferTokens(address _to, uint256 _amount) external returns (bool) {
        require(_to != address(0), "Invalid address");
        require(_amount <= accountBalance[msg.sender], "Insufficient balance");

        accountBalance[msg.sender] -= _amount;
        accountBalance[_to] += _amount;

        emit TokenTransferred(msg.sender, _to, _amount);
        return true;
    }

    function checkAccountBalance(address _address) external view returns (uint256) {
        return accountBalance[_address];
    }

    function mintTokens(uint256 _amount) external onlyTokenOwner {
        totalTokenSupply += _amount;
        accountBalance[tokenOwner] += _amount;

        emit TokensMinted(tokenOwner, _amount);
    }

    function burnTokens(uint256 _amount) external onlyTokenOwner {
        require(_amount <= accountBalance[tokenOwner], "Insufficient balance for burning");

        totalTokenSupply -= _amount;
        accountBalance[tokenOwner] -= _amount;

        emit TokensBurned(tokenOwner, _amount);
    }
}
