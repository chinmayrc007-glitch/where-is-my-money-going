const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB =
    require("./config/db");

const authRoutes =
    require("./routes/authRoutes");

const transactionRoutes =
    require("./routes/transactionRoutes");

const budgetRoutes =
    require("./routes/budgetRoutes");

const recurringRoutes =
    require("./routes/recurringRoutes");


const app = express();


// =========================
// DATABASE
// =========================

connectDB();


// =========================
// MIDDLEWARE
// =========================

const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
];

if (process.env.FRONTEND_URL) {
    allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(cors({ origin: allowedOrigins }));

app.use(express.json());


// =========================
// HEALTH
// =========================

app.get(
    "/api/health",
    (req, res) => {
        res.json({
            message:
                "Money Tracker API is running"
        });
    }
);


// =========================
// ROUTES
// =========================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/transactions",
    transactionRoutes
);

app.use(
    "/api/budgets",
    budgetRoutes
);

app.use(
    "/api/recurring",
    recurringRoutes
);


// =========================
// SERVER
// =========================

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {
        console.log(
            `Server running on port ${PORT}`
        );
    }
);