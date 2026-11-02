import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar({ mobileOpen, setMobileOpen }) {
    const { user, logout } = useAuth();

    const initials =
        user?.name
            ?.split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase() || "U";

    function closeMobile() {
        if (setMobileOpen) {
            setMobileOpen(false);
        }
    }

    const mainNavigation = [
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
            icon: "◫"
        }
    ];

    const planningNavigation = [
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

    return (
        <aside
            className={`mt-sidebar ${
                mobileOpen ? "mobile-open" : ""
            }`}
        >
            <div className="mt-brand">
                <div className="mt-brand-mark">
                    M
                </div>

                <div>
                    <div className="mt-brand-name">
                        MoneyTracker
                    </div>

                    <div className="mt-brand-subtitle">
                        Personal Finance
                    </div>
                </div>
            </div>

            <div className="mt-sidebar-content">

                <div className="mt-nav-section">
                    <div className="mt-nav-label">
                        Overview
                    </div>

                    {mainNavigation.map(
                        (item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeMobile}
                                className={({ isActive }) =>
                                    `mt-nav-item ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >
                                <span className="mt-nav-icon">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.label}
                                </span>
                            </NavLink>
                        )
                    )}
                </div>

                <div className="mt-nav-section">
                    <div className="mt-nav-label">
                        Planning
                    </div>

                    {planningNavigation.map(
                        (item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeMobile}
                                className={({ isActive }) =>
                                    `mt-nav-item ${
                                        isActive
                                            ? "active"
                                            : ""
                                    }`
                                }
                            >
                                <span className="mt-nav-icon">
                                    {item.icon}
                                </span>

                                <span>
                                    {item.label}
                                </span>
                            </NavLink>
                        )
                    )}
                </div>

                <div className="mt-nav-section">
                    <div className="mt-nav-label">
                        Intelligence
                    </div>

                    <NavLink
                        to="/ai-assistant"
                        onClick={closeMobile}
                        className={({ isActive }) =>
                            `mt-nav-item ${
                                isActive
                                    ? "active"
                                    : ""
                            }`
                        }
                    >
                        <span className="mt-nav-icon">
                            ✦
                        </span>

                        <span>
                            AI Assistant
                        </span>

                        <span className="mt-nav-badge">
                            SOON
                        </span>
                    </NavLink>
                </div>

            </div>

            <div className="mt-sidebar-bottom">

                <button
                    className="mt-nav-item"
                    type="button"
                    onClick={logout}
                >
                    <span className="mt-nav-icon">
                        ↪
                    </span>

                    <span>
                        Log out
                    </span>
                </button>

                <div className="mt-user-card">

                    <div className="mt-user-avatar">
                        {initials}
                    </div>

                    <div className="mt-user-info">
                        <div className="mt-user-name">
                            {user?.name || "User"}
                        </div>

                        <div className="mt-user-email">
                            {user?.email || "Personal account"}
                        </div>
                    </div>

                </div>

            </div>
        </aside>
    );
}

export default Sidebar;