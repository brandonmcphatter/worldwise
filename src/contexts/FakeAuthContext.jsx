import {createContext, useContext, useReducer} from "react";
import user from "../components/User.jsx";

// created context
const AuthContext = createContext(undefined);

// initial state for reducer
const initialState = {
    user: null,
    isAuthenticated: false
}

// reducer functionality for login and logout
function reducer(state, action) {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true
            }
        case 'logout':
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// fake user data
const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

// provider for authentication throughout app
function AuthProvider({children}) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState, undefined);

    function login(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: 'login', payload: FAKE_USER})
        }
    }

    function logout() {
        dispatch({type: 'logout'});
    }

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

// custom hook to use authentication
function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}

export {AuthProvider, useAuth};