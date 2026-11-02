import { useEffect, useMemo, useState } from "react";

import {
    getBudget,
    setBudget,
    getTransactions
} from "../services/api";


function BudgetsPage() {

    const [month, setMonth] =
        useState(
            new Date()
                .toISOString()
                .slice(0, 7)
        );

    const [budget, setBudgetValue] =
        useState(null);

    const [transactions, setTransactions] =
        useState([]);

    const [amount, setAmount] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [error, setError] =
        useState("");


    useEffect(() => {
        loadData();
    }, [month]);


    async function loadData() {

        const token =
            localStorage.getItem("token");

        if (!token) return;

        try {

            setLoading(true);
            setError("");

            const [
                budgetData,
                transactionData
            ] = await Promise.all([
                getBudget(token, month),
                getTransactions(token)
            ]);

            setBudgetValue(
                budgetData.budget || null
            );

            setTransactions(
                transactionData.transactions ||
                []
            );

            setAmount(
                budgetData.budget?.amount
                    ? String(
                        budgetData.budget.amount
                    )
                    : ""
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


    const monthlyExpenses =
        useMemo(() => {

            return transactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                            "expense" &&
                        transaction.date?.slice(
                            0,
                            7
                        ) === month
                )
                .reduce(
                    (
                        total,
                        transaction
                    ) =>
                        total +
                        Number(
                            transaction.amount
                        ),
                    0
                );

        }, [
            transactions,
            month
        ]);


    const budgetAmount =
        Number(
            budget?.amount || amount || 0
        );


    const remaining =
        budgetAmount -
        monthlyExpenses;


    const percentage =
        budgetAmount > 0
            ? Math.min(
                (monthlyExpenses /
                    budgetAmount) *
                    100,
                100
            )
            : 0;


    async function handleSave(e) {

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        if (
            !token ||
            !amount ||
            Number(amount) <= 0
        ) {

            setError(
                "Enter a valid budget amount."
            );

            return;
        }


        try {

            setSaving(true);
            setError("");

            const data =
                await setBudget(
                    token,
                    month,
                    Number(amount)
                );

            setBudgetValue(
                data.budget
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to save budget"
            );

        } finally {

            setSaving(false);

        }
    }


    const monthLabel =
        new Date(
            `${month}-01`
        ).toLocaleDateString(
            "en-IN",
            {
                month: "long",
                year: "numeric"
            }
        );


    if (loading) {

        return (

            <div className="p-5 sm:p-7 lg:p-8 max-w-[1500px] mx-auto">

                <div className="animate-pulse space-y-6">

                    <div className="h-9 w-64 bg-slate-200 rounded-lg" />

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        {[1, 2, 3].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="h-32 bg-white border border-slate-200 rounded-2xl"
                                />
                            )
                        )}

                    </div>

                    <div className="h-72 bg-white border border-slate-200 rounded-2xl" />

                </div>

            </div>

        );

    }


    return (

        <div className="p-5 sm:p-7 lg:p-8 max-w-[1200px] mx-auto">


            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7">

                <div>

                    <div className="flex items-center gap-2 mb-2">

                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />

                        <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-indigo-600">
                            Spending control
                        </span>

                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-[-0.045em] text-slate-950">
                        Budgets
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Set a monthly spending limit and keep your expenses under control.
                    </p>

                </div>


                <input
                    type="month"
                    value={month}
                    onChange={(e) =>
                        setMonth(
                            e.target.value
                        )
                    }
                    className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 outline-none focus:border-indigo-300"
                />

            </div>


            {error && (

                <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600">
                    {error}
                </div>

            )}


            {/* SUMMARY */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

                <BudgetCard
                    label="Monthly budget"
                    value={budgetAmount}
                    tone="indigo"
                />

                <BudgetCard
                    label="Spent"
                    value={monthlyExpenses}
                    tone="rose"
                />

                <BudgetCard
                    label={
                        remaining >= 0
                            ? "Remaining"
                            : "Over budget"
                    }
                    value={Math.abs(
                        remaining
                    )}
                    tone={
                        remaining >= 0
                            ? "emerald"
                            : "rose"
                    }
                />

            </div>


            {/* BUDGET PANEL */}

            <div className="bg-white border border-slate-200/80 rounded-[24px] p-5 sm:p-7 mb-5">

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-7">

                    <div>

                        <p className="text-[9px] uppercase tracking-[0.18em] font-extrabold text-indigo-600">
                            {monthLabel}
                        </p>

                        <h2 className="text-lg sm:text-xl font-black text-slate-950 mt-1">
                            Monthly spending limit
                        </h2>

                        <p className="text-[10px] text-slate-400 mt-1">
                            Your current spending progress for this month.
                        </p>

                    </div>


                    <div className="text-left sm:text-right">

                        <p className="text-3xl font-black tracking-[-0.05em] text-slate-950">
                            {percentage.toFixed(
                                0
                            )}
                            %
                        </p>

                        <p className="text-[9px] text-slate-400">
                            budget used
                        </p>

                    </div>

                </div>


                {/* PROGRESS */}

                <div className="mb-8">

                    <div className="h-4 rounded-full bg-slate-100 overflow-hidden">

                        <div
                            className={`
                                h-full
                                rounded-full
                                transition-all
                                duration-700
                                ${
                                    percentage >=
                                    100
                                        ? "bg-rose-500"
                                        : percentage >=
                                            80
                                            ? "bg-amber-500"
                                            : "bg-indigo-600"
                                }
                            `}
                            style={{
                                width:
                                    `${percentage}%`
                            }}
                        />

                    </div>


                    <div className="flex justify-between mt-2">

                        <span className="text-[9px] text-slate-400">
                            ₹0
                        </span>

                        <span className="text-[9px] text-slate-400">
                            ₹
                            {budgetAmount.toLocaleString(
                                "en-IN"
                            )}
                        </span>

                    </div>

                </div>


                {/* SET BUDGET */}

                <form
                    onSubmit={handleSave}
                    className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100"
                >

                    <div className="flex-1">

                        <label className="block text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                            Set budget
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                                ₹
                            </span>

                            <input
                                type="number"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(
                                        e.target.value
                                    )
                                }
                                placeholder="Enter monthly budget"
                                min="1"
                                className="w-full h-11 pl-9 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold outline-none focus:border-indigo-300 focus:bg-white"
                            />

                        </div>

                    </div>


                    <div className="sm:pt-5">

                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full sm:w-auto h-11 px-6 rounded-xl bg-slate-950 text-white text-xs font-extrabold hover:bg-slate-800 transition disabled:opacity-50"
                        >
                            {saving
                                ? "Saving..."
                                : "Save budget"}
                        </button>

                    </div>

                </form>

            </div>


            {/* STATUS */}

            <div
                className={`
                    rounded-[22px]
                    p-5 sm:p-6
                    ${
                        remaining >= 0
                            ? "bg-emerald-50 border border-emerald-100"
                            : "bg-rose-50 border border-rose-100"
                    }
                `}
            >

                <div className="flex gap-4">

                    <div
                        className={`
                            w-10
                            h-10
                            shrink-0
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            font-black
                            ${
                                remaining >= 0
                                    ? "bg-emerald-100 text-emerald-600"
                                    : "bg-rose-100 text-rose-600"
                            }
                        `}
                    >
                        {remaining >= 0
                            ? "✓"
                            : "!"}
                    </div>


                    <div>

                        <h3
                            className={`
                                text-sm
                                font-extrabold
                                ${
                                    remaining >=
                                    0
                                        ? "text-emerald-800"
                                        : "text-rose-800"
                                }
                            `}
                        >
                            {remaining >= 0
                                ? "You're within budget"
                                : "You've exceeded your budget"}
                        </h3>


                        <p
                            className={`
                                text-[10px]
                                leading-5
                                mt-1
                                ${
                                    remaining >=
                                    0
                                        ? "text-emerald-600"
                                        : "text-rose-600"
                                }
                            `}
                        >
                            {remaining >= 0
                                ? `You have ₹${remaining.toLocaleString(
                                    "en-IN"
                                )} left to spend for ${monthLabel}.`
                                : `You are ₹${Math.abs(
                                    remaining
                                ).toLocaleString(
                                    "en-IN"
                                )} over your budget for ${monthLabel}.`}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}


function BudgetCard({
    label,
    value,
    tone
}) {

    const styles = {

        indigo:
            "bg-indigo-50 text-indigo-600",

        rose:
            "bg-rose-50 text-rose-500",

        emerald:
            "bg-emerald-50 text-emerald-600"

    };


    return (

        <div className="bg-white border border-slate-200/80 rounded-[20px] p-5">

            <div className="flex items-center justify-between">

                <p className="text-[9px] uppercase tracking-[0.14em] font-extrabold text-slate-400">
                    {label}
                </p>

                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${styles[tone]}`}>
                    ₹
                </div>

            </div>


            <p className="text-2xl font-black text-slate-950 mt-5 tracking-[-0.04em]">
                ₹
                {value.toLocaleString(
                    "en-IN"
                )}
            </p>

        </div>

    );

}


export default BudgetsPage;