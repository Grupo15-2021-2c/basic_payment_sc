function schema() {
  return {
    params: {
      type: "object",
      properties: {
        userId: {
          type: "integer",
        },
        amountInEthers: {
          type: "string",
        },
      },
    },
    required: ["userId", "amountInEthers"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    const userId = req.params.userId;
    const walletId = await walletService.getWalletIdWithUserId(userId);
    return contractInteraction.deposit(await walletService.getWallet(walletId), req.body.amountInEthers, walletId);
  };
}

module.exports = { schema, handler };
