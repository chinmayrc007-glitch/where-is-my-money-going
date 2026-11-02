import { useState } from "react";

function TransactionList({
    transactions,
    onEdit,
    onDelete
}) {
    const [editingId, setEditingId] =
        useState(null);

    const [editData, setEditData] =
        useState({});


    // =========================
    // EMPTY STATE
    // =========================

    if (
        !transactions ||
        transactions.length === 0
    ) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">
                    No transactions yet.
                </p>

                <p className="text-sm text-gray-400 mt-1">
                    Add your first transaction
                    to get started.
                </p>
            </div>
        );
    }


    // =========================
    // START EDITING
    // =========================

    function startEdit(transaction) {
        setEditingId(transaction._id);

        setEditData({
            description:
                transaction.description,

            amount:
                transaction.amount,

            type:
                transaction.type,

            category:
                transaction.category,

            date:
                transaction.date
        });
    }


    // =========================
    // SAVE EDIT
    // =========================

    async function saveEdit(id) {
        if (
            !editData.description.trim() ||
            !editData.amount ||
            Number(editData.amount) <= 0
        ) {
            return;
        }

        await onEdit(
            id,
            {
                ...editData,
                amount:
                    Number(
                        editData.amount
                    )
            }
        );

        setEditingId(null);
        setEditData({});
    }


    // =========================
    // CANCEL EDIT
    // =========================

    function cancelEdit() {
        setEditingId(null);
        setEditData({});
    }


    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            {/* Header */}

            <div className="p-5 border-b border-gray-200">

                <h2 className="text-xl font-semibold text-gray-800">
                    All Transactions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    {transactions.length} transaction
                    {transactions.length !== 1
                        ? "s"
                        : ""}
                </p>

            </div>


            {/* Transactions */}

            <div className="divide-y divide-gray-200">

                {transactions.map(
                    (transaction) => {

                        const isEditing =
                            editingId ===
                            transaction._id;


                        // =========================
                        // EDIT MODE
                        // =========================

                        if (isEditing) {
                            return (
                                <div
                                    key={
                                        transaction._id
                                    }
                                    className="p-5 bg-gray-50"
                                >

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                        {/* Description */}

                                        <input
                                            type="text"
                                            value={
                                                editData.description
                                            }
                                            onChange={(event) =>
                                                setEditData({
                                                    ...editData,
                                                    description:
                                                        event
                                                            .target
                                                            .value
                                                })
                                            }
                                            placeholder="Description"
                                            className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                                        />


                                        {/* Amount */}

                                        <input
                                            type="number"
                                            value={
                                                editData.amount
                                            }
                                            onChange={(event) =>
                                                setEditData({
                                                    ...editData,
                                                    amount:
                                                        event
                                                            .target
                                                            .value
                                                })
                                            }
                                            min="0"
                                            step="0.01"
                                            placeholder="Amount"
                                            className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                                        />


                                        {/* Type */}

                                        <select
                                            value={
                                                editData.type
                                            }
                                            onChange={(event) =>
                                                setEditData({
                                                    ...editData,
                                                    type:
                                                        event
                                                            .target
                                                            .value
                                                })
                                            }
                                            className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="expense">
                                                Expense
                                            </option>

                                            <option value="income">
                                                Income
                                            </option>
                                        </select>


                                        {/* Category */}

                                        <select
                                            value={
                                                editData.category
                                            }
                                            onChange={(event) =>
                                                setEditData({
                                                    ...editData,
                                                    category:
                                                        event
                                                            .target
                                                            .value
                                                })
                                            }
                                            className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                                        >
                                            <option value="Food">
                                                Food
                                            </option>

                                            <option value="Transport">
                                                Transport
                                            </option>

                                            <option value="Shopping">
                                                Shopping
                                            </option>

                                            <option value="Bills">
                                                Bills
                                            </option>

                                            <option value="Entertainment">
                                                Entertainment
                                            </option>

                                            <option value="Education">
                                                Education
                                            </option>

                                            <option value="Health">
                                                Health
                                            </option>

                                            <option value="Salary">
                                                Salary
                                            </option>

                                            <option value="Freelance">
                                                Freelance
                                            </option>

                                            <option value="Other">
                                                Other
                                            </option>
                                        </select>


                                        {/* Date */}

                                        <input
                                            type="date"
                                            value={
                                                editData.date
                                            }
                                            onChange={(event) =>
                                                setEditData({
                                                    ...editData,
                                                    date:
                                                        event
                                                            .target
                                                            .value
                                                })
                                            }
                                            className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                                        />

                                    </div>


                                    {/* Edit buttons */}

                                    <div className="flex gap-3 mt-5">

                                        <button
                                            onClick={() =>
                                                saveEdit(
                                                    transaction._id
                                                )
                                            }
                                            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                                        >
                                            Save Changes
                                        </button>


                                        <button
                                            onClick={
                                                cancelEdit
                                            }
                                            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                                        >
                                            Cancel
                                        </button>

                                    </div>

                                </div>
                            );
                        }


                        // =========================
                        // NORMAL MODE
                        // =========================

                        return (
                            <div
                                key={
                                    transaction._id
                                }
                                className="p-5 flex items-center justify-between hover:bg-gray-50 transition"
                            >

                                <div className="flex items-center gap-4">

                                    <div
                                        className={`w-11 h-11 rounded-full flex items-center justify-center text-lg ${
                                            transaction.type ===
                                            "income"
                                                ? "bg-green-100"
                                                : "bg-red-100"
                                        }`}
                                    >
                                        {transaction.type ===
                                        "income"
                                            ? "↑"
                                            : "↓"}
                                    </div>


                                    <div>

                                        <h3 className="font-medium text-gray-800">
                                            {
                                                transaction.description
                                            }
                                        </h3>


                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">

                                            <span>
                                                {
                                                    transaction.category
                                                }
                                            </span>

                                            <span>
                                                •
                                            </span>

                                            <span>
                                                {
                                                    transaction.date
                                                }
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <div className="flex items-center gap-5">

                                    <span
                                        className={`font-semibold ${
                                            transaction.type ===
                                            "income"
                                                ? "text-green-600"
                                                : "text-red-600"
                                        }`}
                                    >
                                        {transaction.type ===
                                        "income"
                                            ? "+"
                                            : "-"}

                                        ₹
                                        {Number(
                                            transaction.amount
                                        ).toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>


                                    <button
                                        onClick={() =>
                                            startEdit(
                                                transaction
                                            )
                                        }
                                        className="text-sm text-gray-500 hover:text-black transition"
                                    >
                                        Edit
                                    </button>


                                    <button
                                        onClick={() =>
                                            onDelete(
                                                transaction._id
                                            )
                                        }
                                        className="text-sm text-gray-400 hover:text-red-600 transition"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>
                        );
                    }
                )}

            </div>

        </div>
    );
}


export default TransactionList;