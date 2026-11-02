import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import {
    Doughnut,
    Bar
} from "react-chartjs-2";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);


function Analytics({
    transactions
}) {

    const expenseTransactions =
        transactions.filter(
            (transaction) =>
                transaction.type ===
                "expense"
        );


    const categories = [
        "Food",
        "Transport",
        "Shopping",
        "Bills",
        "Entertainment",
        "Education",
        "Health",
        "Other"
    ];


    const categoryTotals =
        categories.map(
            (category) =>
                expenseTransactions
                    .filter(
                        (transaction) =>
                            transaction.category ===
                            category
                    )
                    .reduce(
                        (total, transaction) =>
                            total +
                            Number(
                                transaction.amount
                            ),
                        0
                    )
        );


    const totalIncome =
        transactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    "income"
            )
            .reduce(
                (total, transaction) =>
                    total +
                    Number(
                        transaction.amount
                    ),
                0
            );


    const totalExpenses =
        transactions
            .filter(
                (transaction) =>
                    transaction.type ===
                    "expense"
            )
            .reduce(
                (total, transaction) =>
                    total +
                    Number(
                        transaction.amount
                    ),
                0
            );


    const doughnutData = {
        labels: categories,

        datasets: [
            {
                label: "Expenses",
                data: categoryTotals,
                borderWidth: 1
            }
        ]
    };


    const barData = {
        labels: [
            "Income",
            "Expenses"
        ],

        datasets: [
            {
                label: "Amount",

                data: [
                    totalIncome,
                    totalExpenses
                ],

                borderWidth: 1
            }
        ]
    };


    return (
        <section className="mb-8">

            <h2 className="text-xl font-semibold text-gray-900 mb-5">
                Financial Analytics
            </h2>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                    <h3 className="font-semibold text-gray-900 mb-5">
                        Spending by Category
                    </h3>


                    {totalExpenses === 0 ? (

                        <div className="h-64 flex items-center justify-center">

                            <p className="text-gray-500">
                                No expense data available.
                            </p>

                        </div>

                    ) : (

                        <div className="max-w-sm mx-auto">

                            <Doughnut
                                data={
                                    doughnutData
                                }

                                options={{
                                    responsive:
                                        true,

                                    maintainAspectRatio:
                                        true
                                }}
                            />

                        </div>
                    )}

                </div>


                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                    <h3 className="font-semibold text-gray-900 mb-5">
                        Income vs Expenses
                    </h3>


                    <Bar
                        data={barData}
                        options={{
                            responsive: true,

                            plugins: {
                                legend: {
                                    display: false
                                }
                            },

                            scales: {
                                y: {
                                    beginAtZero:
                                        true
                                }
                            }
                        }}
                    />

                </div>

            </div>

        </section>
    );
}


export default Analytics;