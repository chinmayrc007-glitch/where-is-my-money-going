const mongoose = require("mongoose");

const recurringTransactionSchema =
    new mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },

            description: {
                type: String,
                required: true,
                trim: true
            },

            amount: {
                type: Number,
                required: true,
                min: 0
            },

            type: {
                type: String,
                enum: ["income", "expense"],
                required: true
            },

            category: {
                type: String,
                required: true
            },

            startDate: {
                type: String,
                required: true
            },

            nextDate: {
                type: String,
                required: true
            },

            frequency: {
                type: String,
                enum: [
                    "weekly",
                    "monthly",
                    "yearly"
                ],
                required: true
            },

            active: {
                type: Boolean,
                default: true
            }
        },
        {
            timestamps: true
        }
    );

module.exports = mongoose.model(
    "RecurringTransaction",
    recurringTransactionSchema
);