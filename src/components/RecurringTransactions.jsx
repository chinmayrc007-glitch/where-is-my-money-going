import { useEffect, useState } from "react";

import {
    getRecurringTransactions,
    createRecurringTransaction,
    processRecurringTransactions,
    toggleRecurringTransaction,
    deleteRecurringTransaction
} from "../services/api";

import { useAuth } from "../context/AuthContext";


function RecurringTransactions({
    setTransactions
}) {

    const { user } = useAuth();


    const [
        recurringTransactions,
        setRecurringTransactions
    ] = useState([]);


    const [description, setDescription] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [date, setDate] =
        useState(
            new Date()
                .toISOString()
                .split("T")[0]
        );

    const [type, setType] =
        useState("expense");

    const [category, setCategory] =
        useState("Food");

    const [frequency, setFrequency] =
        useState("monthly");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================
    // LOAD
    // =========================

    useEffect(() => {

        async function loadRecurring() {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const data =
                    await getRecurringTransactions(
                        token
                    );

                setRecurringTransactions(
                    data.recurringTransactions ||
                    []
                );

            } catch (err) {

                setError(
                    err.message ||
                    "Failed to load recurring transactions"
                );

            } finally {

                setLoading(false);

            }
        }


        async function processDue() {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                const data =
                    await processRecurringTransactions(
                        token
                    );

                if (
                    data.transactions &&
                    data.transactions.length > 0
                ) {
                    setTransactions(
                        (previous) => [
                            ...data.transactions,
                            ...previous
                        ]
                    );
                }

            } catch (err) {

                console.error(
                    "Recurring processing failed:",
                    err
                );

            }
        }


        if (user) {
            loadRecurring();
            processDue();
        }

    }, [user, setTransactions]);


    // =========================
    // ADD
    // =========================

    async function addRecurringTransaction() {

        if (
            !description.trim() ||
            !amount ||
            Number(amount) <= 0 ||
            !date
        ) {
            return;
        }

        try {

            setError("");

            const token =
                localStorage.getItem(
                    "token"
                );

            const data =
                await createRecurringTransaction(
                    token,
                    {
                        description:
                            description.trim(),

                        amount:
                            Number(amount),

                        type,

                        category,

                        startDate:
                            date,

                        frequency
                    }
                );

            setRecurringTransactions(
                (previous) => [
                    data.recurringTransaction,
                    ...previous
                ]
            );

            setDescription("");
            setAmount("");
            setDate(
                new Date()
                    .toISOString()
                    .split("T")[0]
            );
            setType("expense");
            setCategory("Food");
            setFrequency("monthly");

        } catch (err) {

            setError(
                err.message ||
                "Failed to create recurring transaction"
            );

        }
    }


    // =========================
    // TOGGLE
    // =========================

    async function toggleRecurring(id) {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            const data =
                await toggleRecurringTransaction(
                    token,
                    id
                );

            setRecurringTransactions(
                (previous) =>
                    previous.map(
                        (item) =>
                            item._id === id
                                ? data.recurringTransaction
                                : item
                    )
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to update recurring transaction"
            );

        }
    }


    // =========================
    // DELETE
    // =========================

    async function deleteRecurring(id) {

        try {

            const token =
                localStorage.getItem(
                    "token"
                );

            await deleteRecurringTransaction(
                token,
                id
            );

            setRecurringTransactions(
                (previous) =>
                    previous.filter(
                        (item) =>
                            item._id !== id
                    )
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to delete recurring transaction"
            );

        }
    }


    if (loading) {
        return (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
                <p className="text-gray-500">
                    Loading recurring transactions...
                </p>
            </section>
        );
    }


    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">

            <div className="mb-6">

                <h2 className="text-xl font-semibold text-gray-900">
                    Recurring Transactions
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                    Automatically track regular income and expenses.
                </p>

            </div>


            {error && (
                <div className="mb-5 bg-red-50 text-red-700 rounded-lg p-3">
                    {error}
                </div>
            )}


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />


                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) =>
                        setAmount(
                            e.target.value
                        )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />


                <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                        setDate(
                            e.target.value
                        )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                />


                <select
                    value={type}
                    onChange={(e) =>
                        setType(
                            e.target.value
                        )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-3"
                >
                    <option value="expense">
                        Expense
                    </option>

                    <option value="income">
                        Income
                    </option>
                </select>


                <select
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-3"
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


                <select
                    value={frequency}
                    onChange={(e) =>
                        setFrequency(
                            e.target.value
                        )
                    }
                    className="border border-gray-300 rounded-lg px-4 py-3"
                >
                    <option value="weekly">
                        Weekly
                    </option>

                    <option value="monthly">
                        Monthly
                    </option>

                    <option value="yearly">
                        Yearly
                    </option>
                </select>

            </div>


            <button
                onClick={
                    addRecurringTransaction
                }
                className="mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium hover:bg-blue-700 transition"
            >
                Add Recurring Transaction
            </button>


            <div className="mt-6 space-y-3">

                {recurringTransactions.length === 0 ? (

                    <p className="text-gray-500 text-sm">
                        No recurring transactions yet.
                    </p>

                ) : (

                    recurringTransactions.map(
                        (item) => (

                            <div
                                key={item._id}
                                className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                            >

                                <div>

                                    <h3 className="font-medium text-gray-900">
                                        {
                                            item.description
                                        }
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        ₹
                                        {Number(
                                            item.amount
                                        ).toLocaleString(
                                            "en-IN"
                                        )}

                                        {" • "}

                                        {item.frequency}

                                        {" • "}

                                        Next:
                                        {" "}
                                        {item.nextDate}
                                    </p>

                                </div>


                                <div className="flex gap-3">

                                    <button
                                        onClick={() =>
                                            toggleRecurring(
                                                item._id
                                            )
                                        }
                                        className="text-blue-600 font-medium text-sm"
                                    >
                                        {item.active
                                            ? "Pause"
                                            : "Resume"}
                                    </button>


                                    <button
                                        onClick={() =>
                                            deleteRecurring(
                                                item._id
                                            )
                                        }
                                        className="text-red-600 font-medium text-sm"
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )
                )}

            </div>

        </section>
    );
}


export default RecurringTransactions;