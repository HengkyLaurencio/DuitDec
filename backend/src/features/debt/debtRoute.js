const express = require('express');
const DebtController = require('./debtController');
const AuthMiddleware = require('../../middlewares/authMiddleware');

const router = express.Router();

router.get('/',DebtController.getAllDebts);
router.get('/:id', DebtController.getDebtById);
router.post('/', DebtController.createDebt);
router.put('/:id', DebtController.updateDebt);
router.delete('/:id', DebtController.deleteDebt);

module.exports = router;
