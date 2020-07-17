const express = require("express");
const app = express();
const db = require("./db");

/* ENDPOINTS START */
app.get("/test", async (req, res) => {
  res.status(200).send(`use POST transferMoney`);
});
app.post("/transferMoney", async (req, res) => {
  let currentBalance = await db.getBalance();
  currentBalance = currentBalance + 100;
  await db.setBalance(currentBalance);
  let newBalance = await db.getBalance();
  if (newBalance !== currentBalance) {
    throw "sth went wrong";
  }
  res.status(200).send(`current balance: ${newBalance}`);
});
/* ENDPOINTS END */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));

process.stdin.resume(); //so the program will not close instantly
async function exitHandler(options, exitCode) {
  if (options.cleanup) console.log("clean");
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) {
    await db.endClient();
    process.exit();
  }
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
