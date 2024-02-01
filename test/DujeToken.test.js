const DujeToken = artifacts.require("DujeToken");

contract("DujeToken", (accounts) => {
  let dujeToken;

  const owner = accounts[0];
  const recipient = accounts[1];

  let initialTotalSupply;
  let initialOwnerBalance;

  beforeEach(async () => {
    dujeToken = await DujeToken.new("DujeToken", "DT", 18, 1000000);

    initialTotalSupply = await dujeToken.totalTokenSupply();
    initialOwnerBalance = await dujeToken.accountBalance(owner);
  });

  it("should create tokens with correct initial values", async () => {
    const name = await dujeToken.tokenName();
    const symbol = await dujeToken.tokenSymbol();
    const decimals = await dujeToken.tokenDecimals();
    const totalSupply = await dujeToken.totalTokenSupply();
    const ownerBalance = await dujeToken.accountBalance(owner);

    assert.equal(name, "DujeToken", "Incorrect token name");
    assert.equal(symbol, "DT", "Incorrect token symbol");
    assert.equal(decimals, 18, "Incorrect decimals");
    assert.equal(totalSupply, 1000000 * 10 ** 18, "Incorrect total supply");
    assert.equal(ownerBalance, 1000000 * 10 ** 18, "Incorrect owner balance");
  });

  it("should transfer tokens correctly", async () => {
    const initialOwnerBalance = await dujeToken.accountBalance(owner);
    const transferAmount = web3.utils.toBN(100);

    await dujeToken.transferTokens(recipient, transferAmount);

    const ownerBalanceAfterTransfer = await dujeToken.accountBalance(owner);
    const recipientBalance = await dujeToken.accountBalance(recipient);

    assert.equal(
      ownerBalanceAfterTransfer.toString(),
      initialOwnerBalance.sub(transferAmount).toString(),
      "Incorrect owner balance after transfer"
    );
    assert.equal(
      recipientBalance.toString(),
      transferAmount.toString(),
      "Incorrect recipient balance after transfer"
    );
  });

  it("should correctly update balances before and after transfer", async () => {
    const ownerBalanceBefore = await dujeToken.accountBalance(owner);
    const recipientBalanceBefore = await dujeToken.accountBalance(recipient);

    const transferAmount = web3.utils.toBN(100);
    await dujeToken.transferTokens(recipient, transferAmount);

    const ownerBalanceAfter = await dujeToken.accountBalance(owner);
    const recipientBalanceAfter = await dujeToken.accountBalance(recipient);

    assert.equal(
      ownerBalanceAfter.toString(),
      ownerBalanceBefore.sub(transferAmount).toString(),
      "Incorrect owner balance after transfer"
    );
    assert.equal(
      recipientBalanceAfter.toString(),
      recipientBalanceBefore.add(transferAmount).toString(),
      "Incorrect recipient balance after transfer"
    );
  });

  it("should mint new tokens correctly", async () => {
    const mintAmount = web3.utils.toBN(500);

    await dujeToken.mintTokens(mintAmount);

    const totalSupply = await dujeToken.totalTokenSupply();
    const ownerBalance = await dujeToken.accountBalance(owner);

    assert.equal(
      totalSupply.toString(),
      initialTotalSupply.add(mintAmount).toString(),
      "Incorrect total supply after mint"
    );
    assert.equal(
      ownerBalance.toString(),
      initialOwnerBalance.add(mintAmount).toString(),
      "Incorrect owner balance after mint"
    );
  });

  it("should burn tokens correctly", async () => {
    const burnAmount = web3.utils.toBN(200);

    await dujeToken.burnTokens(burnAmount);

    const totalSupply = await dujeToken.totalTokenSupply();
    const ownerBalance = await dujeToken.accountBalance(owner);

    assert.equal(
      totalSupply.toString(),
      initialTotalSupply.sub(burnAmount).toString(),
      "Incorrect total supply after burn"
    );
    assert.equal(
      ownerBalance.toString(),
      initialOwnerBalance.sub(burnAmount).toString(),
      "Incorrect owner balance after burn"
    );
  });
});
