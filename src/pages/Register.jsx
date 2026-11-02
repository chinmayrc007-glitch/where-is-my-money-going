import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError(
                "Password must be at least 6 characters."
            );
            return;
        }

        setLoading(true);

        try {
            await register(
                name,
                email,
                password
            );

            navigate("/dashboard");
        } catch (err) {
            setError(
                err.message ||
                "Unable to create your account."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">

            <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-3xl overflow-hidden shadow-2xl">

                {/* Branding */}
                <div className="hidden lg:flex bg-slate-900 text-white p-12 flex-col justify-between">

                    <div>

                        <Link
                            to="/"
                            className="flex items-center gap-3 mb-12"
                        >
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-lg">
                                M
                            </div>

                            <span className="text-2xl font-bold">
                                MoneyTracker
                            </span>
                        </Link>

                        <h1 className="text-4xl font-bold leading-tight">
                            Build better
                            <br />
                            money habits.
                        </h1>

                        <p className="text-slate-400 mt-5 text-lg leading-relaxed">
                            Start understanding your finances today.
                            Track spending, manage budgets and make
                            smarter decisions.
                        </p>

                    </div>

                    <div className="space-y-4 text-slate-300">

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Simple expense tracking
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Powerful financial analytics
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Monthly budget management
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-green-400">✓</span>
                            Intelligent insights
                        </div>

                    </div>

                </div>


                {/* Form */}
                <div className="p-8 sm:p-12">

                    <div className="lg:hidden flex items-center gap-3 mb-10">

                        <Link to="/">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                                M
                            </div>
                        </Link>

                        <span className="text-xl font-bold text-slate-900">
                            MoneyTracker
                        </span>

                    </div>


                    <div className="max-w-md mx-auto">

                        <h2 className="text-3xl font-bold text-slate-900">
                            Create your account
                        </h2>

                        <p className="text-slate-500 mt-2 mb-8">
                            Start taking control of your finances.
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
                                    Full name
                                </label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    placeholder="Your name"
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>


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
                                    placeholder="At least 6 characters"
                                    required
                                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>


                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Confirm password
                                </label>

                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Repeat your password"
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
                                    ? "Creating account..."
                                    : "Create account"}
                            </button>

                        </form>


                        <p className="text-center text-sm text-slate-500 mt-8">

                            Already have an account?{" "}

                            <Link
                                to="/login"
                                className="font-semibold text-blue-600 hover:text-blue-700"
                            >
                                Sign in
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;