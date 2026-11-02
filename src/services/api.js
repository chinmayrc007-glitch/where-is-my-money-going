const API_URL =
    "https://where-is-my-money-going-api.onrender.com/api";


// ============================================================
// AUTH
// ============================================================
export async function registerUser(
    name,
    email,
    password
) {
    const response =
        await fetch(
            `${API_URL}/auth/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );
    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Registration failed"
        );
    }

    return data;
}

export async function loginUser(
    email,
    password
) {
    const response =
        await fetch(
            `${API_URL}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Login failed"
        );
    }

    return data;
}


export async function getCurrentUser(
    token
) {
    const response =
        await fetch(
            `${API_URL}/auth/me`,
            {
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Authentication failed"
        );
    }

    return data;
}


// ============================================================
// TRANSACTIONS
// ============================================================
export async function getTransactions(
    token
) {
    const response =
        await fetch(
            `${API_URL}/transactions`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch transactions"
        );
    }

    return data;
}

export async function createTransaction(
    token,
    transaction
) {
    const response =
        await fetch(
            `${API_URL}/transactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization:
                        `Bearer ${token}`
                },
                body: JSON.stringify(
                    transaction
                )
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to create transaction"
        );
    }

    return data;
}

export async function updateTransaction(
    token,
    id,
    transaction
) {
    const response =
        await fetch(
            `${API_URL}/transactions/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization:
                        `Bearer ${token}`
                },
                body: JSON.stringify(
                    transaction
                )
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update transaction"
        );
    }

    return data;
}

export async function deleteTransaction(
    token,
    id
) {
    const response =
        await fetch(
            `${API_URL}/transactions/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to delete transaction"
        );
    }

    return data;
}


// ============================================================
// BUDGETS
// ============================================================
export async function getBudget(
    token,
    month
) {
    const response =
        await fetch(
            `${API_URL}/budgets?month=${month}`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch budget"
        );
    }

    return data;
}

export async function setBudget(
    token,
    month,
    amount
) {
    const response =
        await fetch(
            `${API_URL}/budgets`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization:
                        `Bearer ${token}`
                },
                body: JSON.stringify({
                    month,
                    amount
                })
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to save budget"
        );
    }

    return data;
}

export async function deleteBudget(
    token,
    month
) {
    const response =
        await fetch(
            `${API_URL}/budgets?month=${month}`,
            {
                method: "DELETE",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to delete budget"
        );
    }

    return data;
}


// ============================================================
// RECURRING TRANSACTIONS
// ============================================================
export async function getRecurringTransactions(
    token
) {
    const response =
        await fetch(
            `${API_URL}/recurring`,
            {
                method: "GET",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to fetch recurring transactions"
        );
    }

    return data;
}

export async function createRecurringTransaction(
    token,
    recurring
) {
    const response =
        await fetch(
            `${API_URL}/recurring`,
            {
                method: "POST",
                headers: {
                    "Content-Type":
                        "application/json",
                    Authorization:
                        `Bearer ${token}`
                },
                body: JSON.stringify(
                    recurring
                )
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to create recurring transaction"
        );
    }

    return data;
}

export async function processRecurringTransactions(
    token
) {
    const response =
        await fetch(
            `${API_URL}/recurring/process`,
            {
                method: "POST",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to process recurring transactions"
        );
    }

    return data;
}

export async function toggleRecurringTransaction(
    token,
    id
) {
    const response =
        await fetch(
            `${API_URL}/recurring/${id}/toggle`,
            {
                method: "PUT",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to update recurring transaction"
        );
    }

    return data;
}

export async function deleteRecurringTransaction(
    token,
    id
) {
    const response =
        await fetch(
            `${API_URL}/recurring/${id}`,
            {
                method: "DELETE",
                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

    const data =
        await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to delete recurring transaction"
        );
    }

    return data;
}


// ============================================================
// EXPORT
// ============================================================
export {
    API_URL
};