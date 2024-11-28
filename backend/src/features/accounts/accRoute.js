const express = require("express");
const AccController = require("./accController");

const router = express.Router();

// Routes
router.get("/:userid", AccController.getAccounts);
router.post("/", AccController.createAccount);
router.put("/:accountid", AccController.updateAccount);
router.delete("/:accountid", AccController.deleteAccount);

module.exports = router;
