import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";

import {
    getTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction
} from "../services/api";


const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Bills",
    "Education",
    "Health",
    "Travel",
    "Salary",
    "Investment",
    "Other"
];


const emptyForm = {
    description: "",
    amount: "",
    type: "expense",
    category: "Food",
    date: new Date().toISOString().split("T")[0]
};


function Transactions() {

    const { user } = useAuth();


    const [transactions, setTransactions] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [form, setForm] =
        useState(emptyForm);

    const [editingId, setEditingId] =
        useState(null);

    const [saving, setSaving] =
        useState(false);

    const [deletingId, setDeletingId] =
        useState(null);

    const [showForm, setShowForm] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [typeFilter, setTypeFilter] =
        useState("all");

    const [categoryFilter, setCategoryFilter] =
        useState("all");

    const [sortBy, setSortBy] =
        useState("date");

    const [sortOrder, setSortOrder] =
        useState("desc");


    /* =========================
       LOAD TRANSACTIONS
    ========================= */

    useEffect(() => {
        loadTransactions();
    }, [user]);


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
                "Failed to load transactions"
            );

        } finally {

            setLoading(false);

        }
    }


    /* =========================
       FORM
    ========================= */

    function handleChange(e) {

        const {
            name,
            value
        } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value
        }));
    }


    function openAddForm() {

        setForm({
            ...emptyForm,
            date:
                new Date()
                    .toISOString()
                    .split("T")[0]
        });

        setEditingId(null);
        setError("");
        setShowForm(true);

        setTimeout(() => {
            document
                .getElementById("transaction-form")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 50);
    }


    function resetForm() {

        setForm({
            ...emptyForm,
            date:
                new Date()
                    .toISOString()
                    .split("T")[0]
        });

        setEditingId(null);
        setShowForm(false);
    }


    function startEditing(transaction) {

        setEditingId(transaction._id);

        setForm({
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

        setError("");
        setShowForm(true);

        setTimeout(() => {
            document
                .getElementById("transaction-form")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
        }, 50);
    }


    /* =========================
       SAVE TRANSACTION
    ========================= */

    async function handleSubmit(e) {

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        if (!token) return;


        if (
            !form.description.trim() ||
            !form.amount ||
            Number(form.amount) <= 0 ||
            !form.date
        ) {

            setError(
                "Please enter valid transaction details."
            );

            return;
        }


        try {

            setSaving(true);
            setError("");


            const transactionData = {

                description:
                    form.description.trim(),

                amount:
                    Number(form.amount),

                type:
                    form.type,

                category:
                    form.category,

                date:
                    form.date
            };


            if (editingId) {

                const data =
                    await updateTransaction(
                        token,
                        editingId,
                        transactionData
                    );


                setTransactions((previous) =>
                    previous.map(
                        (transaction) =>
                            transaction._id ===
                            editingId
                                ? data.transaction
                                : transaction
                    )
                );

            } else {

                const data =
                    await createTransaction(
                        token,
                        transactionData
                    );


                setTransactions((previous) => [
                    data.transaction,
                    ...previous
                ]);
            }


            resetForm();

        } catch (err) {

            setError(
                err.message ||
                "Failed to save transaction"
            );

        } finally {

            setSaving(false);

        }
    }


    /* =========================
       DELETE
    ========================= */

    async function handleDelete(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this transaction?"
            );

        if (!confirmed) return;


        const token =
            localStorage.getItem("token");

        if (!token) return;


        try {

            setDeletingId(id);
            setError("");


            await deleteTransaction(
                token,
                id
            );


            setTransactions((previous) =>
                previous.filter(
                    (transaction) =>
                        transaction._id !== id
                )
            );

        } catch (err) {

            setError(
                err.message ||
                "Failed to delete transaction"
            );

        } finally {

            setDeletingId(null);

        }
    }


    /* =========================
       FILTER + SORT
    ========================= */

    const filteredTransactions =
        useMemo(() => {

            let result =
                [...transactions];


            if (search.trim()) {

                const query =
                    search
                        .toLowerCase()
                        .trim();


                result =
                    result.filter(
                        (transaction) =>

                            transaction.description
                                .toLowerCase()
                                .includes(query)

                            ||

                            transaction.category
                                .toLowerCase()
                                .includes(query)
                    );
            }


            if (typeFilter !== "all") {

                result =
                    result.filter(
                        (transaction) =>
                            transaction.type ===
                            typeFilter
                    );
            }


            if (
                categoryFilter !==
                "all"
            ) {

                result =
                    result.filter(
                        (transaction) =>
                            transaction.category ===
                            categoryFilter
                    );
            }


            result.sort((a, b) => {

                let comparison = 0;


                if (sortBy === "date") {

                    comparison =
                        new Date(a.date) -
                        new Date(b.date);
                }


                if (sortBy === "amount") {

                    comparison =
                        Number(a.amount) -
                        Number(b.amount);
                }


                if (
                    sortBy ===
                    "description"
                ) {

                    comparison =
                        a.description.localeCompare(
                            b.description
                        );
                }


                return sortOrder === "asc"
                    ? comparison
                    : -comparison;

            });


            return result;

        }, [
            transactions,
            search,
            typeFilter,
            categoryFilter,
            sortBy,
            sortOrder
        ]);


    /* =========================
       SUMMARY
    ========================= */

    const summary =
        useMemo(() => {

            let income = 0;
            let expenses = 0;


            transactions.forEach(
                (transaction) => {

                    if (
                        transaction.type ===
                        "income"
                    ) {

                        income +=
                            Number(
                                transaction.amount
                            );

                    } else {

                        expenses +=
                            Number(
                                transaction.amount
                            );
                    }
                }
            );


            return {

                income,

                expenses,

                balance:
                    income - expenses

            };

        }, [transactions]);


    /* =========================
       HELPERS
    ========================= */

    function formatCurrency(amount) {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(amount);
    }


    function formatDate(date) {

        return new Date(
            `${date}T00:00:00`
        ).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );
    }


    function getCategoryIcon(category) {

        const icons = {

            Food: "🍽️",

            Transport: "🚗",

            Shopping: "🛍️",

            Entertainment: "🎬",

            Bills: "📄",

            Education: "🎓",

            Health: "❤️",

            Travel: "✈️",

            Salary: "💼",

            Investment: "📈",

            Other: "◈"

        };

        return icons[category] || "◈";
    }


    function clearFilters() {

        setSearch("");
        setTypeFilter("all");
        setCategoryFilter("all");
        setSortBy("date");
        setSortOrder("desc");
    }


    /* =========================
       LOADING
    ========================= */

    if (loading) {

        return (

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">

                <div className="animate-pulse space-y-6">

                    <div className="space-y-3">

                        <div className="h-4 w-28 bg-slate-200 rounded" />

                        <div className="h-9 w-64 bg-slate-200 rounded-lg" />

                        <div className="h-4 w-80 max-w-full bg-slate-200 rounded" />

                    </div>


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

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">


            {/* =========================
                HEADER
            ========================= */}

            <div className="mb-7">

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

                    <div>

                        <div className="flex items-center gap-2 mb-2">

                            <span className="w-2 h-2 rounded-full bg-blue-600" />

                            <p className="text-xs font-bold uppercase tracking-[0.16em] text-blue-600">
                                Financial activity
                            </p>

                        </div>


                        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
                            Transactions
                        </h1>


                        <p className="text-slate-500 mt-2 max-w-xl">
                            Keep every income and expense organized,
                            searchable and under control.
                        </p>

                    </div>


                    <button
                        onClick={openAddForm}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-slate-950 text-white rounded-xl font-semibold hover:bg-slate-800 active:scale-[0.98] transition shadow-sm"
                    >

                        <span className="text-lg leading-none">
                            +
                        </span>

                        Add Transaction

                    </button>

                </div>

            </div>


            {/* =========================
                ERROR
            ========================= */}

            {error && (

                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3.5 text-sm text-red-700 flex items-start justify-between gap-4">

                    <div>
                        <span className="font-semibold">
                            Something went wrong:
                        </span>{" "}
                        {error}
                    </div>

                    <button
                        onClick={() => setError("")}
                        className="text-red-500 hover:text-red-800 font-bold"
                    >
                        ×
                    </button>

                </div>

            )}


            {/* =========================
                SUMMARY CARDS
            ========================= */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">


                {/* INCOME */}

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Total Income
                            </p>

                            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2 font-number">
                                {formatCurrency(
                                    summary.income
                                )}
                            </p>

                        </div>


                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                            ↗
                        </div>

                    </div>


                    <p className="text-xs text-slate-400 mt-3">
                        Across all recorded transactions
                    </p>

                </div>


                {/* EXPENSE */}

                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-500">
                                Total Expenses
                            </p>

                            <p className="text-2xl sm:text-3xl font-extrabold text-slate-950 mt-2 font-number">
                                {formatCurrency(
                                    summary.expenses
                                )}
                            </p>

                        </div>


                        <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-lg">
                            ↘
                        </div>

                    </div>


                    <p className="text-xs text-slate-400 mt-3">
                        Your recorded spending
                    </p>

                </div>


                {/* BALANCE */}

                <div className="bg-slate-950 rounded-2xl p-5 shadow-sm text-white">

                    <div className="flex items-start justify-between">

                        <div>

                            <p className="text-sm font-medium text-slate-400">
                                Net Balance
                            </p>

                            <p
                                className={`text-2xl sm:text-3xl font-extrabold mt-2 font-number ${
                                    summary.balance >= 0
                                        ? "text-white"
                                        : "text-red-300"
                                }`}
                            >
                                {formatCurrency(
                                    summary.balance
                                )}
                            </p>

                        </div>


                        <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center text-lg">
                            ₹
                        </div>

                    </div>


                    <p className="text-xs text-slate-400 mt-3">
                        Income minus expenses
                    </p>

                </div>

            </div>


            {/* =========================
                ADD / EDIT FORM
            ========================= */}

            {showForm && (

                <div
                    id="transaction-form"
                    className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden mb-7 scroll-mt-6"
                >

                    <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex items-start justify-between gap-4">

                        <div>

                            <div className="flex items-center gap-2">

                                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                    {editingId ? "✎" : "+"}
                                </div>

                                <h2 className="text-lg font-bold text-slate-950">
                                    {editingId
                                        ? "Edit transaction"
                                        : "Add transaction"}
                                </h2>

                            </div>


                            <p className="text-sm text-slate-500 mt-2">
                                {editingId
                                    ? "Update the details of this transaction."
                                    : "Record a new income or expense."}
                            </p>

                        </div>


                        <button
                            onClick={resetForm}
                            className="w-9 h-9 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition flex items-center justify-center"
                        >
                            ×
                        </button>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-5 sm:p-6"
                    >

                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">


                            {/* DESCRIPTION */}

                            <div className="md:col-span-2 xl:col-span-4">

                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                                    Description
                                </label>

                                <input
                                    type="text"
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    placeholder="e.g. Grocery shopping"
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                    required
                                />

                            </div>


                            {/* AMOUNT */}

                            <div className="xl:col-span-2">

                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                                    Amount
                                </label>

                                <div className="relative">

                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-semibold">
                                        ₹
                                    </span>

                                    <input
                                        type="number"
                                        name="amount"
                                        value={form.amount}
                                        onChange={handleChange}
                                        placeholder="0"
                                        min="0"
                                        step="0.01"
                                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                        required
                                    />

                                </div>

                            </div>


                            {/* TYPE */}

                            <div className="xl:col-span-2">

                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                                    Type
                                </label>

                                <select
                                    name="type"
                                    value={form.type}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                >

                                    <option value="expense">
                                        Expense
                                    </option>

                                    <option value="income">
                                        Income
                                    </option>

                                </select>

                            </div>


                            {/* CATEGORY */}

                            <div className="xl:col-span-2">

                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={form.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                >

                                    {categories.map(
                                        (category) => (

                                            <option
                                                key={category}
                                                value={category}
                                            >
                                                {category}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* DATE */}

                            <div className="xl:col-span-2">

                                <label className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-2">
                                    Date
                                </label>

                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                                    required
                                />

                            </div>

                        </div>


                        <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 mt-6 pt-5 border-t border-slate-100">

                            <button
                                type="button"
                                onClick={resetForm}
                                className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 text-white font-semibold hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >

                                {saving
                                    ? "Saving..."
                                    : editingId
                                        ? "Update Transaction"
                                        : "Save Transaction"}

                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* =========================
                FILTERS
            ========================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 mb-5">

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">

                    <div>

                        <h2 className="font-bold text-slate-950">
                            Find transactions
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Search, filter and sort your financial activity.
                        </p>

                    </div>


                    {(search ||
                        typeFilter !== "all" ||
                        categoryFilter !== "all") && (

                        <button
                            onClick={clearFilters}
                            className="self-start lg:self-auto text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                            Clear filters
                        </button>

                    )}

                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">


                    {/* SEARCH */}

                    <div className="sm:col-span-2 xl:col-span-1">

                        <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                            Search
                        </label>

                        <div className="relative">

                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                ⌕
                            </span>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search by description or category..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                            />

                        </div>

                    </div>


                    {/* TYPE */}

                    <div>

                        <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                            Type
                        </label>

                        <select
                            value={typeFilter}
                            onChange={(e) =>
                                setTypeFilter(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                        >

                            <option value="all">
                                All types
                            </option>

                            <option value="income">
                                Income
                            </option>

                            <option value="expense">
                                Expense
                            </option>

                        </select>

                    </div>


                    {/* CATEGORY */}

                    <div>

                        <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                            Category
                        </label>

                        <select
                            value={categoryFilter}
                            onChange={(e) =>
                                setCategoryFilter(
                                    e.target.value
                                )
                            }
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                        >

                            <option value="all">
                                All categories
                            </option>

                            {categories.map(
                                (category) => (

                                    <option
                                        key={category}
                                        value={category}
                                    >
                                        {category}
                                    </option>

                                )
                            )}

                        </select>

                    </div>


                    {/* SORT */}

                    <div>

                        <label className="block text-xs font-bold uppercase tracking-wide text-slate-400 mb-2">
                            Sort
                        </label>

                        <select
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {

                                const [
                                    column,
                                    order
                                ] =
                                    e.target.value.split(
                                        "-"
                                    );

                                setSortBy(column);
                                setSortOrder(order);

                            }}
                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                        >

                            <option value="date-desc">
                                Newest first
                            </option>

                            <option value="date-asc">
                                Oldest first
                            </option>

                            <option value="amount-desc">
                                Highest amount
                            </option>

                            <option value="amount-asc">
                                Lowest amount
                            </option>

                            <option value="description-asc">
                                A → Z
                            </option>

                            <option value="description-desc">
                                Z → A
                            </option>

                        </select>

                    </div>

                </div>

            </div>


            {/* =========================
                TRANSACTIONS
            ========================= */}

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">


                {/* TABLE HEADER */}

                <div className="px-5 sm:px-6 py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>

                        <div className="flex items-center gap-3">

                            <h2 className="text-lg font-bold text-slate-950">
                                All Transactions
                            </h2>

                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold">
                                {filteredTransactions.length}
                            </span>

                        </div>

                        <p className="text-sm text-slate-500 mt-1">
                            Showing {filteredTransactions.length} of{" "}
                            {transactions.length} transactions
                        </p>

                    </div>

                </div>


                {/* EMPTY */}

                {filteredTransactions.length === 0 ? (

                    <div className="px-6 py-16 sm:py-20 text-center">

                        <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-2xl mb-5">
                            {transactions.length === 0
                                ? "₹"
                                : "⌕"}
                        </div>


                        <h3 className="text-lg font-bold text-slate-950">
                            {transactions.length === 0
                                ? "No transactions yet"
                                : "No matching transactions"}
                        </h3>


                        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-6">

                            {transactions.length === 0

                                ? "Start tracking your finances by adding your first transaction."

                                : "Try changing your search or filters to find what you're looking for."}

                        </p>


                        <div className="mt-5">

                            {transactions.length === 0 ? (

                                <button
                                    onClick={openAddForm}
                                    className="px-5 py-3 bg-slate-950 text-white rounded-xl font-semibold hover:bg-slate-800 transition"
                                >
                                    Add your first transaction
                                </button>

                            ) : (

                                <button
                                    onClick={clearFilters}
                                    className="px-5 py-3 border border-slate-200 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition"
                                >
                                    Clear filters
                                </button>

                            )}

                        </div>

                    </div>

                ) : (

                    <>

                        {/* =========================
                            DESKTOP TABLE
                        ========================= */}

                        <div className="hidden md:block overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="bg-slate-50/80 border-b border-slate-100">

                                        <th
                                            onClick={() =>
                                                setSortBy(
                                                    "description"
                                                )
                                            }
                                            className="text-left px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400 cursor-pointer hover:text-slate-700"
                                        >
                                            Transaction
                                        </th>


                                        <th className="text-left px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Category
                                        </th>


                                        <th className="text-left px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Type
                                        </th>


                                        <th
                                            onClick={() =>
                                                setSortBy(
                                                    "date"
                                                )
                                            }
                                            className="text-left px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400 cursor-pointer hover:text-slate-700"
                                        >
                                            Date
                                        </th>


                                        <th
                                            onClick={() =>
                                                setSortBy(
                                                    "amount"
                                                )
                                            }
                                            className="text-right px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400 cursor-pointer hover:text-slate-700"
                                        >
                                            Amount
                                        </th>


                                        <th className="text-right px-6 py-4 text-[11px] font-extrabold uppercase tracking-[0.12em] text-slate-400">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="divide-y divide-slate-100">

                                    {filteredTransactions.map(
                                        (transaction) => (

                                            <tr
                                                key={
                                                    transaction._id
                                                }
                                                className="group hover:bg-slate-50/70 transition"
                                            >


                                                {/* TRANSACTION */}

                                                <td className="px-6 py-4">

                                                    <div className="flex items-center gap-3">

                                                        <div
                                                            className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                                                                transaction.type ===
                                                                "income"
                                                                    ? "bg-emerald-50 text-emerald-600"
                                                                    : "bg-red-50 text-red-600"
                                                            }`}
                                                        >

                                                            {getCategoryIcon(
                                                                transaction.category
                                                            )}

                                                        </div>


                                                        <div className="min-w-0">

                                                            <p className="font-semibold text-slate-900 truncate max-w-[240px]">
                                                                {
                                                                    transaction.description
                                                                }
                                                            </p>

                                                            <p className="text-xs text-slate-400 mt-1">
                                                                {
                                                                    transaction.category
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* CATEGORY */}

                                                <td className="px-6 py-4">

                                                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                                                        {
                                                            transaction.category
                                                        }
                                                    </span>

                                                </td>


                                                {/* TYPE */}

                                                <td className="px-6 py-4">

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ${
                                                            transaction.type ===
                                                            "income"
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-red-50 text-red-700"
                                                        }`}
                                                    >

                                                        <span className="w-1.5 h-1.5 rounded-full bg-current" />

                                                        {transaction.type ===
                                                        "income"
                                                            ? "Income"
                                                            : "Expense"}

                                                    </span>

                                                </td>


                                                {/* DATE */}

                                                <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">

                                                    {formatDate(
                                                        transaction.date
                                                    )}

                                                </td>


                                                {/* AMOUNT */}

                                                <td
                                                    className={`px-6 py-4 text-right font-bold whitespace-nowrap ${
                                                        transaction.type ===
                                                        "income"
                                                            ? "text-emerald-600"
                                                            : "text-red-600"
                                                    }`}
                                                >

                                                    {transaction.type ===
                                                    "income"
                                                        ? "+"
                                                        : "-"}

                                                    {formatCurrency(
                                                        transaction.amount
                                                    )}

                                                </td>


                                                {/* ACTIONS */}

                                                <td className="px-6 py-4">

                                                    <div className="flex justify-end gap-1.5">

                                                        <button
                                                            onClick={() =>
                                                                startEditing(
                                                                    transaction
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                                        >
                                                            Edit
                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    transaction._id
                                                                )
                                                            }
                                                            disabled={
                                                                deletingId ===
                                                                transaction._id
                                                            }
                                                            className="px-3 py-2 text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                                        >
                                                            {deletingId ===
                                                            transaction._id
                                                                ? "..."
                                                                : "Delete"}
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>


                        {/* =========================
                            MOBILE CARDS
                        ========================= */}

                        <div className="md:hidden divide-y divide-slate-100">

                            {filteredTransactions.map(
                                (transaction) => (

                                    <div
                                        key={
                                            transaction._id
                                        }
                                        className="p-4 sm:p-5"
                                    >

                                        <div className="flex items-start justify-between gap-3">


                                            <div className="flex items-center gap-3 min-w-0">

                                                <div
                                                    className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                                                        transaction.type ===
                                                        "income"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-red-50 text-red-600"
                                                    }`}
                                                >

                                                    {getCategoryIcon(
                                                        transaction.category
                                                    )}

                                                </div>


                                                <div className="min-w-0">

                                                    <p className="font-semibold text-slate-900 truncate">
                                                        {
                                                            transaction.description
                                                        }
                                                    </p>

                                                    <div className="flex flex-wrap items-center gap-2 mt-1.5">

                                                        <span className="text-xs text-slate-400">
                                                            {
                                                                transaction.category
                                                            }
                                                        </span>

                                                        <span className="text-slate-300">
                                                            •
                                                        </span>

                                                        <span className="text-xs text-slate-400">
                                                            {formatDate(
                                                                transaction.date
                                                            )}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>


                                            <p
                                                className={`font-bold text-sm whitespace-nowrap ${
                                                    transaction.type ===
                                                    "income"
                                                        ? "text-emerald-600"
                                                        : "text-red-600"
                                                }`}
                                            >

                                                {transaction.type ===
                                                "income"
                                                    ? "+"
                                                    : "-"}

                                                {formatCurrency(
                                                    transaction.amount
                                                )}

                                            </p>

                                        </div>


                                        <div className="flex items-center justify-between mt-4">

                                            <span
                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                                                    transaction.type ===
                                                    "income"
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-red-50 text-red-700"
                                                }`}
                                            >

                                                <span className="w-1.5 h-1.5 rounded-full bg-current" />

                                                {transaction.type ===
                                                "income"
                                                    ? "Income"
                                                    : "Expense"}

                                            </span>


                                            <div className="flex gap-1">

                                                <button
                                                    onClick={() =>
                                                        startEditing(
                                                            transaction
                                                        )
                                                    }
                                                    className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-lg transition"
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            transaction._id
                                                        )
                                                    }
                                                    disabled={
                                                        deletingId ===
                                                        transaction._id
                                                    }
                                                    className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition disabled:opacity-50"
                                                >
                                                    {deletingId ===
                                                    transaction._id
                                                        ? "..."
                                                        : "Delete"}
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    </>

                )}

            </div>

        </div>
    );
}


export default Transactions;    