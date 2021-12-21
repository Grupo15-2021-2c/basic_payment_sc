import { ApiError } from "../model/error";
import * as DepositRepository from "../postgres/repository/deposit_repository";

export const findAll = async () =>
  wrapWithUnknownError(() => DepositRepository.findAll(), "Unable to find all deposits due to unknown error");

export const findById = async idDeposit =>
  wrapWithUnknownError(
    () => DepositRepository.findById(idDeposit),
    `Unable to find deposit ${idDeposit} due to unknown error`,
  );

export const create = async newDeposit =>
  wrapWithUnknownError(() => DepositRepository.create(newDeposit), `Unable to create deposit due to unknown error`);

const wrapWithUnknownError = (process, message) =>
  process().catch(err => {
    console.error("Unable to operate with deposit service due to error", err);
    return new ApiError({ kind: "UNKNOWN_ERROR", message });
  });
