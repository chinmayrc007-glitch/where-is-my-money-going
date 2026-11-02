import { useState } from "react";


function TransactionForm({
    onAdd,
    onCancel
}) {
    const [description, setDescription] =
        useState("");

    const [amount, setAmount] =
        useState("");

    const [type, setType] =
        useState("expense");

    const [category, setCategory] =
        useState("Food");

    const [date, setDate] =
        useState(
            new Date()
                .toISOString()
                .split("T")[0]
        );


    // =========================
    // SUBMIT
    // =========================

    function handleSubmit(event) {
        event.preventDefault();

        if (
            !description.trim() ||
            !amount ||
            Number(amount) <= 0 ||
            !date
        ) {
            return;
        }

        const transaction = {
            description:
                description.trim(),

            amount:
                Number(amount),

            type,

            category,

            date
        };

        onAdd(transaction);

        // Reset form

        setDescription("");
        setAmount("");
        setType("expense");
        setCategory("Food");

        setDate(
            new Date()
                .toISOString()
                .split("T")[0]
        );
    }


    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >

            <h2 className="text-xl font-semibold text-gray-800 mb-5">
                Add Transaction
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Description */}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description
                    </label>

                    <input
                        type="text"
                        value={description}
                        onChange={(event) =>
                            setDescription(
                                event.target.value
                            )
                        }
                        placeholder="e.g. Lunch"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>


                {/* Amount */}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Amount
                    </label>

                    <input
                        type="number"
                        value={amount}
                        onChange={(event) =>
                            setAmount(
                                event.target.value
                            )
                        }
                        placeholder="e.g. 250"
                        min="0"
                        step="0.01"
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>


                {/* Type */}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type
                    </label>

                    <select
                        value={type}
                        onChange={(event) =>
                            setType(
                                event.target.value
                            )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="expense">
                            Expense
                        </option>

                        <option value="income">
                            Income
                        </option>
                    </select>
                </div>


                {/* Category */}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                    </label>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(
                                event.target.value
                            )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="Food">
                            Food
                        </option>

                        <option value="Transport">
                            Transport
                        </option>

                        <option value="Shopping">
                            Shopping
                        </option>

                        <option value="Bills">
                            Bills
                        </option>

                        <option value="Entertainment">
                            Entertainment
                        </option>

                        <option value="Education">
                            Education
                        </option>

                        <option value="Health">
                            Health
                        </option>

                        <option value="Salary">
                            Salary
                        </option>

                        <option value="Freelance">
                            Freelance
                        </option>

                        <option value="Other">
                            Other
                        </option>
                    </select>
                </div>


                {/* Date */}

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date
                    </label>

                    <input
                        type="date"
                        value={date}
                        onChange={(event) =>
                            setDate(
                                event.target.value
                            )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:ring-2 focus:ring-black"
                        required
                    />
                </div>

            </div>


            {/* Buttons */}

            <div className="flex gap-3 mt-6">

                <button
                    type="submit"
                    className="px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Add Transaction
                </button>

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                )}

            </div>

        </form>
    );
}


export default TransactionForm;