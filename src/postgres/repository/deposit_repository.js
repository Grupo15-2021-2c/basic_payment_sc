const connectionPool = require("../connection_pool");
const DepositMapper = require("../mapping/deposit_mapper");

const tableName = "DEPOSIT";

const create = async newDeposit => {
  const client = await connectionPool.connectionPool.connect();

  try {
    const { rows } = await client.query(
      "INSERT INTO " + tableName + " (WALLET_ID, AMOUNT, MONTH, YEAR) VALUES ($1, $2, $3, $4) RETURNING *",
      [newDeposit.wallet_id, newDeposit.amount, newDeposit.month, newDeposit.year],
    );

    return DepositMapper.mapToDeposit(rows[0]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const findAll = async () => {
  const client = await connectionPool.connectionPool.connect();

  try {
    const { rows } = await client.query("SELECT * FROM " + tableName);

    return DepositMapper.mapToDepositArray(rows);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const findById = async id => {
  const client = await connectionPool.connectionPool.connect();

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

const findByWalletId = async ({ walletId, month, year }) => {
  const client = await connectionPool.connectionPool.connect();

  console.log(walletId, month, year);
  try {
    const { rows } = await client.query(
      "SELECT * FROM " + tableName + " WHERE WALLET_ID = $1 AND MONTH = $2 AND YEAR = $3",
      [walletId, month, year],
    );

    if (rows[0]) {
      return { status: "success", data: DepositMapper.mapToDeposit(rows[0]) };
    } else {
      return { status: "error", code: 404, message: "Unable to find deposit" };
    }
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

const remove = async id => {
  const client = await connectionPool.connectionPool.connect();

  try {
    await client.query("DELETE FROM " + tableName + " WHERE ID = $1", [id]);
  } catch (exception) {
    throw exception;
  } finally {
    client.release();
  }
};

module.exports = {
  remove,
  findById,
  findByWalletId,
  findAll,
  create,
};
