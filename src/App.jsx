import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Product from "./pages/Product.jsx";
import Pricing from "./pages/Pricing.jsx";
import Homepage from "./pages/Homepage.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/AppLayout.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage/>}/>
                <Route path="product" element={<Product/>}/>
                <Route path="pricing" element={<Pricing/>}/>
                <Route path='login' element={<Login/>}/>
                <Route path='app' element={<AppLayout/>}>
                    <Route index element={<p>All Cities</p>}/>
                    <Route path='cities' element={<p>List of Cities</p>}/>
                    <Route path='countries' element={<p>Countries</p>}/>
                    <Route path='form' element={<p>Form</p>}/>
                </Route>
                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
}

