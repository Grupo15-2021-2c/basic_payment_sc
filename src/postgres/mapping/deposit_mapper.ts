import { DepositEntity } from "../entity/deposit_entity";
import { Deposit } from "../../model/deposit";

export const mapToDeposit = (depositEntity: DepositEntity): Deposit => {
  return {
    id: depositEntity.id,
    wallet_id: depositEntity.wallet_id,
    sender_address: depositEntity.sender_address,
    amount: depositEntity.amount,
    month: depositEntity.month,
    year: depositEntity.year,
  };
};

export const mapToDepositArray = (DepositsEntities: DepositEntity[]): Deposit[] => {
  const deposits = [];

  for (const DepositEntity of DepositsEntities) {
    deposits.push(mapToDeposit(DepositEntity));
  }

  return deposits;
};
