import {
    useState
} from "react";

import {
    NavLink,
    Outlet,
    useLocation
} from "react-router-dom";

import {
    useAuth
} from "../context/AuthContext";


const navigation = [

    {
        label: "Dashboard",
        path: "/dashboard",
        icon: "⌂"
    },

    {
        label: "Transactions",
        path: "/transactions",
        icon: "↔"
    },

    {
        label: "Analytics",
        path: "/analytics",
        icon: "◒"
    },

    {
        label: "Budgets",
        path: "/budgets",
        icon: "◎"
    },

    {
        label: "Recurring",
        path: "/recurring",
        icon: "↻"
    }

];


function AppLayout() {

    const {
        user,
        logout
    } = useAuth();


    const [
        sidebarOpen,
        setSidebarOpen
    ] = useState(false);


    const location =
        useLocation();


    const currentPage =
        navigation.find(
            (item) =>
                location.pathname ===
                item.path
        );


    const pageTitle =
        currentPage?.label ||
        "MoneyTracker";


    return (

        <div className="min-h-screen bg-[#f8fafc]">


            {/* ===================================================== */}
            {/* MOBILE OVERLAY */}
            {/* ===================================================== */}

            {sidebarOpen && (

                <button
                    aria-label="Close navigation"
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
                />

            )}


            {/* ===================================================== */}
            {/* SIDEBAR */}
            {/* ===================================================== */}

            <aside
                className={`
                    fixed
                    inset-y-0
                    left-0
                    z-50
                    w-[258px]
                    bg-[#0b1020]
                    text-white
                    flex
                    flex-col
                    border-r
                    border-white/[0.06]
                    transition-transform
                    duration-300
                    ease-out
                    lg:translate-x-0
                    ${
                        sidebarOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >


                {/* BRAND */}

                <div className="h-[82px] px-6 flex items-center justify-between border-b border-white/[0.06]">

                    <div className="flex items-center gap-3">

                        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-slate-950 font-black text-sm shadow-[0_8px_25px_rgba(255,255,255,0.08)]">
                            M
                        </div>


                        <div>

                            <p className="text-sm font-black tracking-[-0.02em]">
                                MoneyTracker
                            </p>

                            <p className="text-[8px] uppercase tracking-[0.18em] text-slate-500 mt-0.5">
                                Financial OS
                            </p>

                        </div>

                    </div>


                    <button
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className="lg:hidden w-8 h-8 rounded-lg text-slate-500 hover:text-white hover:bg-white/5"
                    >
                        ×
                    </button>

                </div>


                {/* NAV */}

                <div className="flex-1 px-4 py-6 overflow-y-auto">

                    <p className="px-3 mb-3 text-[8px] uppercase tracking-[0.2em] font-bold text-slate-600">
                        Workspace
                    </p>


                    <nav className="space-y-1">

                        {navigation.map(
                            (item) => (

                                <NavLink
                                    key={
                                        item.path
                                    }
                                    to={
                                        item.path
                                    }
                                    onClick={() =>
                                        setSidebarOpen(
                                            false
                                        )
                                    }
                                    className={({
                                        isActive
                                    }) =>
                                        `
                                        group
                                        flex
                                        items-center
                                        gap-3
                                        px-3
                                        py-2.5
                                        rounded-xl
                                        transition
                                        ${
                                            isActive
                                                ? "bg-white text-slate-950 shadow-[0_8px_25px_rgba(0,0,0,0.18)]"
                                                : "text-slate-500 hover:text-white hover:bg-white/[0.05]"
                                        }
                                    `
                                    }
                                >

                                    {({
                                        isActive
                                    }) => (

                                        <>

                                            <span
                                                className={`
                                                    w-8
                                                    h-8
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-xs
                                                    font-black
                                                    ${
                                                        isActive
                                                            ? "bg-slate-100 text-slate-900"
                                                            : "bg-white/[0.04] text-slate-500 group-hover:text-white"
                                                    }
                                                `}
                                            >
                                                {
                                                    item.icon
                                                }
                                            </span>


                                            <span className="text-[11px] font-bold">
                                                {
                                                    item.label
                                                }
                                            </span>

                                        </>

                                    )}

                                </NavLink>

                            )
                        )}

                    </nav>


                    {/* AI CARD */}

                    <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-4">

                        <div className="flex items-center gap-2">

                            <span className="w-2 h-2 rounded-full bg-indigo-400" />

                            <span className="text-[8px] uppercase tracking-[0.15em] font-bold text-indigo-300">
                                AI Intelligence
                            </span>

                        </div>


                        <p className="text-[10px] leading-5 text-slate-500 mt-3">
                            Intelligent financial insights are coming soon.
                        </p>


                        <div className="mt-3 px-2.5 py-1.5 rounded-lg bg-white/[0.04] text-[8px] font-bold text-slate-600 inline-block">
                            Coming soon
                        </div>

                    </div>

                </div>


                {/* BOTTOM */}

                <div className="p-4 border-t border-white/[0.06]">


                    <NavLink
                        to="/settings"
                        onClick={() =>
                            setSidebarOpen(false)
                        }
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2.5
                            rounded-xl
                            transition
                            ${
                                isActive
                                    ? "bg-white/[0.08] text-white"
                                    : "text-slate-500 hover:text-white hover:bg-white/[0.04]"
                            }
                        `
                        }
                    >

                        <span className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center text-xs">
                            ⚙
                        </span>

                        <span className="text-[10px] font-bold">
                            Settings
                        </span>

                    </NavLink>


                    <div className="mt-3 flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.025]">

                        <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-[10px] font-black">
                            {user?.name
                                ?.charAt(0)
                                ?.toUpperCase() ||
                                "U"}
                        </div>


                        <div className="min-w-0 flex-1">

                            <p className="text-[10px] font-bold text-white truncate">
                                {user?.name ||
                                    "User"}
                            </p>

                            <p className="text-[8px] text-slate-600 truncate">
                                {user?.email ||
                                    ""}
                            </p>

                        </div>


                        <button
                            onClick={logout}
                            className="text-slate-600 hover:text-rose-400 text-xs"
                            title="Logout"
                        >
                            ↗
                        </button>

                    </div>

                </div>

            </aside>


            {/* ===================================================== */}
            {/* MAIN */}
            {/* ===================================================== */}

            <div className="lg:pl-[258px] min-h-screen">


                {/* TOPBAR */}

                <header className="sticky top-0 z-30 h-[72px] bg-white/90 backdrop-blur-xl border-b border-slate-200/70">

                    <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">


                        <div className="flex items-center gap-3 min-w-0">


                            {/* MOBILE MENU */}

                            <button
                                onClick={() =>
                                    setSidebarOpen(
                                        true
                                    )
                                }
                                className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-lg"
                                aria-label="Open navigation"
                            >
                                ☰
                            </button>


                            <div className="min-w-0">

                                <p className="hidden sm:block text-[8px] uppercase tracking-[0.2em] font-bold text-slate-400">
                                    MoneyTracker
                                </p>

                                <h2 className="text-sm sm:text-base font-black text-slate-900 truncate">
                                    {pageTitle}
                                </h2>

                            </div>

                        </div>


                        {/* RIGHT */}

                        <div className="flex items-center gap-2 sm:gap-4">


                            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-50 border border-emerald-100">

                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />

                                <span className="text-[8px] uppercase tracking-wider font-bold text-emerald-600">
                                    Account active
                                </span>

                            </div>


                            <div className="w-9 h-9 rounded-xl bg-slate-950 text-white flex items-center justify-center text-[10px] font-black">
                                {user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() ||
                                    "U"}
                            </div>

                        </div>

                    </div>

                </header>


                {/* PAGE */}

                <main className="min-h-[calc(100vh-72px)] page-enter">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}


export default AppLayout;