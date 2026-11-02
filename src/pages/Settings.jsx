import { useState } from "react";

import { useAuth } from "../context/AuthContext";


function Settings() {

    const {
        user,
        logout
    } = useAuth();


    const [
        currency,
        setCurrency
    ] = useState("INR");

    const [
        compactMode,
        setCompactMode
    ] = useState(false);

    const [
        showNotifications,
        setShowNotifications
    ] = useState(true);


    return (

        <div className="p-5 sm:p-7 lg:p-8 max-w-[1100px] mx-auto">


            {/* HEADER */}

            <div className="mb-7">

                <div className="flex items-center gap-2 mb-2">

                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />

                    <span className="text-[9px] uppercase tracking-[0.2em] font-extrabold text-indigo-600">
                        Application
                    </span>

                </div>


                <h1 className="text-2xl sm:text-3xl font-black tracking-[-0.045em] text-slate-950">
                    Settings
                </h1>


                <p className="text-xs sm:text-sm text-slate-500 mt-2">
                    Manage your profile and application preferences.
                </p>

            </div>


            <div className="space-y-5">


                {/* PROFILE */}

                <section className="bg-white border border-slate-200/80 rounded-[22px] overflow-hidden">

                    <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

                        <h2 className="text-sm font-extrabold text-slate-900">
                            Profile
                        </h2>

                        <p className="text-[10px] text-slate-400 mt-1">
                            Your MoneyTracker account information.
                        </p>

                    </div>


                    <div className="p-5 sm:p-6">

                        <div className="flex flex-col sm:flex-row sm:items-center gap-5">

                            <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white flex items-center justify-center text-xl font-black">
                                {user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() ||
                                    "U"}
                            </div>


                            <div>

                                <h3 className="text-lg font-black text-slate-900">
                                    {user?.name ||
                                        "User"}
                                </h3>

                                <p className="text-xs text-slate-500 mt-1">
                                    {user?.email ||
                                        "No email available"}
                                </p>

                            </div>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                            <SettingField
                                label="Name"
                                value={
                                    user?.name ||
                                    "—"
                                }
                            />

                            <SettingField
                                label="Email"
                                value={
                                    user?.email ||
                                    "—"
                                }
                            />

                        </div>

                    </div>

                </section>


                {/* PREFERENCES */}

                <section className="bg-white border border-slate-200/80 rounded-[22px] overflow-hidden">

                    <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

                        <h2 className="text-sm font-extrabold text-slate-900">
                            Preferences
                        </h2>

                        <p className="text-[10px] text-slate-400 mt-1">
                            Customize how MoneyTracker behaves.
                        </p>

                    </div>


                    <div className="divide-y divide-slate-100">


                        <SettingRow
                            title="Currency"
                            description="Currency used throughout your financial dashboard."
                        >

                            <select
                                value={currency}
                                onChange={(e) =>
                                    setCurrency(
                                        e.target.value
                                    )
                                }
                                className="h-10 px-3 rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-slate-600 outline-none"
                            >

                                <option value="INR">
                                    INR — ₹
                                </option>

                                <option value="USD">
                                    USD — $
                                </option>

                                <option value="EUR">
                                    EUR — €
                                </option>

                            </select>

                        </SettingRow>


                        <SettingRow
                            title="Compact interface"
                            description="Reduce spacing in transaction and dashboard sections."
                        >

                            <Toggle
                                enabled={
                                    compactMode
                                }
                                onClick={() =>
                                    setCompactMode(
                                        !compactMode
                                    )
                                }
                            />

                        </SettingRow>


                        <SettingRow
                            title="Notifications"
                            description="Enable future financial reminders and insights."
                        >

                            <Toggle
                                enabled={
                                    showNotifications
                                }
                                onClick={() =>
                                    setShowNotifications(
                                        !showNotifications
                                    )
                                }
                            />

                        </SettingRow>

                    </div>

                </section>


                {/* SECURITY */}

                <section className="bg-white border border-slate-200/80 rounded-[22px] overflow-hidden">

                    <div className="px-5 sm:px-6 py-5 border-b border-slate-100">

                        <h2 className="text-sm font-extrabold text-slate-900">
                            Security
                        </h2>

                        <p className="text-[10px] text-slate-400 mt-1">
                            Manage your current session.
                        </p>

                    </div>


                    <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <h3 className="text-xs font-extrabold text-slate-800">
                                Sign out
                            </h3>

                            <p className="text-[10px] text-slate-400 mt-1">
                                Remove your current session from this device.
                            </p>

                        </div>


                        <button
                            onClick={logout}
                            className="h-10 px-5 rounded-xl bg-rose-50 text-rose-600 text-xs font-extrabold hover:bg-rose-100 transition"
                        >
                            Sign out
                        </button>

                    </div>

                </section>


                {/* AI */}

                <section className="relative overflow-hidden rounded-[22px] bg-[#0b1020] p-6 sm:p-7">

                    <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-indigo-500/15 blur-[90px]" />


                    <div className="relative flex gap-4">

                        <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-indigo-300 font-black">
                            AI
                        </div>


                        <div>

                            <p className="text-[9px] uppercase tracking-[0.18em] font-bold text-indigo-300">
                                Coming soon
                            </p>

                            <h2 className="text-base font-black text-white mt-1">
                                AI Financial Intelligence
                            </h2>

                            <p className="text-[10px] leading-5 text-slate-400 mt-2 max-w-2xl">
                                MoneyTracker will eventually use your transaction history to provide natural-language financial analysis, spending insights, budget recommendations and personalized financial intelligence.
                            </p>

                        </div>

                    </div>

                </section>


                {/* APP INFO */}

                <section className="bg-white border border-slate-200/80 rounded-[22px] p-5 sm:p-6">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <p className="text-sm font-black text-slate-900">
                                MoneyTracker
                            </p>

                            <p className="text-[10px] text-slate-400 mt-1">
                                Personal finance management platform
                            </p>

                        </div>


                        <div className="text-left sm:text-right">

                            <p className="text-[9px] uppercase tracking-wider font-bold text-slate-400">
                                Version
                            </p>

                            <p className="text-xs font-black text-slate-700 mt-1">
                                1.0.0
                            </p>

                        </div>

                    </div>

                </section>

            </div>

        </div>

    );

}


function SettingField({
    label,
    value
}) {

    return (

        <div>

            <p className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 mb-2">
                {label}
            </p>

            <div className="h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center text-xs font-semibold text-slate-600">
                {value}
            </div>

        </div>

    );

}


function SettingRow({
    title,
    description,
    children
}) {

    return (

        <div className="p-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>

                <h3 className="text-xs font-extrabold text-slate-800">
                    {title}
                </h3>

                <p className="text-[10px] text-slate-400 mt-1 max-w-xl">
                    {description}
                </p>

            </div>


            <div className="shrink-0">
                {children}
            </div>

        </div>

    );

}


function Toggle({
    enabled,
    onClick
}) {

    return (

        <button
            onClick={onClick}
            className={`
                relative
                w-11
                h-6
                rounded-full
                transition
                ${
                    enabled
                        ? "bg-indigo-600"
                        : "bg-slate-200"
                }
            `}
        >

            <span
                className={`
                    absolute
                    top-1
                    w-4
                    h-4
                    rounded-full
                    bg-white
                    shadow
                    transition
                    ${
                        enabled
                            ? "left-6"
                            : "left-1"
                    }
                `}
            />

        </button>

    );

}


export default Settings;