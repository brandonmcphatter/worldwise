import './App.css'
import {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";
import CityList from "./components/CityList.jsx";
import CountryList from "./components/CountryList.jsx";

const BASE_URL = 'http://localhost:8000';

export default function App() {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
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
        } fetchCities().then(r => console.log(r));
    }, []);

        return (
            <BrowserRouter>
                <Routes>
                    <Route index element={<Homepage/>}/>
                    <Route path="product" element={<Product/>}/>
                    <Route path="pricing" element={<Pricing/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='app' element={<AppLayout/>}>
                        <Route index element={<CityList cities={cities}
                                                        isLoading={isLoading}
                        />}/>
                        <Route path='cities' element={<CityList cities={cities}
                                                                isLoading={isLoading}/>}/>
                        <Route path='countries' element={<CountryList cities={cities}
                                                                      isLoading={isLoading}
                        />}/>
                        <Route path='form' element={<p>Form</p>}/>
                    </Route>
                    <Route path="*" element={<PageNotFound/>}/>
                </Routes>
            </BrowserRouter>
        )
    }

