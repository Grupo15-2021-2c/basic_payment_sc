// import { ApiError } from "../model/error";
const DepositRepository = require("../postgres/repository/deposit_repository");

const findAll = async () =>
  wrapWithUnknownError(() => DepositRepository.findAll(), "Unable to find all deposits due to unknown error");

const findById = async idDeposit =>
  wrapWithUnknownError(
    () => DepositRepository.findById(idDeposit),
    `Unable to find deposit ${idDeposit} due to unknown error`,
  );

const create = async newDeposit =>
  wrapWithUnknownError(() => DepositRepository.create(newDeposit), `Unable to create deposit due to unknown error`);

const findByWalletId = async ({ walletId, month, year }) =>
  wrapWithUnknownError(
    () => DepositRepository.findByWalletId({ walletId, month, year }),
    `Unable to create deposit due to unknown error`,
  );

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with deposit service due to error", err);
    return { kind: "UNKNOWN_ERROR", message };
  });

module.exports = {
  findAll,
  findById,
  create,
  findByWalletId,
};
