const express = require("express");
const router = express.Router();
const app = express();
const TransactionsController = require("./transactionsController");

app.use(express.json());

router.post("/income/:id", TransactionsController.addIncome);
router.post("/outcome/:id", TransactionsController.addOutcome);
router.get("/:id", TransactionsController.getTransactionsById);
router.put("/:id/:transactionId", TransactionsController.editTransactionsById);
router.delete("/:id/:transactionId", TransactionsController.deleteTransactionsById);

module.exports = router;
