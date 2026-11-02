const express = require("express");

const {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} = require("../controllers/transactionController");

const protect =
    require("../middleware/authMiddleware");

const router = express.Router();


// Get all transactions
router.get(
    "/",
    protect,
    getTransactions
);


// Create transaction
router.post(
    "/",
    protect,
    createTransaction
);


// Update transaction
router.put(
    "/:id",
    protect,
    updateTransaction
);


// Delete transaction
router.delete(
    "/:id",
    protect,
    deleteTransaction
);


module.exports = router;