import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

const AuthContext = createContext();

const API_URL = "https://where-is-my-money-going-api.onrender.com/api";


export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const token =
            localStorage.getItem("token");

        if (!token) {
            setLoading(false);
            return;
        }

        fetch(`${API_URL}/auth/me`, {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        })
            .then(async (response) => {

                if (!response.ok) {
                    throw new Error(
                        "Invalid token"
                    );
                }

                return response.json();
            })
            .then((data) => {

                setUser(data.user);

            })
            .catch(() => {

                localStorage.removeItem("token");
                setUser(null);

            })
            .finally(() => {

                setLoading(false);

            });

    }, []);


    async function register(
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
                data.message
            );
        }

        localStorage.setItem(
            "token",
            data.token
        );

        setUser(data.user);
    }


    async function login(
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
                data.message
            );
        }

        localStorage.setItem(
            "token",
            data.token
        );

        setUser(data.user);
    }


    function logout() {

        localStorage.removeItem(
            "token"
        );

        setUser(null);
    }


    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                register,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {

    return useContext(
        AuthContext
    );
}