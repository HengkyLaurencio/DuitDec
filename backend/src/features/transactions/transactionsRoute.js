const express = require("express");
const router = express.Router();
const app = express();
const TransactionsController = require("./transactionsController");

app.use(express.json());

router.post("/income", TransactionsController.addIncome)
// router.post("/outcome", TransactionsController.addOutcome)
// router.get("/",TransactionsController.getTransactions)

module.exports = router;
