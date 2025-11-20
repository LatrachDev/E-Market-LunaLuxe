import React from "react";
import OrdersDeleted from "../../components/Admin/OrdersDeleted";
import AdminSidebar from "../../components/Admin/Layouts/AdminSidebar";
import adminNavLinks from "../../constants/adminNavLinks";

export default function OrdersPage() {
  return (
    <div className="flex bg-[#fef7f5]">
      
      {/* Sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar navLinks={adminNavLinks} />
      </div>

      {/* Mobile Sidebar (optional) */}
      <div className="block lg:hidden">
        <AdminSidebar navLinks={adminNavLinks} />
      </div>

      {/* Main content */}
      <div className="flex justify-center items-center  ">
        <OrdersDeleted />
      </div>
    </div>
  );
}
