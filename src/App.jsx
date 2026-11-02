import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import {
    AuthProvider
} from "./context/AuthContext";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import AnalyticsPage from "./pages/AnalyticsPage";
import BudgetsPage from "./pages/BudgetsPage";
import RecurringPage from "./pages/RecurringPage";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";


function App() {

    return (
        <BrowserRouter>

            <AuthProvider>

                <Routes>

                    {/* Public routes */}

                    <Route
                        path="/"
                        element={<Landing />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/register"
                        element={<Register />}
                    />


                    {/* Protected application */}

                    <Route
                        element={
                            <ProtectedRoute>
                                <AppLayout />
                            </ProtectedRoute>
                        }
                    >

                        <Route
                            path="/dashboard"
                            element={<Dashboard />}
                        />

                        <Route
                            path="/transactions"
                            element={<Transactions />}
                        />

                        <Route
                            path="/analytics"
                            element={<AnalyticsPage />}
                        />

                        <Route
                            path="/budgets"
                            element={<BudgetsPage />}
                        />

                        <Route
                            path="/recurring"
                            element={<RecurringPage />}
                        />

                        <Route
                            path="/settings"
                            element={<Settings />}
                        />

                    </Route>


                    {/* Fallback */}

                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/dashboard"
                                replace
                            />
                        }
                    />

                </Routes>

            </AuthProvider>

        </BrowserRouter>
    );
}


export default App;