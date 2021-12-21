const pg = require("pg");
const config = require("./config");

const connectionPool = new pg.Pool(config.config);

module.exports = { connectionPool };
