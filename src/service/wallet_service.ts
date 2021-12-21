import { ApiError } from "../model/error";
import { Wallet } from "../model/wallet";
import * as WalletRepository from "../postgres/repository/wallet_repository";

export const findAll = async (): Promise<Wallet[] | ApiError> =>
  wrapWithUnknownError(() => WalletRepository.findAll(), "Unable to find all categories due to unknown error");

export const findById = async (idCategory: number): Promise<Wallet[] | ApiError> =>
  wrapWithUnknownError(
    () => WalletRepository.findById(idCategory),
    `Unable to find category ${idCategory} due to unknown error`,
  );

export const create = async (newCategoryDto: Wallet): Promise<Wallet | ApiError> =>
  wrapWithUnknownError(
    () => WalletRepository.create(newCategoryDto),
    `Unable to create category ${newCategoryDto} due to unknown error`,
  );

const wrapWithUnknownError = (process: () => Promise<any>, message: string) =>
  process().catch((err: any) => {
    console.error("Unable to operate with category service due to error", err);
    return new ApiError({ kind: "UNKNOWN_ERROR", message });
  });

const countWallet = (process: () => Promise<any>, message: string) =>
  wrapWithUnknownError(() => WalletRepository.count(), `Unable to count wallets due to unknown error`);
