import { connectionPool } from "../connection_pool";
import * as DepositMapper from "../mapping/deposit_mapper";

const tableName = "DEPOSIT";

export const create = async newDeposit => {
  const client = await connectionPool.connect();

  try {
    const { rows } = await client.query(
      "INSERT INTO " +
        tableName +
        " (WALLET_ID, SENDER_ADDRESS, AMOUNT, MONTH, YEAR) VALUES ($1, $2, $3, $4) RETURNING *",
      [newDeposit.wallet_id, newDeposit.sender_address, newDeposit.amount, newDeposit.month, newDeposit.year],
    );

    return DepositMapper.mapToDeposit(rows[0]);
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

    return DepositMapper.mapToDepositArray(rows);
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
      return DepositMapper.mapToDeposit(rows[0]);
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
