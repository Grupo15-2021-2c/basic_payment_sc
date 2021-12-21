
export const mapToDeposit = depositEntity => {
  return {
    id: depositEntity.id,
    wallet_id: depositEntity.wallet_id,
    sender_address: depositEntity.sender_address,
    amount: depositEntity.amount,
    month: depositEntity.month,
    year: depositEntity.year,
  };
};

export const mapToDepositArray = DepositsEntities => {
  const deposits = [];

  for (const DepositEntity of DepositsEntities) {
    deposits.push(mapToDeposit(DepositEntity));
  }

  return deposits;
};
