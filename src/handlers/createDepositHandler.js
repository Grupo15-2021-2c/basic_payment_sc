function schema() {
  return {
    params: {
      type: "object",
      properties: {
        senderId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["senderId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    const walletId = req.body.senderId;
    return contractInteraction.deposit(await walletService.getWallet(walletId), req.body.amountInEthers, walletId);
  };
}

module.exports = { schema, handler };
