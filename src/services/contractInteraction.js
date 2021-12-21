const ethers = require("ethers");
const getDepositHandler = require("../handlers/getDepositHandler");
const deposits = require("../service/deposit_service");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};

const someMonth = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const d = new Date();
let aMonth = someMonth[d.getMonth()];

const deposit = ({ config }) => async (senderWallet, amountToSend) => {
  const basicPayments = await getContract(config, senderWallet);
  const tx = await basicPayments.deposit({
    value: await ethers.utils.parseEther(amountToSend).toHexString(),
  });
  tx.wait(1).then(
    async receipt => {
      console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      console.log(firstEvent);
      if (firstEvent && firstEvent.event == "DepositMade") {
        const someDeposit = await deposits.create({
          id: tx.hash.toString(),
          sender_address: firstEvent.args.sender.address,
          amount: firstEvent.args.amount.toString(),
          wallet_id: senderWallet.id,
          month: parseInt(aMonth),
          year: d.getFullYear(),
        });
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
};

const getDepositReceipt = ({}) => async depositTxHash => {
  return deposits.findById(depositTxHash);
};

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
});
