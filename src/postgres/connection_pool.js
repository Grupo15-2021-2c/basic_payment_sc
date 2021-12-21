const pg = require("pg");
const config = require("./config");

const connectionPool = new pg.Pool(config.baseConfig);

module.exports = { connectionPool };
