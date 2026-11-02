import { useEffect, useMemo, useState } from "react";
import {
    Bar,
    Doughnut,
    Line
} from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

import { getTransactions } from "../services/api";


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
);


const MONTH_NAMES = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];


function AnalyticsPage() {

    const [transactions, setTransactions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [selectedMonth, setSelectedMonth] =
        useState(
            new Date()
                .toISOString()
                .slice(0, 7)
        );


    useEffect(() => {
        loadTransactions();
    }, []);


    async function loadTransactions() {

        const token =
            localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        try {

            setLoading(true);
            setError("");

            const data =
                await getTransactions(token);

            setTransactions(
                data.transactions || []
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to load analytics"
            );

        } finally {

            setLoading(false);

        }
    }


    const monthlyTransactions =
        useMemo(() => {

            return transactions.filter(
                (transaction) =>
                    transaction.date?.slice(
                        0,
                        7
                    ) === selectedMonth
            );

        }, [
            transactions,
            selectedMonth
        ]);


    const summary =
        useMemo(() => {

            let income = 0;
            let expenses = 0;

            monthlyTransactions.forEach(
                (transaction) => {

                    const amount =
                        Number(
                            transaction.amount
                        ) || 0;

                    if (
                        transaction.type ===
                        "income"
                    ) {
                        income += amount;
                    } else {
                        expenses += amount;
                    }

                }
            );

            const savings =
                income - expenses;

            const savingsRate =
                income > 0
                    ? (savings / income) *
                      100
                    : 0;

            return {
                income,
                expenses,
                savings,
                savingsRate
            };

        }, [monthlyTransactions]);


    const categoryData =
        useMemo(() => {

            const totals = {};

            monthlyTransactions
                .filter(
                    (transaction) =>
                        transaction.type ===
                        "expense"
                )
                .forEach(
                    (transaction) => {

                        const category =
                            transaction.category ||
                            "Other";

                        totals[category] =
                            (
                                totals[category] ||
                                0
                            ) +
                            Number(
                                transaction.amount
                            );

                    }
                );

            return Object.entries(
                totals
            ).sort(
                (a, b) =>
                    b[1] - a[1]
            );

        }, [monthlyTransactions]);


    const sixMonthData =
        useMemo(() => {

            const now =
                new Date(
                    `${selectedMonth}-01`
                );

            const labels = [];
            const income = [];
            const expenses = [];

            for (
                let i = 5;
                i >= 0;
                i--
            ) {

                const date =
                    new Date(now);

                date.setMonth(
                    date.getMonth() - i
                );

                const year =
                    date.getFullYear();

                const month =
                    date.getMonth();

                const key =
                    `${year}-${String(
                        month + 1
                    ).padStart(2, "0")}`;

                labels.push(
                    `${MONTH_NAMES[month]} ${String(
                        year
                    ).slice(-2)}`
                );

                let monthIncome = 0;
                let monthExpenses = 0;

                transactions
                    .filter(
                        (transaction) =>
                            transaction.date?.slice(
                                0,
                                7
                            ) === key
                    )
                    .forEach(
                        (transaction) => {

                            const amount =
                                Number(
                                    transaction.amount
                                ) || 0;

                            if (
                                transaction.type ===
                                "income"
                            ) {
                                monthIncome +=
                                    amount;
                            } else {
                                monthExpenses +=
                                    amount;
                            }

                        }
                    );

                income.push(
                    monthIncome
                );

                expenses.push(
                    monthExpenses
                );

            }

            return {
                labels,
                income,
                expenses
            };

        }, [
            transactions,
            selectedMonth
        ]);


    const categoryChart = {

        labels:
            categoryData.map(
                ([category]) =>
                    category
            ),

        datasets: [
            {
                data:
                    categoryData.map(
                        ([, amount]) =>
                            amount
                    ),

                borderWidth: 0,

                backgroundColor: [
                    "#4f46e5",
                    "#0ea5e9",
                    "#10b981",
                    "#f59e0b",
                    "#f43f5e",
                    "#8b5cf6",
                    "#14b8a6",
                    "#64748b",
                    "#ec4899",
                    "#84cc16"
                ]
            }
        ]

    };


    const lineChart = {

        labels:
            sixMonthData.labels,

        datasets: [

            {
                label: "Income",

                data:
                    sixMonthData.income,

                borderColor:
                    "#4f46e5",

                backgroundColor:
                    "rgba(79,70,229,0.08)",

                borderWidth: 3,

                pointRadius: 3,

                pointHoverRadius: 5,

                tension: 0.4,

                fill: true
            },

            {
                label: "Expenses",

                data:
                    sixMonthData.expenses,

                borderColor:
                    "#f43f5e",

                backgroundColor:
                    "rgba(244,63,94,0.05)",

                borderWidth: 3,

                pointRadius: 3,

                pointHoverRadius: 5,

                tension: 0.4,

                fill: true
            }

        ]

    };


    const barChart = {

        labels:
            categoryData
                .slice(0, 6)
                .map(
                    ([category]) =>
                        category
                ),

        datasets: [
            {
                label:
                    "Expenses",

                data:
                    categoryData
                        .slice(0, 6)
                        .map(
                            ([, amount]) =>
                                amount
                        ),

                backgroundColor:
                    "#4f46e5",

                borderRadius: 8,

                maxBarThickness: 36
            }
        ]

    };


    const chartOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                position: "top",

                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    font: {
                        size: 10
                    }
                }
            },

            tooltip: {
                callbacks: {
                    label: (context) =>
                        ` ₹${Number(
                            context.raw
                        ).toLocaleString(
                            "en-IN"
                        )}`
                }
            }

        },

        scales: {

            y: {

                beginAtZero: true,

                grid: {
                    color:
                        "rgba(148,163,184,0.12)"
                },

                ticks: {
                    font: {
                        size: 9
                    },

                    callback: (value) =>
                        `₹${Number(
                            value
                        ).toLocaleString(
                            "en-IN"
                        )}`
                }

            },

            x: {

                grid: {
                    display: false
                },

                ticks: {
                    font: {
                        size: 9
                    }
                }

            }

        }

    };


    const doughnutOptions = {

        responsive: true,

        maintainAspectRatio: false,

        cutout: "70%",

        plugins: {

            legend: {
                position: "bottom",

                labels: {
                    usePointStyle: true,
                    boxWidth: 8,
                    padding: 12,
                    font: {
                        size: 9
                    }
                }
            }

        }

    };


    const insight = useMemo(() => {

        if (!summary.income &&
            !summary.expenses) {

            return {
                title:
                    "Not enough data yet",
                text:
                    "Add a few transactions to unlock meaningful financial insights."
            };

        }


        if (
            summary.expenses >
            summary.income
        ) {

            return {
                title:
                    "Spending is above income",
                text:
                    "Your expenses are currently higher than your recorded income for this month. Consider reviewing your largest categories."
            };

        }


        if (
            summary.savingsRate >= 30
        ) {

            return {
                title:
                    "Strong savings rate",
                text:
                    "You're retaining a healthy portion of your income this month. Keep monitoring your spending consistency."
            };

        }


        if (
            summary.savingsRate >= 15
        ) {

            return {
                title:
                    "Healthy progress",
                text:
                    "You're saving money this month. A little optimization in your largest spending categories could improve your savings rate further."
            };

        }


        return {
            title:
                "Room to improve",
            text:
                "Your savings rate is relatively low. Review recurring expenses and your highest spending categories."
        };

    }, [summary]);


    if (loading) {

        return (

            <div className="p-5 sm:p-7 lg:p-8 max-w-[1500px] mx-auto">

                <div className="animate-pulse space-y-6">

                    <div className="h-9 w-64 bg-slate-200 rounded-lg" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

                        {[1, 2, 3, 4].map(
                            (item) => (
                                <div
                                    key={item}
                                    className="h-32 bg-white border border-slate-200 rounded-2xl"
                                />
                            )
                        )}

                    </div>

                    <div className="h-[360px] bg-white border border-slate-200 rounded-2xl" />

                </div>

            </div>

        );

    }


    return (

        <div className="p-5 sm:p-7 lg:p-8 max-w-[1500px] mx-auto">


            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7">

                <div>

                    <div className="flex items-center gap-2 mb-2">

                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />

                        <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-indigo-600">
                            Financial intelligence
                        </span>

                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-[-0.045em] text-slate-950">
                        Analytics
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Understand where your money is going and how your finances are changing.
                    </p>

                </div>


                <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) =>
                        setSelectedMonth(
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

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-5">

                <AnalyticsCard
                    label="Income"
                    value={summary.income}
                    tone="emerald"
                    description="Total income this month"
                />

                <AnalyticsCard
                    label="Expenses"
                    value={summary.expenses}
                    tone="rose"
                    description="Total spending this month"
                />

                <AnalyticsCard
                    label="Savings"
                    value={summary.savings}
                    tone={
                        summary.savings >= 0
                            ? "indigo"
                            : "rose"
                    }
                    description="Income minus expenses"
                />

                <AnalyticsCard
                    label="Savings rate"
                    value={`${summary.savingsRate.toFixed(1)}%`}
                    raw
                    tone="violet"
                    description="Percentage of income retained"
                />

            </div>


            {/* MAIN CHART */}

            <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6 mb-5">

                <div className="flex items-start justify-between mb-5">

                    <div>

                        <h2 className="text-sm font-extrabold text-slate-900">
                            Income vs expenses
                        </h2>

                        <p className="text-[10px] text-slate-400 mt-1">
                            Six-month financial trend
                        </p>

                    </div>

                </div>


                <div className="h-[300px] sm:h-[360px]">

                    <Line
                        data={lineChart}
                        options={chartOptions}
                    />

                </div>

            </div>


            {/* LOWER CHARTS */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mb-5">


                <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6">

                    <div className="mb-5">

                        <h2 className="text-sm font-extrabold text-slate-900">
                            Spending by category
                        </h2>

                        <p className="text-[10px] text-slate-400 mt-1">
                            Where your money went this month
                        </p>

                    </div>


                    {categoryData.length ===
                    0 ? (

                        <EmptyChart />

                    ) : (

                        <div className="h-[320px]">

                            <Doughnut
                                data={
                                    categoryChart
                                }
                                options={
                                    doughnutOptions
                                }
                            />

                        </div>

                    )}

                </div>


                <div className="bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6">

                    <div className="mb-5">

                        <h2 className="text-sm font-extrabold text-slate-900">
                            Top spending categories
                        </h2>

                        <p className="text-[10px] text-slate-400 mt-1">
                            Highest expense categories this month
                        </p>

                    </div>


                    {categoryData.length ===
                    0 ? (

                        <EmptyChart />

                    ) : (

                        <div className="h-[320px]">

                            <Bar
                                data={barChart}
                                options={chartOptions}
                            />

                        </div>

                    )}

                </div>

            </div>


            {/* INSIGHT */}

            <div className="relative overflow-hidden rounded-[22px] bg-[#0b1020] p-6 sm:p-7">

                <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-indigo-500/15 blur-[90px]" />

                <div className="relative flex flex-col sm:flex-row gap-5 sm:items-center">

                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-indigo-300 font-black">
                        AI
                    </div>


                    <div>

                        <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-indigo-300">
                            Financial insight
                        </p>

                        <h3 className="text-base sm:text-lg font-black text-white mt-1">
                            {insight.title}
                        </h3>

                        <p className="text-[10px] sm:text-xs leading-5 text-slate-400 mt-2 max-w-3xl">
                            {insight.text}
                        </p>

                    </div>

                </div>

            </div>

        </div>

    );

}


