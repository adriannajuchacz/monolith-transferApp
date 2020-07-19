const { Pool } = require("pg");
const pool = new Pool({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB_NAME,
});

async function startPool() {
  await pool
    .connect()
    .then()
    .catch((e) => {
      console.log(e);
    });
  return;
}

async function endPool() {
  await pool.end();
  return;
}

async function getBalance() {
  try {
    const res = await pool.query("select * from balances;");
    let currentBalance = res.rows[0].balance;
    return currentBalance;
  } catch (error) {
    console.log(error);
  }
}

async function setBalance(bal) {
  try {
    await pool.query(`update balances set balance = ${bal};`);
  } catch (error) {
    console.log(error);
  }
}

module.exports.getBalance = getBalance;
module.exports.setBalance = setBalance;
module.exports.startPool = startPool;
module.exports.endPool = endPool;
