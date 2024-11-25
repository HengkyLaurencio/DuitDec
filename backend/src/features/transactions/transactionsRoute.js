const express = require("express");
const router = express.Router();
const app = express();
const TransactionsController = require("./transactionsController");

app.use(express.json());

router.post("/income/:id", TransactionsController.addIncome);
router.post("/outcome/:id", TransactionsController.addOutcome);
router.get("/:id", TransactionsController.getTransactionsById);

module.exports = router;
