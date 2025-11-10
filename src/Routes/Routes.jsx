import { Routes, Route } from "react-router-dom";
import IndexPage from "../pages/Index/IndexPage";
import ProductsPage from "../pages/Products/ProductsPage";
import NotFound from "../pages/Error/NotFound";
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';

export default function RoutesList() {
    return (
        <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path={'*'} element={<NotFound />} />
        </Routes>
    )
}