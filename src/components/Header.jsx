import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header({ setMobileOpen }) {
    const { user } = useAuth();
    const location = useLocation();

    const titles = {
        "/dashboard": "Dashboard",
        "/transactions": "Transactions",
        "/analytics": "Analytics",
        "/budgets": "Budgets",
        "/recurring": "Recurring",
        "/ai-assistant": "AI Assistant"
    };

    const title =
        titles[location.pathname] ||
        "MoneyTracker";

    const initials =
        user?.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    return (
        <header className="mt-header">

            <div className="mt-header-left">

                <button
                    className="mt-mobile-menu"
                    type="button"
                    onClick={() =>
                        setMobileOpen(
                            (previous) =>
                                !previous
                        )
                    }
                    aria-label="Open navigation"
                >
                    ☰
                </button>

                <div className="hidden md:block">
                    <p className="text-[10px] uppercase tracking-[0.12em] font-bold text-slate-400">
                        MoneyTracker
                    </p>

                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                        {title}
                    </p>
                </div>

            </div>

            <div className="mt-header-right">

                <div className="mt-header-search">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Search your finances..."
                        aria-label="Search"
                    />
                </div>

                <button
                    className="mt-icon-button"
                    type="button"
                    title="Notifications"
                >
                    ♧
                </button>

                <div
                    className="mt-header-avatar"
                    title={user?.name || "User"}
                >
                    {initials}
                </div>

            </div>

        </header>
    );
}

export default Header;