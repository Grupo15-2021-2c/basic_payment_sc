const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
const deposits = require("../service/deposit_service");
const { findByUserId } = require("../postgres/repository/wallet_repository");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const deposit = ({ config }) => async (senderWallet, amountToSend, walletId) => {
  const date = new Date();
  const maybeDeposit = await deposits.findByWalletId({
    walletId,
    month: date.getMonth(),
    year: date.getFullYear(),
  });
  if (maybeDeposit.status === "error") {
    const basicPayments = await getContract(config, senderWallet);
    const tx = await basicPayments.deposit({
      value: ethers.utils.parseEther(amountToSend).toHexString(),
    });
    tx.wait(1).then(
      async receipt => {
        console.log("Transaction mined");
        const firstEvent = receipt && receipt.events && receipt.events[0];
        console.log(firstEvent);
        if (firstEvent && firstEvent.event == "DepositMade") {
          const someDeposit = await deposits.create({
            id: tx.hash.toString(),
            amount: parseFloat(amountToSend),
            wallet_id: walletId,
            month: date.getMonth(),
            year: date.getFullYear(),
          });
          console.log("Persisted deposit", JSON.stringify(someDeposit));
        } else {
          console.error(`Payment not created in tx ${tx.hash}`);
        }
      },
      error => {
        const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
        const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
        console.error("reasons List");
        console.error(reasonsList);

        console.error("message");
        console.error(message);
      },
    );
    return tx;
  } else {
    return { status: "error", code: 400, message: "Deposit already exists" };
  }
};

const getDepositReceipt = ({}) => async userId => {
  const date = new Date();
  const wallet = await findByUserId(userId);
  if (!wallet) {
    return { status: "error", code: 404, message: `Wallet not found for user with id ${userId}` };
  } else {
    const walletId = wallet.id;
    return await deposits.findByWalletId({ walletId, month: date.getMonth(), year: date.getFullYear() });
  }
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
});
