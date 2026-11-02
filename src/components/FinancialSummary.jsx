function FinancialSummary({ income, expenses, balance }) {
    return (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">
                    Current Balance
                </p>

                <h2 className={`text-3xl font-bold mt-2 ${
                    balance >= 0
                        ? "text-gray-900"
                        : "text-red-600"
                }`}>
                    ₹{balance.toLocaleString("en-IN")}
                </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">
                    Total Income
                </p>

                <h2 className="text-3xl font-bold text-green-600 mt-2">
                    ₹{income.toLocaleString("en-IN")}
                </h2>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <p className="text-sm text-gray-500">
                    Total Expenses
                </p>

                <h2 className="text-3xl font-bold text-red-600 mt-2">
                    ₹{expenses.toLocaleString("en-IN")}
                </h2>
            </div>

        </section>
    );
}

export default FinancialSummary;