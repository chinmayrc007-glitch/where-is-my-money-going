const RecurringTransaction =
    require("../models/RecurringTransaction");

const Transaction =
    require("../models/Transaction");


function addFrequency(
    dateString,
    frequency
) {
    const date =
        new Date(dateString);

    if (frequency === "weekly") {
        date.setDate(
            date.getDate() + 7
        );
    }

    if (frequency === "monthly") {
        date.setMonth(
            date.getMonth() + 1
        );
    }

    if (frequency === "yearly") {
        date.setFullYear(
            date.getFullYear() + 1
        );
    }

    return date
        .toISOString()
        .split("T")[0];
}


// GET RECURRING

async function getRecurring(req, res) {
    try {
        const recurring =
            await RecurringTransaction
                .find({
                    user: req.user.id
                })
                .sort({
                    createdAt: -1
                });

        res.json({
            recurringTransactions:
                recurring
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// CREATE RECURRING

async function createRecurring(req, res) {
    try {
        const {
            description,
            amount,
            type,
            category,
            startDate,
            frequency
        } = req.body;

        if (
            !description ||
            !amount ||
            !type ||
            !category ||
            !startDate ||
            !frequency
        ) {
            return res.status(400).json({
                message:
                    "Please provide all recurring transaction details"
            });
        }

        const recurring =
            await RecurringTransaction.create({
                user: req.user.id,
                description:
                    description.trim(),
                amount: Number(amount),
                type,
                category,
                startDate,
                nextDate: startDate,
                frequency,
                active: true
            });

        res.status(201).json({
            recurringTransaction:
                recurring
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// TOGGLE RECURRING

async function toggleRecurring(req, res) {
    try {
        const recurring =
            await RecurringTransaction.findOne({
                _id: req.params.id,
                user: req.user.id
            });

        if (!recurring) {
            return res.status(404).json({
                message:
                    "Recurring transaction not found"
            });
        }

        recurring.active =
            !recurring.active;

        await recurring.save();

        res.json({
            recurringTransaction:
                recurring
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// DELETE RECURRING

async function deleteRecurring(req, res) {
    try {
        const recurring =
            await RecurringTransaction
                .findOneAndDelete({
                    _id: req.params.id,
                    user: req.user.id
                });

        if (!recurring) {
            return res.status(404).json({
                message:
                    "Recurring transaction not found"
            });
        }

        res.json({
            message:
                "Recurring transaction deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


// PROCESS DUE TRANSACTIONS

async function processRecurring(req, res) {
    try {
        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        const recurringTransactions =
            await RecurringTransaction.find({
                user: req.user.id,
                active: true,
                nextDate: {
                    $lte: today
                }
            });

        const createdTransactions = [];

        for (
            const recurring
            of recurringTransactions
        ) {
            let nextDate =
                recurring.nextDate;

            while (nextDate <= today) {

                const transaction =
                    await Transaction.create({
                        user: req.user.id,
                        description:
                            recurring.description,
                        amount:
                            recurring.amount,
                        type:
                            recurring.type,
                        category:
                            recurring.category,
                        date:
                            nextDate
                    });

                createdTransactions.push(
                    transaction
                );

                nextDate =
                    addFrequency(
                        nextDate,
                        recurring.frequency
                    );
            }

            recurring.nextDate =
                nextDate;

            await recurring.save();
        }

        res.json({
            transactions:
                createdTransactions
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}


module.exports = {
    getRecurring,
    createRecurring,
    toggleRecurring,
    deleteRecurring,
    processRecurring
};