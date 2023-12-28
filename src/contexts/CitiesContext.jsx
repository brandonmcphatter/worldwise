import {createContext, useContext, useEffect, useReducer} from "react";

const BASE_URL = 'http://localhost:8000';

const CitiesContext = createContext(undefined);
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: ""
}

function reducer(state, action) {
    switch (action.type) {
        case 'loading':
            return {
                ...state,
                isLoading: true
            };
        case 'cities/loaded':
            return {
                ...state,
                isLoading: false,
                cities: action.payload
            };
        case 'city/loaded':
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload
            };
        case 'city/created':
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload
            };
        case 'cities/deleted':
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(city => city.id !== action.payload),
                currentCity: {}
            };
        case 'rejected':
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);

    }
}

// data to be available to the entire application
function CitiesProvider({children}) {
    const [{cities, isLoading, currentCity, error}, dispatch] = useReducer(reducer, initialState, undefined);
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    // retrieve all cities from API
    useEffect(() => {
        async function fetchCities() {
            dispatch({type: 'loading'});
            try {
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                dispatch({type: 'cities/loaded', payload: data});
            } catch {
                dispatch({type: 'rejected', payload: "Couldn't load cities"});
            }
        }

        fetchCities();
    }, []);

    // retrieve specific city based on id
    async function getCity(id) {
        if (Number(id) === currentCity.id) return;

        dispatch({type: 'loading'});
        try {
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            dispatch({type: 'city/loaded', payload: data});
        } catch {
            dispatch({type: 'rejected', payload: "Couldn't load city"});
        }
    }

    // create new city + add to cities array
    async function createCity(newCity) {
        dispatch({type: 'loading'});
        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            dispatch({type: 'city/created', payload: data});
        } catch {
            dispatch({type: 'rejected', payload: "Couldn't create city"});
        }
    }

    // delete city + remove from cities array
    async function deleteCity(id) {
        dispatch({type: 'loading'});
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({type: 'cities/deleted', payload: id});
        } catch {
            dispatch({type: 'rejected', payload: "Couldn't delete city"});
        }
    }

    return (

        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            error,
            getCity,
            createCity,
            deleteCity
        }}>
            {children}
        </CitiesContext.Provider>

    )
}

// custom hook to consume context
function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) throw new Error('useCities must be used within a CitiesProvider');
    return context;
}

export {CitiesProvider, useCities};