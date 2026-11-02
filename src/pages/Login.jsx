import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login(email, password);
            navigate("/dashboard");
        } catch (err) {
            setError(
                err.message ||
                "Unable to sign in. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

                {/* Left side */}
                <div className="hidden lg:flex bg-slate-900 text-white p-12 flex-col justify-between">

                    <div>
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
                                M
                            </div>

                            <span className="text-2xl font-bold">
                                MoneyTracker
                            </span>
                        </div>

                        <h1 className="text-4xl font-bold leading-tight">
                            Take control of
                            <br />
                            your money.
                        </h1>

                        <p className="text-slate-400 mt-5 text-lg leading-relaxed">
                            Track your spending, understand your
                            habits and build a clearer picture of
                            your financial life.
                        </p>
                    </div>

                    <div className="space-y-4 text-slate-300">

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Track income and expenses
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Analyze your spending
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Set and monitor budgets
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Prepare for intelligent financial insights
                        </div>

                    </div>
                </div>

                {/* Right side */}
                <div className="p-8 sm:p-12">

                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                            M
                        </div>

                        <span className="text-xl font-bold text-slate-900">
                            MoneyTracker
                        </span>
                    </div>

                    <div className="max-w-md mx-auto">

                        <h2 className="text-3xl font-bold text-slate-900">
                            Welcome back
                        </h2>

                        <p className="text-slate-500 mt-2 mb-8">
                            Sign in to continue to your
                            MoneyTracker account.
                        </p>

                        {error && (
                            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Email address
                                </label>

                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) =>
                                        setEmail(e.target.value)
                                    }
                                    placeholder="you@example.com"
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {loading
                                    ? "Signing in..."
                                    : "Sign in"}
                            </button>

                        </form>

                        <p className="text-center text-sm text-slate-500 mt-8">
                            Don't have an account?{" "}
                            <Link
                                to="/register"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Create one
                            </Link>
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;