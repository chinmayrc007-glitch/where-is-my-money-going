const Transaction =
    require("../models/Transaction");


// =========================
// GET ALL TRANSACTIONS
// =========================

async function getTransactions(req, res) {
    try {
        const transactions =
            await Transaction
                .find({
                    user: req.user.id
                })
                .sort({
                    date: -1,
                    createdAt: -1
                });

        res.json({
            transactions
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// =========================
// CREATE TRANSACTION
// =========================

async function createTransaction(req, res) {
    try {
        const {
            description,
            amount,
            type,
            category,
            date
        } = req.body;


        if (
            !description ||
            amount === undefined ||
            !type ||
            !category ||
            !date
        ) {
            return res.status(400).json({
                message:
                    "Please provide all transaction details"
            });
        }


        if (
            !["income", "expense"].includes(type)
        ) {
            return res.status(400).json({
                message:
                    "Transaction type must be income or expense"
            });
        }


        if (
            Number(amount) <= 0
        ) {
            return res.status(400).json({
                message:
                    "Amount must be greater than 0"
            });
        }


        const transaction =
            await Transaction.create({
                user: req.user.id,
                description:
                    description.trim(),
                amount:
                    Number(amount),
                type,
                category,
                date
            });


        res.status(201).json({
            transaction
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// =========================
// UPDATE TRANSACTION
// =========================

async function updateTransaction(req, res) {
    try {
        const {
            description,
            amount,
            type,
            category,
            date
        } = req.body;


        const transaction =
            await Transaction.findOne({
                _id: req.params.id,
                user: req.user.id
            });


        if (!transaction) {
            return res.status(404).json({
                message:
                    "Transaction not found"
            });
        }


        if (
            !["income", "expense"].includes(type)
        ) {
            return res.status(400).json({
                message:
                    "Transaction type must be income or expense"
            });
        }


        if (
            Number(amount) <= 0
        ) {
            return res.status(400).json({
                message:
                    "Amount must be greater than 0"
            });
        }


        transaction.description =
            description.trim();

        transaction.amount =
            Number(amount);

        transaction.type =
            type;

        transaction.category =
            category;

        transaction.date =
            date;


        await transaction.save();


        res.json({
            transaction
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// =========================
// DELETE TRANSACTION
// =========================

async function deleteTransaction(req, res) {
    try {
        const transaction =
            await Transaction.findOneAndDelete({
                _id: req.params.id,
                user: req.user.id
            });


        if (!transaction) {
            return res.status(404).json({
                message:
                    "Transaction not found"
            });
        }


        res.json({
            message:
                "Transaction deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// =========================
// EXPORT
// =========================

module.exports = {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
};