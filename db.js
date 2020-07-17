const { Pool } = require("pg");
const client = new Pool({
  host: process.env.RDS_HOSTNAME,
  user: "postgres",
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  name: process.env.RDS_DB_NAME,
});

async function getBalance() {
  await client
    .connect()
    .then()
    .catch((e) => {
      console.log(e);
    });
  const res = await client.query("select * from balances;");
  console.log("fetched: ", res.rows[0].balance);
  let currentBalance = res.rows[0].balance;
  return currentBalance;
}

async function setBalance(bal) {
  await client
    .connect()
    .then()
    .catch((e) => {
      console.log(e);
      return false;
    });
  await client
    .query(`update balances set balance = ${bal};`)
    .then()
    .catch((e) => {
      console.log(e);
      return false;
    });
  return true;
}

async function endClient() {
  await client
    .connect()
    .then()
    .catch((e) => {
      console.log(e);
    });
  client.end();
  return;
}

module.exports.getBalance = getBalance;
module.exports.setBalance = setBalance;
module.exports.endClient = endClient;