function AnalyticsCard({
    label,
    value,
    tone,
    description,
    raw = false
}) {

    const iconStyles = {

        emerald:
            "bg-emerald-50 text-emerald-600",

        rose:
            "bg-rose-50 text-rose-500",

        indigo:
            "bg-indigo-50 text-indigo-600",

        violet:
            "bg-violet-50 text-violet-600"

    };


    return (

        <div className="bg-white border border-slate-200/80 rounded-[20px] p-5 shadow-[0_5px_20px_rgba(15,23,42,0.025)] hover:-translate-y-0.5 transition">

            <div className="flex items-center justify-between">

                <p className="text-[9px] uppercase tracking-[0.14em] font-extrabold text-slate-400">
                    {label}
                </p>

                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${iconStyles[tone]}`}>
                    {label === "Savings rate"
                        ? "%"
                        : "₹"}
                </div>

            </div>


            <p className="text-2xl font-black tracking-[-0.04em] text-slate-950 mt-5">

                {raw
                    ? value
                    : `₹${Number(
                        value
                    ).toLocaleString(
                        "en-IN"
                    )}`}

            </p>


            <p className="text-[9px] text-slate-400 mt-2">
                {description}
            </p>

        </div>

    );

}


function EmptyChart() {

    return (

        <div className="h-full flex items-center justify-center text-center">

            <div>

                <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    ∅
                </div>

                <p className="text-xs font-bold text-slate-700 mt-3">
                    No expense data
                </p>

                <p className="text-[9px] text-slate-400 mt-1">
                    Add transactions to see analytics.
                </p>

            </div>

        </div>

    );

}


export default AnalyticsPage;