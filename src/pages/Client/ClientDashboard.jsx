import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar";
import Products from "../../components/Client/Products";
import MyOrders from "../../pages/Client/MyOrders";    

export default function ClientDashboard() {
    return (
        <div>
            <Products />
            {/* <MyOrders /> */}
            <Outlet />
        </div>
    );
}