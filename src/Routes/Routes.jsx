import { Routes, Route } from "react-router-dom";
import IndexPage from "../pages/Index/IndexPage";
import ProductDetails from "../pages/Products/ProductDetails";
import NotFound from "../pages/Error/NotFound";
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import ClientDashboard from "../pages/Client/ClientDashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Layout from "../components/Layouts/Layout";
import ProfilePage from "../pages/Client/ProfilePage";

export default function RoutesList() {



    return (
        <Routes>

            <Route path="/" element={<Layout><IndexPage /></Layout>} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            <Route path="/client">
                <Route index element={<ProtectedRoute><Layout><ClientDashboard /></Layout></ProtectedRoute>} />
                <Route path="profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            
            {/* Error Routes */}
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    )
}