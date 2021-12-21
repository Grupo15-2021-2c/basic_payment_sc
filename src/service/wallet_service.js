// import { ApiError } from "../model/error";
const WalletRepository = require("../postgres/repository/wallet_repository");

const findAll = async () =>
  wrapWithUnknownError(() => WalletRepository.findAll(), "Unable to find all categories due to unknown error");

const findById = async idCategory =>
  wrapWithUnknownError(
    () => WalletRepository.findById(idCategory),
    `Unable to find category ${idCategory} due to unknown error`,
  );

const create = async newCategoryDto =>
  wrapWithUnknownError(
    () => WalletRepository.create(newCategoryDto),
    `Unable to create category ${newCategoryDto} due to unknown error`,
  );

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with category service due to error", err);
    return new Error({ kind: "UNKNOWN_ERROR", message });
  });

const countWallet = (process, message) =>
  wrapWithUnknownError(() => WalletRepository.count(), `Unable to count wallets due to unknown error`);

module.exports = {
  findById,
  findAll,
  create,
};
