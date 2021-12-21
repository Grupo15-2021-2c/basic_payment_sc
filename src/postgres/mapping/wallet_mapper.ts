import { WalletEntity } from "../entity/wallet_entity";
import { Wallet } from "../../model/wallet";

export const mapToWallet = (walletEntity: WalletEntity): Wallet => {
  return {
    id: walletEntity.id,
    user_id: walletEntity.user_id,
    private_key: walletEntity.private_key,
    address: walletEntity.address,
  };
};

export const mapToWalletArray = (walletsEntities: WalletEntity[]): Wallet[] => {
  const wallets = [];

  for (const walletEntity of walletsEntities) {
    wallets.push(mapToWallet(walletEntity));
  }

  return wallets;
};
