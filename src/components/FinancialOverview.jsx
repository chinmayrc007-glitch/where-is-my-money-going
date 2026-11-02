function FinancialOverview({ transactions }) {

    const income = transactions
        .filter(
            (transaction) =>
                transaction.type === "income"
        )
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount),
            0
        );

    const expenses = transactions
        .filter(
            (transaction) =>
                transaction.type === "expense"
        )
        .reduce(
            (total, transaction) =>
                total + Number(transaction.amount),
            0
        );

    const savings = income - expenses;

    const savingsRate =
        income > 0
            ? ((savings / income) * 100).toFixed(1)
            : 0;

    // Calculate expenses month-wise
    const monthlyExpenses = {};

    transactions
        .filter(
            (transaction) =>
                transaction.type === "expense"
        )
        .forEach((transaction) => {

            const month =
                transaction.date.slice(0, 7);

            monthlyExpenses[month] =
                (monthlyExpenses[month] || 0) +
                Number(transaction.amount);
        });

    const months =
        Object.keys(monthlyExpenses);

    // Average monthly spending
    const averageMonthlySpending =
        months.length > 0
            ? expenses / months.length
            : 0;

    // Find highest spending month
    let highestSpendingMonth = "No data";

    if (months.length > 0) {

        const highestMonth =
            months.reduce(
                (highest, month) =>
                    monthlyExpenses[month] >
                    monthlyExpenses[highest]
                        ? month
                        : highest
            );

        const [year, month] =
            highestMonth.split("-");

        const monthName =
            new Date(
                Number(year),
                Number(month) - 1
            ).toLocaleString(
                "en-IN",
                {
                    month: "long"
                }
            );

        highestSpendingMonth =
            `${monthName} ${year}`;
    }

    // Determine financial health
    let financialHealth =
        "Needs Attention";

    if (savingsRate >= 30) {
        financialHealth = "Excellent";
    } else if (savingsRate >= 20) {
        financialHealth = "Good";
    } else if (savingsRate >= 10) {
        financialHealth = "Fair";
    }

    return (
        <section className="mb-8">

            <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Financial Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                {/* Total Savings */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">
                        Total Savings
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-2">
                        ₹{savings.toLocaleString("en-IN")}
                    </p>
                </div>

                {/* Savings Rate */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">
                        Savings Rate
                    </p>

                    <p className="text-2xl font-bold text-blue-600 mt-2">
                        {savingsRate}%
                    </p>
                </div>

                {/* Average Monthly Spending */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">
                        Avg. Monthly Spending
                    </p>

                    <p className="text-2xl font-bold text-red-600 mt-2">
                        ₹{Math.round(
                            averageMonthlySpending
                        ).toLocaleString("en-IN")}
                    </p>
                </div>

                {/* Highest Spending Month */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">
                        Highest Spending Month
                    </p>

                    <p className="text-xl font-bold text-gray-900 mt-2">
                        {highestSpendingMonth}
                    </p>
                </div>

                {/* Financial Health */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                    <p className="text-sm text-gray-500">
                        Financial Health
                    </p>

                    <p
                        className={`text-xl font-bold mt-2 ${
                            financialHealth === "Excellent"
                                ? "text-green-600"
                                : financialHealth === "Good"
                                    ? "text-green-500"
                                    : financialHealth === "Fair"
                                        ? "text-yellow-600"
                                        : "text-red-600"
                        }`}
                    >
                        {financialHealth}
                    </p>
                </div>

            </div>

        </section>
    );
}

export default FinancialOverview;