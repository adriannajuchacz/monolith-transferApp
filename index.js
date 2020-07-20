require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");

db.startPool();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running on ${PORT}`));

/* ENDPOINTS START */
app.get("/test", async (req, res) => {
  res.status(200).send(`use POST transferMoney`);
});

app.post("/transferMoney", async (req, res) => {
  try {
    let bal = await db.getBalance();
    bal = bal + 100;
    await db.setBalance(bal);
    res.status(200).send(`current balance: ${bal}`);
    return;
  } catch (e) {
    res.status(500).send(`${e}`);
  }
});
/* ENDPOINTS END */


/* CLEAN SHUTDOWN */
process.stdin.resume(); //so the program will not close instantly
async function exitHandler(options, exitCode) {
  if (options.cleanup) console.log("clean");
  if (exitCode || exitCode === 0) console.log(exitCode);
  if (options.exit) {
    await db.endPool();
    process.exit();
  }
}

//do something when app is closing
process.on("exit", exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on("SIGINT", exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
