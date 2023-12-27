import {createContext, useContext, useEffect, useState} from "react";

const BASE_URL = 'http://localhost:8000';
const CitiesContext = createContext(undefined);

// data to be available to the entire application
function CitiesProvider({children}) {

    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    // retrieve cities from api
    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCities();
    }, []);

    // retrieve specific city based on id
    async function getCity(id) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            setCities(cities => [...cities, data])
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }

    return (

        <CitiesContext.Provider value={{
            cities,
            isLoading,
            currentCity,
            getCity,
            createCity
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