import { Wallet } from "../../model/wallet";
import { connectionPool } from "../connection_pool";
import * as WalletMapper from "../mapping/wallet_mapper";

const tableName = "WALLET";

export const create = async newWallet => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query(
      "INSERT INTO " + tableName + " (USER_ID, PRIVATE_KEY, ADDRESS) VALUES ($1, $2, $3) RETURNING *",
      [newWallet.user_id, newWallet.private_key, newWallet.address],
    );

    return WalletMapper.mapToWallet(rows[0]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

export const findAll = async () => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + tableName);

    return WalletMapper.mapToWalletArray(rows);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

export const findById = async id => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + tableName + " WHERE ID = $1", [id]);

    if (rows[0]) {
      return WalletMapper.mapToWallet(rows[0]);
    } else {
      return null;
    }
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

export const remove = async id => {
  const client = await connectionPool.connect();

  try {
    await client.query("DELETE FROM " + tableName + " WHERE ID = $1", [id]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

export const count = async () => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT COUNT(*) FROM " + tableName);

    if (rows[0]) {
      return rows[0];
    } else {
      return null;
    }
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};
