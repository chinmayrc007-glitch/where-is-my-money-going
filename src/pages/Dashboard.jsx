import { useEffect, useMemo, useState } from "react";

import { useAuth } from "../context/AuthContext";

import {
    getTransactions
} from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

import {
    Line
} from "react-chartjs-2";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler
);


function Dashboard() {

    const { user } = useAuth();

    const [
        transactions,
        setTransactions
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        error,
        setError
    ] = useState("");


    /* ========================================================= */
    /* LOAD TRANSACTIONS */
    /* ========================================================= */

    useEffect(() => {

        let mounted = true;

        async function loadTransactions() {

            try {

                setLoading(true);
                setError("");

                const token =
                    localStorage.getItem("token");

                if (!token) {
                    throw new Error(
                        "Authentication token not found."
                    );
                }

                const data =
                    await getTransactions(token);

                if (mounted) {
                    setTransactions(
                        data.transactions || []
                    );
                }

            } catch (err) {

                console.error(
                    "Dashboard transaction error:",
                    err
                );

                if (mounted) {
                    setError(
                        err.message ||
                        "Unable to load your financial data."
                    );
                }

            } finally {

                if (mounted) {
                    setLoading(false);
                }

            }
        }

        loadTransactions();

        return () => {
            mounted = false;
        };

    }, []);


    /* ========================================================= */
    /* FINANCIAL STATS */
    /* ========================================================= */

    const stats = useMemo(() => {

        let income = 0;
        let expenses = 0;

        transactions.forEach(
            (transaction) => {

                const amount =
                    Number(transaction.amount) || 0;

                if (
                    transaction.type === "income"
                ) {
                    income += amount;
                }

                if (
                    transaction.type === "expense"
                ) {
                    expenses += amount;
                }

            }
        );

        const balance =
            income - expenses;

        const savingsRate =
            income > 0
                ? (balance / income) * 100
                : 0;

        return {
            income,
            expenses,
            balance,
            savingsRate
        };

    }, [transactions]);


    /* ========================================================= */
    /* MONTHLY DATA */
    /* ========================================================= */

    const monthlyData = useMemo(() => {

        const months = {};

        transactions.forEach(
            (transaction) => {

                if (!transaction.date) return;

                const month =
                    transaction.date.slice(0, 7);

                if (!months[month]) {

                    months[month] = {
                        income: 0,
                        expenses: 0
                    };

                }

                const amount =
                    Number(transaction.amount) || 0;

                if (
                    transaction.type === "income"
                ) {

                    months[month].income += amount;

                } else {

                    months[month].expenses += amount;

                }

            }
        );

        const labels =
            Object.keys(months)
                .sort()
                .slice(-6);

        return {
            labels,

            income:
                labels.map(
                    (month) =>
                        months[month].income
                ),

            expenses:
                labels.map(
                    (month) =>
                        months[month].expenses
                )
        };

    }, [transactions]);


    /* ========================================================= */
    /* CATEGORY DATA */
    /* ========================================================= */

    const categoryData = useMemo(() => {

        const categories = {};

        transactions
            .filter(
                (transaction) =>
                    transaction.type === "expense"
            )
            .forEach(
                (transaction) => {

                    const category =
                        transaction.category ||
                        "Other";

                    categories[category] =
                        (
                            categories[category] ||
                            0
                        ) +
                        (
                            Number(
                                transaction.amount
                            ) || 0
                        );

                }
            );

        return Object.entries(categories)
            .sort(
                (a, b) =>
                    b[1] - a[1]
            )
            .slice(0, 5);

    }, [transactions]);


    /* ========================================================= */
    /* FINANCIAL HEALTH */
    /* ========================================================= */

    const healthScore = Math.max(
        0,
        Math.min(
            100,
            Math.round(
                stats.savingsRate
            )
        )
    );


    const healthLabel =
        stats.savingsRate >= 30
            ? "Excellent"
            : stats.savingsRate >= 20
                ? "Good"
                : stats.savingsRate >= 10
                    ? "Fair"
                    : "Needs attention";


    const healthMessage =
        stats.savingsRate >= 30
            ? "You're maintaining a strong savings rate."
            : stats.savingsRate >= 20
                ? "You're building a healthy financial cushion."
                : stats.savingsRate >= 10
                    ? "There is room to improve your savings."
                    : "Your spending is taking a large share of your income.";


    /* ========================================================= */
    /* CHART */
    /* ========================================================= */

    const chartData = {

        labels:
            monthlyData.labels.map(
                (month) => {

                    const [
                        year,
                        monthNumber
                    ] = month.split("-");

                    return new Date(
                        Number(year),
                        Number(monthNumber) - 1
                    ).toLocaleDateString(
                        "en-IN",
                        {
                            month: "short"
                        }
                    );

                }
            ),

        datasets: [

            {
                label: "Income",

                data:
                    monthlyData.income,

                borderWidth: 2.5,

                tension: 0.42,

                fill: true,

                backgroundColor:
                    "rgba(99, 102, 241, 0.08)",

                borderColor:
                    "#6366f1",

                pointRadius: 0,

                pointHoverRadius: 5,

                pointBackgroundColor:
                    "#6366f1"
            },

            {
                label: "Expenses",

                data:
                    monthlyData.expenses,

                borderWidth: 2.5,

                tension: 0.42,

                fill: true,

                backgroundColor:
                    "rgba(244, 63, 94, 0.05)",

                borderColor:
                    "#f43f5e",

                pointRadius: 0,

                pointHoverRadius: 5,

                pointBackgroundColor:
                    "#f43f5e"
            }

        ]

    };


    const chartOptions = {

        responsive: true,

        maintainAspectRatio: false,

        interaction: {
            intersect: false,
            mode: "index"
        },

        plugins: {

            legend: {
                display: true,

                position: "top",

                align: "end",

                labels: {
                    usePointStyle: true,
                    pointStyle: "circle",
                    boxWidth: 7,
                    boxHeight: 7,
                    padding: 18,
                    color: "#64748b",
                    font: {
                        size: 10,
                        weight: "600"
                    }
                }
            },

            tooltip: {

                backgroundColor:
                    "#0f172a",

                titleColor:
                    "#ffffff",

                bodyColor:
                    "#cbd5e1",

                borderColor:
                    "rgba(255,255,255,0.08)",

                borderWidth: 1,

                padding: 12,

                displayColors: true,

                callbacks: {

                    label: (context) =>
                        ` ${context.dataset.label}: ₹${Number(
                            context.raw
                        ).toLocaleString("en-IN")}`

                }

            }

        },

        scales: {

            y: {

                beginAtZero: true,

                border: {
                    display: false
                },

                ticks: {

                    color: "#94a3b8",

                    padding: 8,

                    font: {
                        size: 9
                    },

                    callback: (value) =>
                        `₹${Number(value).toLocaleString(
                            "en-IN"
                        )}`

                },

                grid: {
                    color:
                        "rgba(148, 163, 184, 0.10)"
                }

            },

            x: {

                border: {
                    display: false
                },

                ticks: {
                    color: "#94a3b8",
                    font: {
                        size: 9
                    }
                },

                grid: {
                    display: false
                }

            }

        }

    };


    /* ========================================================= */
    /* LOADING */
    /* ========================================================= */

    if (!user || loading) {

        return (

            <div className="p-5 sm:p-7 lg:p-8 max-w-[1500px] mx-auto">

                <div className="animate-pulse space-y-6">

                    <div>

                        <div className="h-7 w-56 bg-slate-200 rounded-lg" />

                        <div className="h-3 w-80 max-w-full bg-slate-200 rounded-lg mt-3" />

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        {[1, 2, 3, 4].map(
                            (item) => (

                                <div
                                    key={item}
                                    className="h-36 bg-white border border-slate-200 rounded-2xl"
                                />

                            )
                        )}

                    </div>


                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

                        <div className="xl:col-span-2 h-[390px] bg-white border border-slate-200 rounded-2xl" />

                        <div className="h-[390px] bg-white border border-slate-200 rounded-2xl" />

                    </div>

                </div>

            </div>

        );

    }


    /* ========================================================= */
    /* MAIN */
    /* ========================================================= */

    return (

        <div className="p-5 sm:p-7 lg:p-8 max-w-[1500px] mx-auto">


            {/* ===================================================== */}
            {/* HEADER */}
            {/* ===================================================== */}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7">

                <div>

                    <div className="flex items-center gap-2 mb-2">

                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />

                        <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-indigo-600">
                            Financial overview
                        </span>

                    </div>


                    <h1 className="text-2xl sm:text-3xl lg:text-[34px] font-black tracking-[-0.045em] text-slate-950">

                        Good to see you,{" "}

                        <span className="text-indigo-600">
                            {user?.name?.split(" ")[0] ||
                                "there"}
                        </span>

                        .

                    </h1>


                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Here's what's happening with your money.
                    </p>

                </div>


                <div className="flex items-center gap-2">

                    <div className="flex items-center gap-2 px-3.5 h-9 rounded-xl bg-white border border-slate-200 shadow-sm">

                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                        <span className="text-[10px] font-bold text-slate-500">
                            {new Date().toLocaleDateString(
                                "en-IN",
                                {
                                    month: "long",
                                    year: "numeric"
                                }
                            )}
                        </span>

                    </div>

                </div>

            </div>


            {/* ===================================================== */}
            {/* ERROR */}
            {/* ===================================================== */}

            {error && (

                <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 flex items-center gap-3">

                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                        !
                    </div>

                    <div>

                        <p className="text-xs font-bold text-red-700">
                            Couldn't load your financial data
                        </p>

                        <p className="text-[10px] text-red-500 mt-0.5">
                            {error}
                        </p>

                    </div>

                </div>

            )}


            {/* ===================================================== */}
            {/* HERO BALANCE CARD */}
            {/* ===================================================== */}

            <div className="relative overflow-hidden rounded-[24px] bg-[#0b1020] border border-slate-800 mb-5 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">


                {/* glow */}

                <div className="absolute -right-24 -top-32 w-[420px] h-[420px] rounded-full bg-indigo-600/20 blur-[100px]" />

                <div className="absolute left-[35%] bottom-[-180px] w-[400px] h-[300px] rounded-full bg-blue-500/10 blur-[100px]" />


                {/* grid */}

                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: `
                            linear-gradient(
                                rgba(255,255,255,0.15) 1px,
                                transparent 1px
                            ),
                            linear-gradient(
                                90deg,
                                rgba(255,255,255,0.15) 1px,
                                transparent 1px
                            )
                        `,
                        backgroundSize: "50px 50px"
                    }}
                />


                <div className="relative p-6 sm:p-7 lg:p-8">

                    <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-center">


                        {/* BALANCE */}

                        <div>

                            <div className="flex items-center gap-2">

                                <span className="text-[9px] uppercase tracking-[0.18em] font-bold text-slate-500">
                                    Total balance
                                </span>

                                <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 border border-emerald-400/10 text-[8px] font-bold text-emerald-400">
                                    Live
                                </span>

                            </div>


                            <div className="mt-3 text-4xl sm:text-5xl font-black tracking-[-0.055em] text-white">

                                ₹{stats.balance.toLocaleString(
                                    "en-IN"
                                )}

                            </div>


                            <p className="mt-3 text-[11px] text-slate-500">
                                Income minus expenses across your tracked transactions.
                            </p>


                            <div className="flex flex-wrap gap-2 mt-6">

                                <MiniMetric
                                    label="Income"
                                    value={stats.income}
                                    icon="↗"
                                />

                                <MiniMetric
                                    label="Expenses"
                                    value={stats.expenses}
                                    icon="↘"
                                />

                            </div>

                        </div>


                        {/* SAVINGS */}

                        <div className="lg:border-l lg:border-white/[0.07] lg:pl-8">

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-slate-500">
                                        Savings rate
                                    </p>

                                    <p className="text-2xl font-black text-white mt-2">
                                        {stats.savingsRate.toFixed(1)}%
                                    </p>

                                </div>


                                <div className="relative w-20 h-20">

                                    <svg
                                        className="w-full h-full -rotate-90"
                                        viewBox="0 0 100 100"
                                    >

                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="rgba(255,255,255,0.07)"
                                            strokeWidth="8"
                                        />

                                        <circle
                                            cx="50"
                                            cy="50"
                                            r="40"
                                            fill="none"
                                            stroke="#818cf8"
                                            strokeWidth="8"
                                            strokeLinecap="round"
                                            strokeDasharray="251"
                                            strokeDashoffset={
                                                251 -
                                                (
                                                    251 *
                                                    Math.min(
                                                        100,
                                                        Math.max(
                                                            0,
                                                            stats.savingsRate
                                                        )
                                                    )
                                                ) /
                                                100
                                            }
                                        />

                                    </svg>

                                    <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">
                                        {healthScore}
                                    </div>

                                </div>

                            </div>


                            <div className="mt-5">

                                <div className="flex justify-between mb-2">

                                    <span className="text-[9px] text-slate-500">
                                        Financial health
                                    </span>

                                    <span className="text-[9px] font-bold text-indigo-300">
                                        {healthLabel}
                                    </span>

                                </div>


                                <p className="text-[10px] leading-5 text-slate-500">
                                    {healthMessage}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ===================================================== */}
            {/* QUICK STATS */}
            {/* ===================================================== */}

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

                <StatCard
                    label="Current balance"
                    value={stats.balance}
                    icon="₹"
                    tone="indigo"
                    description={
                        stats.balance >= 0
                            ? "You're in positive territory"
                            : "Expenses exceed income"
                    }
                />

                <StatCard
                    label="Total income"
                    value={stats.income}
                    icon="↗"
                    tone="emerald"
                    description="Money coming in"
                />

                <StatCard
                    label="Total expenses"
                    value={stats.expenses}
                    icon="↘"
                    tone="rose"
                    description="Money going out"
                />

                <StatCard
                    label="Savings rate"
                    value={`${stats.savingsRate.toFixed(1)}%`}
                    icon="%"
                    tone="violet"
                    raw
                    description="Income retained"
                />

            </div>


            {/* ===================================================== */}
            {/* MAIN ANALYTICS */}
            {/* ===================================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">


                {/* TREND */}

                <div className="xl:col-span-2 bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6 shadow-[0_5px_20px_rgba(15,23,42,0.025)]">

                    <div className="flex items-start justify-between mb-5">

                        <div>

                            <div className="flex items-center gap-2">

                                <h2 className="text-sm font-extrabold text-slate-900">
                                    Income vs expenses
                                </h2>

                                <span className="px-2 py-1 rounded-full bg-slate-100 text-[8px] font-bold text-slate-500">
                                    6 months
                                </span>

                            </div>

                            <p className="text-[10px] text-slate-400 mt-1">
                                Track how your cash flow has changed over time.
                            </p>

                        </div>


                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
                            ◒
                        </div>

                    </div>


                    <div className="h-[300px]">

                        {monthlyData.labels.length > 0 ? (

                            <Line
                                data={chartData}
                                options={chartOptions}
                            />

                        ) : (

                            <EmptyChart />

                        )}

                    </div>

                </div>


                {/* HEALTH */}

                <div className="relative overflow-hidden bg-[#111827] rounded-[22px] p-6 text-white">

                    <div className="absolute -right-20 -top-20 w-52 h-52 rounded-full bg-indigo-500/15 blur-[60px]" />


                    <div className="relative">

                        <div className="flex items-center justify-between">

                            <div>

                                <h2 className="text-sm font-extrabold">
                                    Financial health
                                </h2>

                                <p className="text-[10px] text-slate-500 mt-1">
                                    Based on your savings rate.
                                </p>

                            </div>

                            <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.06] flex items-center justify-center text-indigo-300">
                                ✦
                            </div>

                        </div>


                        <div className="flex flex-col items-center py-7">

                            <div className="relative w-36 h-36">

                                <svg
                                    className="w-full h-full -rotate-90"
                                    viewBox="0 0 120 120"
                                >

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="48"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.07)"
                                        strokeWidth="10"
                                    />

                                    <circle
                                        cx="60"
                                        cy="60"
                                        r="48"
                                        fill="none"
                                        stroke="#818cf8"
                                        strokeWidth="10"
                                        strokeLinecap="round"
                                        strokeDasharray="301.6"
                                        strokeDashoffset={
                                            301.6 -
                                            (
                                                301.6 *
                                                healthScore
                                            ) /
                                            100
                                        }
                                    />

                                </svg>


                                <div className="absolute inset-0 flex flex-col items-center justify-center">

                                    <span className="text-3xl font-black">
                                        {healthScore}
                                    </span>

                                    <span className="text-[9px] text-slate-500 uppercase tracking-wider">
                                        score
                                    </span>

                                </div>

                            </div>


                            <div className="mt-4 text-sm font-extrabold">
                                {healthLabel}
                            </div>


                            <p className="text-center text-[10px] leading-5 text-slate-500 mt-2 max-w-[230px]">
                                {healthMessage}
                            </p>

                        </div>


                        <div className="border-t border-white/[0.07] pt-4">

                            <div className="flex justify-between">

                                <span className="text-[9px] text-slate-500">
                                    Savings
                                </span>

                                <span className="text-[9px] font-bold text-indigo-300">
                                    {stats.savingsRate.toFixed(1)}%
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* ===================================================== */}
            {/* BOTTOM */}
            {/* ===================================================== */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">


                {/* RECENT TRANSACTIONS */}

                <div className="bg-white border border-slate-200/80 rounded-[22px] overflow-hidden shadow-[0_5px_20px_rgba(15,23,42,0.025)]">

                    <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex items-center justify-between">

                        <div>

                            <h2 className="text-sm font-extrabold text-slate-900">
                                Recent transactions
                            </h2>

                            <p className="text-[10px] text-slate-400 mt-1">
                                Your latest financial activity.
                            </p>

                        </div>


                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                            ↔
                        </div>

                    </div>


                    {transactions.length === 0 ? (

                        <div className="p-12 text-center">

                            <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                ↔
                            </div>

                            <p className="text-xs font-bold text-slate-700 mt-4">
                                No transactions yet
                            </p>

                            <p className="text-[10px] text-slate-400 mt-1">
                                Add your first transaction to start tracking.
                            </p>

                        </div>

                    ) : (

                        <div>

                            {transactions
                                .slice(0, 6)
                                .map(
                                    (
                                        transaction,
                                        index
                                    ) => (

                                        <div
                                            key={
                                                transaction._id ||
                                                index
                                            }
                                            className="px-5 sm:px-6 py-4 flex items-center justify-between border-b border-slate-100 last:border-0 hover:bg-slate-50/70 transition"
                                        >

                                            <div className="flex items-center gap-3 min-w-0">

                                                <div
                                                    className={`
                                                        w-10
                                                        h-10
                                                        shrink-0
                                                        rounded-xl
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-sm
                                                        font-bold
                                                        ${
                                                            transaction.type ===
                                                            "income"
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : "bg-rose-50 text-rose-500"
                                                        }
                                                    `}
                                                >

                                                    {transaction.type ===
                                                    "income"
                                                        ? "↗"
                                                        : "↘"}

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="text-xs font-bold text-slate-800 truncate">
                                                        {
                                                            transaction.description
                                                        }
                                                    </p>

                                                    <div className="flex items-center gap-1.5 mt-1">

                                                        <span className="text-[9px] text-slate-400">
                                                            {
                                                                transaction.category
                                                            }
                                                        </span>

                                                        <span className="text-slate-300">
                                                            •
                                                        </span>

                                                        <span className="text-[9px] text-slate-400">
                                                            {
                                                                transaction.date
                                                            }
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>


                                            <p
                                                className={`
                                                    ml-4
                                                    shrink-0
                                                    text-xs
                                                    font-extrabold
                                                    ${
                                                        transaction.type ===
                                                        "income"
                                                            ? "text-emerald-600"
                                                            : "text-rose-500"
                                                    }
                                                `}
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

                                            </p>

                                        </div>

                                    )
                                )}

                        </div>

                    )}

                </div>


                {/* CATEGORIES */}

                <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6 shadow-[0_5px_20px_rgba(15,23,42,0.025)]">

                    <div className="flex items-start justify-between mb-6">

                        <div>

                            <h2 className="text-sm font-extrabold text-slate-900">
                                Spending by category
                            </h2>

                            <p className="text-[10px] text-slate-400 mt-1">
                                Where your money is going.
                            </p>

                        </div>


                        <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
                            ◔
                        </div>

                    </div>


                    {categoryData.length === 0 ? (

                        <div className="h-56 flex flex-col items-center justify-center text-center">

                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                                ◔
                            </div>

                            <p className="text-xs font-bold text-slate-700 mt-4">
                                No expense data yet
                            </p>

                            <p className="text-[10px] text-slate-400 mt-1">
                                Your spending breakdown will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="space-y-5">

                            {categoryData.map(
                                (
                                    [
                                        category,
                                        amount
                                    ],
                                    index
                                ) => {

                                    const percentage =
                                        stats.expenses > 0
                                            ? (
                                                amount /
                                                stats.expenses
                                            ) *
                                            100
                                            : 0;

                                    return (

                                        <div
                                            key={category}
                                        >

                                            <div className="flex items-center justify-between mb-2">

                                                <div className="flex items-center gap-2 min-w-0">

                                                    <span
                                                        className={`
                                                            w-2
                                                            h-2
                                                            shrink-0
                                                            rounded-full
                                                            ${
                                                                [
                                                                    "bg-indigo-500",
                                                                    "bg-blue-500",
                                                                    "bg-violet-500",
                                                                    "bg-cyan-500",
                                                                    "bg-slate-400"
                                                                ][
                                                                    index
                                                                ]
                                                            }
                                                        `}
                                                    />

                                                    <p className="text-xs font-bold text-slate-700 truncate">
                                                        {category}
                                                    </p>

                                                </div>


                                                <div className="flex items-center gap-3 ml-3">

                                                    <span className="text-[9px] text-slate-400">
                                                        {percentage.toFixed(
                                                            0
                                                        )}%
                                                    </span>

                                                    <p className="text-xs font-bold text-slate-700">
                                                        ₹
                                                        {amount.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </p>

                                                </div>

                                            </div>


                                            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                                                <div
                                                    className={`
                                                        h-full
                                                        rounded-full
                                                        transition-all
                                                        ${
                                                            [
                                                                "bg-indigo-500",
                                                                "bg-blue-500",
                                                                "bg-violet-500",
                                                                "bg-cyan-500",
                                                                "bg-slate-400"
                                                            ][
                                                                index
                                                            ]
                                                        }
                                                    `}
                                                    style={{
                                                        width:
                                                            `${Math.min(
                                                                100,
                                                                percentage
                                                            )}%`
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    );

                                }
                            )}

                        </div>

                    )}

                </div>

            </div>

        </div>

    );
}


/* ========================================================= */
/* STAT CARD */
/* ========================================================= */

function StatCard({
    label,
    value,
    icon,
    tone,
    raw = false,
    description
}) {

    const styles = {

        indigo: {
            icon:
                "bg-indigo-50 text-indigo-600",
            value:
                "text-slate-950"
        },

        emerald: {
            icon:
                "bg-emerald-50 text-emerald-600",
            value:
                "text-emerald-600"
        },

        rose: {
            icon:
                "bg-rose-50 text-rose-500",
            value:
                "text-rose-500"
        },

        violet: {
            icon:
                "bg-violet-50 text-violet-600",
            value:
                "text-violet-600"
        }

    };


    return (

        <div className="group bg-white border border-slate-200/80 rounded-[20px] p-5 shadow-[0_5px_20px_rgba(15,23,42,0.025)] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(15,23,42,0.06)] transition-all">

            <div className="flex items-center justify-between">

                <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400">
                    {label}
                </p>


                <div
                    className={`
                        w-9
                        h-9
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        text-sm
                        font-black
                        ${styles[tone].icon}
                    `}
                >
                    {icon}
                </div>

            </div>


            <p
                className={`
                    text-2xl
                    font-black
                    tracking-[-0.04em]
                    mt-5
                    ${styles[tone].value}
                `}
            >

                {!raw && "₹"}

                {typeof value === "number"
                    ? value.toLocaleString(
                        "en-IN"
                    )
                    : value}

            </p>


            <p className="text-[9px] text-slate-400 mt-2">
                {description}
            </p>

        </div>

    );

}


/* ========================================================= */
/* MINI METRIC */
/* ========================================================= */

function MiniMetric({
    label,
    value,
    icon
}) {

    return (

        <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] border border-white/[0.07] px-3 py-2.5">

            <div className="w-7 h-7 rounded-lg bg-white/[0.05] flex items-center justify-center text-[11px] text-indigo-300">
                {icon}
            </div>

            <div>

                <p className="text-[8px] uppercase tracking-wider text-slate-600 font-bold">
                    {label}
                </p>

                <p className="text-[10px] font-bold text-slate-300 mt-0.5">
                    ₹{value.toLocaleString("en-IN")}
                </p>

            </div>

        </div>

    );

}


/* ========================================================= */
/* EMPTY CHART */
/* ========================================================= */

function EmptyChart() {

    return (

        <div className="h-full flex flex-col items-center justify-center text-center">

            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                ◒
            </div>

            <p className="text-xs font-bold text-slate-700 mt-4">
                Not enough data yet
            </p>

            <p className="text-[10px] text-slate-400 mt-1">
                Add transactions to see your trends.
            </p>

        </div>

    );

}


export default Dashboard;