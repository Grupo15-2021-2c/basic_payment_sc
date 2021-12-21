import { ApiError } from "../model/error";
import { Deposit } from "../model/deposit";
import * as DepositRepository from "../postgres/repository/deposit_repository";

export const findAll = async (): Promise<Deposit[] | ApiError> =>
  wrapWithUnknownError(() => DepositRepository.findAll(), "Unable to find all deposits due to unknown error");

export const findById = async (idDeposit: number): Promise<Deposit[] | ApiError> =>
  wrapWithUnknownError(
    () => DepositRepository.findById(idDeposit),
    `Unable to find deposit ${idDeposit} due to unknown error`,
  );

export const create = async (newDeposit: Deposit): Promise<Deposit | ApiError> =>
  wrapWithUnknownError(() => DepositRepository.create(newDeposit), `Unable to create deposit due to unknown error`);

const wrapWithUnknownError = (process: () => Promise<any>, message: string) =>
  process().catch((err: any) => {
    console.error("Unable to operate with deposit service due to error", err);
    return new ApiError({ kind: "UNKNOWN_ERROR", message });
  });
