// import { ApiError } from "../model/error";
const WalletRepository = require("../postgres/repository/wallet_repository");

const findAll = async () =>
  wrapWithUnknownError(() => WalletRepository.findAll(), "Unable to find all wallets due to unknown error");

const findById = async idWallet =>
  wrapWithUnknownError(
    () => WalletRepository.findById(idWallet),
    `Unable to find wallet ${idWallet} due to unknown error`,
  );

const findByUserId = async idUser =>
  wrapWithUnknownError(
    () => WalletRepository.findByUserId(idUser),
    `Unable to find wallet to user ${idUser} due to unknown error`,
  );

const create = async newWallet =>
  wrapWithUnknownError(
    () => WalletRepository.create(newWallet),
    `Unable to create wallet ${newWallet} due to unknown error`,
  );

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with wallet service due to error", err);
    return new Error({ kind: "UNKNOWN_ERROR", message });
  });

const countWallet = (process, message) =>
  wrapWithUnknownError(() => WalletRepository.count(), `Unable to count wallets due to unknown error`);

module.exports = {
  findById,
  findByUserId,
  findAll,
  create,
  countWallet,
};
