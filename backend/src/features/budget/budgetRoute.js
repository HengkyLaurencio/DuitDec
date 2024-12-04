const express = require('express');
const BudgetController = require('./budgetController');

const router = express.Router();

router.get('/', BudgetController.getAllBudgets);
router.get('/:id', BudgetController.getBudgetById);
router.post('/', BudgetController.createBudget);
router.put('/:id', BudgetController.updateBudget);
router.delete('/:id', BudgetController.deleteBudget);

module.exports = router;
