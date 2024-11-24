const express = require("express");
const router = express.Router();
const app = express();
const TransactionsController = require("./transactionsController");

app.use(express.json());

router.post("/income", TransactionsController.income)
router.post("/outcome", TransactionsController.outcome)
router.get("/",(req,res) =>{

})

module.exports = router;
