import { useState } from "react";

function MonthlyAnalytics({ transactions }) {
    const [selectedMonth, setSelectedMonth] = useState(
        new Date().toISOString().slice(0, 7)
    );

    const monthlyTransactions = transactions.filter(
        (transaction) =>
            transaction.date.startsWith(selectedMonth)
    );

    const monthlyIncome = monthlyTransactions
        .filter(
            (transaction) =>
                transaction.type === "income"
        )
        .reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    const monthlyExpenses = monthlyTransactions
        .filter(
            (transaction) =>
                transaction.type === "expense"
        )
        .reduce(
            (total, transaction) =>
                total + transaction.amount,
            0
        );

    const monthlyBalance =
        monthlyIncome - monthlyExpenses;

    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Monthly Analytics
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Analyze your finances for a specific month.
                    </p>
                </div>

                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) =>
                        setSelectedMonth(e.target.value)
                    }
                    className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-green-50 rounded-xl p-5">
                    <p className="text-sm text-green-700">
                        Monthly Income
                    </p>

                    <p className="text-2xl font-bold text-green-700 mt-2">
                        ₹{monthlyIncome.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="bg-red-50 rounded-xl p-5">
                    <p className="text-sm text-red-700">
                        Monthly Expenses
                    </p>

                    <p className="text-2xl font-bold text-red-700 mt-2">
                        ₹{monthlyExpenses.toLocaleString("en-IN")}
                    </p>
                </div>

                <div className="bg-blue-50 rounded-xl p-5">
                    <p className="text-sm text-blue-700">
                        Monthly Balance
                    </p>

                    <p className={`text-2xl font-bold mt-2 ${
                        monthlyBalance >= 0
                            ? "text-blue-700"
                            : "text-red-700"
                    }`}>
                        ₹{monthlyBalance.toLocaleString("en-IN")}
                    </p>
                </div>

            </div>

        </section>
    );
}

export default MonthlyAnalytics;