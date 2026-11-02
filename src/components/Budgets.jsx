import { useEffect, useState } from "react";

import {
    getBudget,
    setBudget
} from "../services/api";

import { useAuth } from "../context/AuthContext";


function Budgets({ transactions }) {

    const { user } = useAuth();

    const currentMonth =
        new Date()
            .toISOString()
            .slice(0, 7);


    const [budget, setBudgetValue] =
        useState(0);

    const [budgetInput, setBudgetInput] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =========================
    // LOAD BUDGET
    // =========================

    useEffect(() => {

        async function loadBudget() {

            try {

                const token =
                    localStorage.getItem(
                        "token"
                    );

                if (!token) {
                    return;
                }

                const data =
                    await getBudget(
                        token,
                        currentMonth
                    );

                setBudgetValue(
                    data.budget
                        ? data.budget.amount
                        : 0
                );

            } catch (err) {

                setError(
                    err.message ||
                    "Failed to load budget"
                );

            } finally {

                setLoading(false);

            }
        }

        if (user) {
            loadBudget();
        }

    }, [user, currentMonth]);


    const monthlyExpenses =
        transactions
            .filter(
                (transaction) =>
                    transaction.type ===
                        "expense" &&
                    transaction.date.startsWith(
                        currentMonth
                    )
            )
            .reduce(
                (total, transaction) =>
                    total +
                    Number(
                        transaction.amount
                    ),
                0
            );


    const remaining =
        budget - monthlyExpenses;


    const percentage =
        budget > 0
            ? Math.min(
                (monthlyExpenses /
                    budget) *
                    100,
                100
            )
            : 0;


    async function handleSetBudget() {

        if (
            budgetInput === "" ||
            Number(budgetInput) <= 0
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
                await setBudget(
                    token,
                    currentMonth,
                    Number(budgetInput)
                );

            setBudgetValue(
                data.budget.amount
            );

            setBudgetInput("");

        } catch (err) {

            setError(
                err.message ||
                "Failed to save budget"
            );

        }
    }


    if (loading) {
        return (
            <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">
                <p className="text-gray-500">
                    Loading budget...
                </p>
            </section>
        );
    }


    return (
        <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-8">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

                <div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Monthly Budget
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Keep your spending under control.
                    </p>
                </div>


                <div className="flex gap-2">

                    <input
                        type="number"
                        placeholder="Set budget"
                        value={budgetInput}
                        onChange={(e) =>
                            setBudgetInput(
                                e.target.value
                            )
                        }
                        className="border border-gray-300 rounded-lg px-4 py-2 w-40 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        onClick={
                            handleSetBudget
                        }
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                    >
                        Set Budget
                    </button>

                </div>

            </div>


            {error && (
                <div className="mb-5 bg-red-50 text-red-700 rounded-lg p-3">
                    {error}
                </div>
            )}


            {budget === 0 ? (

                <div className="bg-gray-50 rounded-xl p-6 text-center">

                    <p className="text-gray-500">
                        No monthly budget set yet.
                    </p>

                </div>

            ) : (

                <>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                        <div>
                            <p className="text-sm text-gray-500">
                                Budget
                            </p>

                            <p className="text-2xl font-bold text-gray-900 mt-1">
                                ₹
                                {budget.toLocaleString(
                                    "en-IN"
                                )}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Spent
                            </p>

                            <p className="text-2xl font-bold text-red-600 mt-1">
                                ₹
                                {monthlyExpenses.toLocaleString(
                                    "en-IN"
                                )}
                            </p>
                        </div>


                        <div>
                            <p className="text-sm text-gray-500">
                                Remaining
                            </p>

                            <p
                                className={`text-2xl font-bold mt-1 ${
                                    remaining >= 0
                                        ? "text-green-600"
                                        : "text-red-600"
                                }`}
                            >
                                ₹
                                {remaining.toLocaleString(
                                    "en-IN"
                                )}
                            </p>
                        </div>

                    </div>


                    <div>

                        <div className="flex justify-between text-sm mb-2">

                            <span className="text-gray-600">
                                Budget used
                            </span>

                            <span className="font-medium text-gray-900">
                                {Math.round(
                                    percentage
                                )}
                                %
                            </span>

                        </div>


                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

                            <div
                                className={`h-3 rounded-full transition-all ${
                                    percentage >= 100
                                        ? "bg-red-500"
                                        : percentage >= 80
                                            ? "bg-yellow-500"
                                            : "bg-green-500"
                                }`}
                                style={{
                                    width:
                                        `${percentage}%`
                                }}
                            />

                        </div>

                    </div>


                    {remaining < 0 && (
                        <div className="mt-5 bg-red-50 border border-red-200 text-red-700 rounded-lg p-4">
                            ⚠️ You have exceeded your monthly budget.
                        </div>
                    )}


                    {remaining >= 0 &&
                        percentage >= 80 && (
                            <div className="mt-5 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg p-4">
                                ⚠️ You have used more than 80% of your budget.
                            </div>
                        )}

                </>
            )}

        </section>
    );
}


export default Budgets;