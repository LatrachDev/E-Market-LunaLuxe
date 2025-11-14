import { Outlet } from "react-router-dom";
import NavBar from "../../components/Layouts/NavBar";
import Products from "../../components/Client/Products";

export default function ClientDashboard() {
    return (
        <div>
            <Products />
            <Outlet />
        </div>
    );
}