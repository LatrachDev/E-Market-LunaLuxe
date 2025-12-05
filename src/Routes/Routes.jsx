import { Routes, Route } from "react-router-dom";
import { lazy, Suspense, memo } from "react";
import Layout from "../components/Layout";
import ProtectedRoute from "./ProtectedRoute";

// Lazy load page components
const IndexPage = lazy(() => import("../pages/Index/IndexPage"));
const ProductDetails = lazy(() => import("../pages/Products/ProductDetails"));
const LoginPage = lazy(() => import("../pages/Auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/Auth/SignupPage"));
const ClientDashboard = lazy(() => import("../pages/Client/ClientDashboard"));
import SellerPage from "../pages/Seller/SellerPage";
const AdminDashboard = lazy(() => import("../pages/Admin/AdminDashboard"));
const NotFound = lazy(() => import("../pages/Error/NotFound"));
const ProfilePage = lazy(() => import("../pages/Client/ProfilePage"));
const AdminOverview = lazy(() => import("../pages/Admin/AdminOverview"));
const AdminReports = lazy(() => import("../pages/Admin/AdminReports"));
const AdminProducts = lazy(() => import("../pages/Admin/AdminProducts"));
const AdminProductDetails = lazy(() => import("../pages/Admin/AdminProductDetails"));
const AdminCategories = lazy(() => import("../pages/Admin/AdminCategories"));
const AdminUsers = lazy(() => import("../components/Admin/UserManagement"));
const FeedbackPage = lazy(() => import("../pages/Admin/FeedbackPage"));
const AdminCoupons = lazy(() => import("../pages/Admin/AdminCoupons"));
const Order = lazy(() => import("../components/Client/Order"));
const Orders = lazy(() => import("../components/Admin/Orders"));
const OrdersPage = lazy(() => import("../pages/Admin/OrdersPage"));
const MyOrders = lazy(() => import("../pages/Client/MyOrders"));
const CreateOrder = lazy(() => import("../components/Client/createOrder"));
const DeletedOrdersPage = lazy(() => import("../pages/Admin/DeletedOrdersPage"));
const Cart = lazy(() => import("../components/Client/Cart"));
const OrderDetails = lazy(() => import("../components/Client/OrderDetails"));

// Loading fallback component
const LoadingFallback = memo(() => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-brandRed border-r-transparent"></div>
      <p className="mt-4 text-lg font-montserrat text-gray-600">Loading...</p>
    </div>
  </div>
));

export default function RoutesList() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<Layout><IndexPage /></Layout>} />
        {/* <Route path="/products" element={<ProductsPage />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />

        <Route path="/client">
          <Route index element={<ProtectedRoute requiredRole="user"><Layout><ClientDashboard /></Layout></ProtectedRoute>} />
          <Route path="profile" element={<ProtectedRoute requiredRole="user"><Layout><ProfilePage /></Layout></ProtectedRoute>} />
          <Route path="myOrders" element={<ProtectedRoute requiredRole="user"><Layout><MyOrders /></Layout></ProtectedRoute>}/>
          <Route path="createOrder" element={<ProtectedRoute requiredRole={"user"}><Layout><CreateOrder /></Layout></ProtectedRoute>}/>
          <Route path="orders/:id" element={<ProtectedRoute requiredRole={"user"}><Layout><OrderDetails /></Layout></ProtectedRoute>} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>}>
          <Route index element={<AdminOverview />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="products/:id" element={<AdminProductDetails />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="coupons" element={<AdminCoupons />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="orders/deleted" element={<DeletedOrdersPage />} />
        </Route>

        {/* Seller Routes */}
        <Route path="/seller/:sellerId?" element={<ProtectedRoute requiredRole="seller"><SellerPage /></ProtectedRoute>} />
        
        {/* Error Routes */}
        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}