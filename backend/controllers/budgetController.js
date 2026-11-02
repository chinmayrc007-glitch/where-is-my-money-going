const Budget = require("../models/Budget");


// GET BUDGET

async function getBudget(req, res) {
    try {
        const month =
            req.query.month ||
            new Date()
                .toISOString()
                .slice(0, 7);

        const budget =
            await Budget.findOne({
                user: req.user.id,
                month
            });

        res.json({
            budget: budget || null
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// CREATE / UPDATE BUDGET

async function setBudget(req, res) {
    try {
        const {
            month,
            amount
        } = req.body;

        if (!month || amount === undefined) {
            return res.status(400).json({
                message:
                    "Month and amount are required"
            });
        }

        if (Number(amount) <= 0) {
            return res.status(400).json({
                message:
                    "Budget must be greater than 0"
            });
        }

        const budget =
            await Budget.findOneAndUpdate(
                {
                    user: req.user.id,
                    month
                },
                {
                    user: req.user.id,
                    month,
                    amount: Number(amount)
                },
                {
                    new: true,
                    upsert: true,
                    runValidators: true
                }
            );

        res.json({
            budget
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// DELETE BUDGET

async function deleteBudget(req, res) {
    try {
        const month = req.query.month;

        await Budget.findOneAndDelete({
            user: req.user.id,
            month
        });

        res.json({
            message: "Budget deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    getBudget,
    setBudget,
    deleteBudget
};