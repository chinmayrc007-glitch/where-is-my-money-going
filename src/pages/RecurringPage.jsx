import { useEffect, useMemo, useState } from "react";

import {
    getRecurringTransactions,
    createRecurringTransaction,
    processRecurringTransactions,
    toggleRecurringTransaction,
    deleteRecurringTransaction
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
    category: "Bills",
    startDate: new Date()
        .toISOString()
        .split("T")[0],
    frequency: "monthly"
};


function RecurringPage() {

    const [
        recurringTransactions,
        setRecurringTransactions
    ] = useState([]);

    const [
        loading,
        setLoading
    ] = useState(true);

    const [
        saving,
        setSaving
    ] = useState(false);

    const [
        processing,
        setProcessing
    ] = useState(false);

    const [
        error,
        setError
    ] = useState("");

    const [
        form,
        setForm
    ] = useState(emptyForm);

    const [
        showForm,
        setShowForm
    ] = useState(false);


    useEffect(() => {
        loadRecurring();
    }, []);


    async function loadRecurring() {

        const token =
            localStorage.getItem("token");

        if (!token) return;

        try {

            setLoading(true);
            setError("");

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


    function resetForm() {

        setForm({
            ...emptyForm,
            startDate: new Date()
                .toISOString()
                .split("T")[0]
        });

        setShowForm(false);

    }


    async function handleSubmit(e) {

        e.preventDefault();

        const token =
            localStorage.getItem("token");

        if (!token) return;


        if (
            !form.description.trim() ||
            !form.amount ||
            Number(form.amount) <= 0 ||
            !form.startDate
        ) {

            setError(
                "Please enter valid recurring transaction details."
            );

            return;

        }


        try {

            setSaving(true);
            setError("");

            const data =
                await createRecurringTransaction(
                    token,
                    {
                        ...form,
                        amount:
                            Number(
                                form.amount
                            )
                    }
                );

            setRecurringTransactions(
                (previous) => [
                    data.recurringTransaction,
                    ...previous
                ]
            );

            resetForm();

        } catch (err) {

            setError(
                err.message ||
                "Failed to create recurring transaction"
            );

        } finally {

            setSaving(false);

        }
    }


    async function processTransactions() {

        const token =
            localStorage.getItem("token");

        if (!token) return;


        try {

            setProcessing(true);
            setError("");

            await processRecurringTransactions(
                token
            );

            await loadRecurring();

        } catch (err) {

            setError(
                err.message ||
                "Failed to process recurring transactions"
            );

        } finally {

            setProcessing(false);

        }

    }


    async function toggle(id) {

        const token =
            localStorage.getItem("token");

        if (!token) return;


        try {

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


    async function handleDelete(id) {

        if (
            !window.confirm(
                "Delete this recurring transaction?"
            )
        ) {
            return;
        }


        const token =
            localStorage.getItem("token");

        if (!token) return;


        try {

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


    const activeCount =
        recurringTransactions.filter(
            (item) => item.active
        ).length;


    const monthlyExpenses =
        useMemo(() => {

            return recurringTransactions
                .filter(
                    (item) =>
                        item.active &&
                        item.type ===
                            "expense"
                )
                .reduce(
                    (
                        total,
                        item
                    ) => {

                        const amount =
                            Number(
                                item.amount
                            ) || 0;

                        if (
                            item.frequency ===
                            "weekly"
                        ) {
                            return (
                                total +
                                amount *
                                    4.33
                            );
                        }

                        if (
                            item.frequency ===
                            "yearly"
                        ) {
                            return (
                                total +
                                amount /
                                    12
                            );
                        }

                        return (
                            total +
                            amount
                        );

                    },
                    0
                );

        }, [
            recurringTransactions
        ]);


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

                    <div className="h-96 bg-white border border-slate-200 rounded-2xl" />

                </div>

            </div>

        );

    }


    return (

        <div className="p-5 sm:p-7 lg:p-8 max-w-[1400px] mx-auto">


            {/* HEADER */}

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-7">

                <div>

                    <div className="flex items-center gap-2 mb-2">

                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />

                        <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-indigo-600">
                            Automation
                        </span>

                    </div>

                    <h1 className="text-2xl sm:text-3xl font-black tracking-[-0.045em] text-slate-950">
                        Recurring
                    </h1>

                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                        Automate the transactions that happen regularly.
                    </p>

                </div>


                <div className="flex flex-col sm:flex-row gap-2">

                    <button
                        onClick={
                            processTransactions
                        }
                        disabled={processing}
                        className="h-11 px-4 rounded-xl border border-slate-200 bg-white text-xs font-extrabold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50"
                    >
                        {processing
                            ? "Processing..."
                            : "Process due transactions"}
                    </button>


                    <button
                        onClick={() =>
                            setShowForm(
                                !showForm
                            )
                        }
                        className="h-11 px-5 rounded-xl bg-slate-950 text-white text-xs font-extrabold hover:bg-slate-800 transition"
                    >
                        {showForm
                            ? "Close"
                            : "+ Add recurring"}
                    </button>

                </div>

            </div>


            {error && (

                <div className="mb-5 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-600">
                    {error}
                </div>

            )}


            {/* SUMMARY */}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">

                <RecurringCard
                    label="Active"
                    value={activeCount}
                    raw
                    tone="emerald"
                    description="Currently running rules"
                />

                <RecurringCard
                    label="Total rules"
                    value={
                        recurringTransactions.length
                    }
                    raw
                    tone="indigo"
                    description="All recurring transactions"
                />

                <RecurringCard
                    label="Monthly expense"
                    value={
                        monthlyExpenses
                    }
                    tone="rose"
                    description="Estimated recurring spending"
                />

            </div>


            {/* FORM */}

            {showForm && (

                <div className="bg-[#0b1020] rounded-[24px] p-5 sm:p-6 mb-5 border border-slate-800">

                    <div className="mb-6">

                        <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-indigo-300">
                            New recurring rule
                        </p>

                        <h2 className="text-lg font-black text-white mt-1">
                            Automate a transaction
                        </h2>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4"
                    >

                        <div className="lg:col-span-4">

                            <label className="field-label-dark">
                                Description
                            </label>

                            <input
                                name="description"
                                value={
                                    form.description
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="e.g. Netflix subscription"
                                className="dark-input"
                            />

                        </div>


                        <div className="lg:col-span-2">

                            <label className="field-label-dark">
                                Amount
                            </label>

                            <input
                                type="number"
                                name="amount"
                                value={
                                    form.amount
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="0"
                                min="1"
                                className="dark-input"
                            />

                        </div>


                        <div className="lg:col-span-2">

                            <label className="field-label-dark">
                                Type
                            </label>

                            <select
                                name="type"
                                value={
                                    form.type
                                }
                                onChange={
                                    handleChange
                                }
                                className="dark-select"
                            >

                                <option value="expense">
                                    Expense
                                </option>

                                <option value="income">
                                    Income
                                </option>

                            </select>

                        </div>


                        <div className="lg:col-span-2">

                            <label className="field-label-dark">
                                Category
                            </label>

                            <select
                                name="category"
                                value={
                                    form.category
                                }
                                onChange={
                                    handleChange
                                }
                                className="dark-select"
                            >

                                {categories.map(
                                    (category) => (
                                        <option
                                            key={
                                                category
                                            }
                                            value={
                                                category
                                            }
                                        >
                                            {category}
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        <div className="lg:col-span-2">

                            <label className="field-label-dark">
                                Frequency
                            </label>

                            <select
                                name="frequency"
                                value={
                                    form.frequency
                                }
                                onChange={
                                    handleChange
                                }
                                className="dark-select"
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


                        <div className="lg:col-span-3">

                            <label className="field-label-dark">
                                Start date
                            </label>

                            <input
                                type="date"
                                name="startDate"
                                value={
                                    form.startDate
                                }
                                onChange={
                                    handleChange
                                }
                                className="dark-input"
                            />

                        </div>


                        <div className="lg:col-span-9 flex items-end justify-end">

                            <button
                                type="submit"
                                disabled={saving}
                                className="h-11 px-6 rounded-xl bg-white text-slate-950 text-xs font-extrabold hover:bg-slate-100 transition disabled:opacity-50"
                            >
                                {saving
                                    ? "Saving..."
                                    : "Create recurring rule"}
                            </button>

                        </div>

                    </form>

                </div>

            )}


            {/* LIST */}

            <div className="bg-white border border-slate-200/80 rounded-[24px] overflow-hidden">

                <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

                    <h2 className="text-sm font-extrabold text-slate-900">
                        Recurring transactions
                    </h2>

                    <p className="text-[10px] text-slate-400 mt-1">
                        Rules that automatically create transactions when due.
                    </p>

                </div>


                {recurringTransactions.length ===
                0 ? (

                    <div className="py-20 px-6 text-center">

                        <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 text-xl">
                            ↻
                        </div>

                        <h3 className="text-sm font-extrabold text-slate-900 mt-5">
                            No recurring transactions
                        </h3>

                        <p className="text-[10px] text-slate-400 mt-2">
                            Add subscriptions, rent, salary or other repeating transactions.
                        </p>

                    </div>

                ) : (

                    <div className="divide-y divide-slate-100">

                        {recurringTransactions.map(
                            (item) => (

                                <div
                                    key={
                                        item._id
                                    }
                                    className="p-5 sm:px-6 hover:bg-slate-50/70 transition"
                                >

                                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">


                                        <div className="flex items-center gap-3 flex-1 min-w-0">

                                            <div
                                                className={`
                                                    w-11
                                                    h-11
                                                    shrink-0
                                                    rounded-xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    font-black
                                                    ${
                                                        item.type ===
                                                        "income"
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-rose-50 text-rose-500"
                                                    }
                                                `}
                                            >
                                                ↻
                                            </div>


                                            <div className="min-w-0">

                                                <h3 className="text-xs font-extrabold text-slate-800 truncate">
                                                    {
                                                        item.description
                                                    }
                                                </h3>

                                                <div className="flex flex-wrap items-center gap-2 mt-1">

                                                    <span className="text-[9px] text-slate-400">
                                                        {
                                                            item.category
                                                        }
                                                    </span>

                                                    <span className="text-slate-300">
                                                        •
                                                    </span>

                                                    <span className="text-[9px] text-slate-400 capitalize">
                                                        {
                                                            item.frequency
                                                        }
                                                    </span>

                                                    <span className="text-slate-300">
                                                        •
                                                    </span>

                                                    <span className="text-[9px] text-slate-400">
                                                        Next:{" "}
                                                        {
                                                            item.nextDate
                                                        }
                                                    </span>

                                                </div>

                                            </div>

                                        </div>


                                        <div className="flex items-center justify-between lg:justify-end gap-5">

                                            <div>

                                                <p
                                                    className={`
                                                        text-sm
                                                        font-black
                                                        ${
                                                            item.type ===
                                                            "income"
                                                                ? "text-emerald-600"
                                                                : "text-rose-500"
                                                        }
                                                    `}
                                                >
                                                    {item.type ===
                                                    "income"
                                                        ? "+"
                                                        : "-"}
                                                    ₹
                                                    {Number(
                                                        item.amount
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>

                                            </div>


                                            <button
                                                onClick={() =>
                                                    toggle(
                                                        item._id
                                                    )
                                                }
                                                className={`
                                                    px-3
                                                    py-1.5
                                                    rounded-lg
                                                    text-[8px]
                                                    uppercase
                                                    tracking-wider
                                                    font-extrabold
                                                    ${
                                                        item.active
                                                            ? "bg-emerald-50 text-emerald-600"
                                                            : "bg-slate-100 text-slate-400"
                                                    }
                                                `}
                                            >
                                                {item.active
                                                    ? "Active"
                                                    : "Paused"}
                                            </button>


                                            <div className="flex gap-1">

                                                <button
                                                    onClick={() =>
                                                        toggle(
                                                            item._id
                                                        )
                                                    }
                                                    className="h-8 px-3 rounded-lg bg-slate-100 text-[9px] font-bold text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"
                                                >
                                                    {item.active
                                                        ? "Pause"
                                                        : "Resume"}
                                                </button>


                                                <button
                                                    onClick={() =>
                                                        handleDelete(
                                                            item._id
                                                        )
                                                    }
                                                    className="h-8 px-3 rounded-lg bg-slate-100 text-[9px] font-bold text-slate-500 hover:bg-rose-50 hover:text-rose-600"
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </div>

    );

}


function RecurringCard({
    label,
    value,
    tone,
    raw = false,
    description
}) {

    const styles = {

        emerald:
            "bg-emerald-50 text-emerald-600",

        indigo:
            "bg-indigo-50 text-indigo-600",

        rose:
            "bg-rose-50 text-rose-500"

    };


    return (

        <div className="bg-white border border-slate-200/80 rounded-[20px] p-5">

            <div className="flex justify-between items-center">

                <p className="text-[9px] uppercase tracking-[0.14em] font-extrabold text-slate-400">
                    {label}
                </p>

                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black ${styles[tone]}`}>
                    ↻
                </div>

            </div>


            <p className="text-2xl font-black text-slate-950 mt-5">

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


export default RecurringPage;