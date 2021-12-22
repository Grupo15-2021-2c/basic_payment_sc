function schema() {
  return {
    params: {
      type: "object",
      properties: {
        userId: {
          type: "string",
        },
      },
    },
    required: ["userId"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const walletId = await contractInteraction.get;
    const { code, ...body } = await contractInteraction.getDepositReceipt(req.params.userId);
    const actualCode = !!code ? code : body.status && body.status === "error" ? 400 : 200;
    reply.code(actualCode).send(body);
  };
}

module.exports = { handler, schema };
