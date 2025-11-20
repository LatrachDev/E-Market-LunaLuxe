import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import SellerSidebar from '../../components/Seller/Layouts/SellerSidebar';
import MyProducts from '../../components/Seller/MyProducts';
import Orders from '../../components/Seller/Orders';
import CouponManagement from '../../components/Seller/CouponManagement';
import SellerStatsPage from '../../components/Seller/SellerStatsPage';

const navLinks = [
  { id: 'overview', label: 'Dashboard Overview', icon: '🏠' },
  { id: 'my-products', label: 'My Products', icon: '🛍️' },
  { id: 'orders', label: 'Orders', icon: '📦' },
  { id: 'coupon-management', label: 'Manage Coupons', icon: '🎫' },
];

const sectionHeaders = {
  overview: {
    title: 'Seller Dashboard Overview',
    subtitle: 'Monitor your products, orders, and revenue with real-time insights and quick actions.',
  },
  'my-products': {
    title: 'My Products',
    subtitle: 'View and manage all your listed products in one place.',
  },
  orders: {
    title: 'Orders',
    subtitle: 'Track all orders for your products with detailed customer information.',
  },
  'coupon-management': {
    title: 'Coupon Management',
    subtitle: 'Create and manage discount coupons for your products.',
  },
};

function SellerPage() {
  const { sellerId } = useParams();
  const [activeSection, setActiveSection] = useState('overview');

  const currentHeader = sectionHeaders[activeSection];

  const renderSection = () => {
    switch (activeSection) {
      case 'my-products':
        return <MyProducts sellerId={sellerId} />;

      case 'orders':
        return <Orders />;

      case 'coupon-management':
        return <CouponManagement />;

      case 'overview':
      default:
        return <SellerStatsPage />;
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#fef7f5] via-white to-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <SellerSidebar
          navLinks={navLinks}
          activeSection={activeSection}
          onSelect={setActiveSection}
        />

        <main className="flex-1 lg:max-h-screen lg:overflow-y-auto">
          <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-10">
            <div className="mb-4">
              <h1 className="text-3xl font-semibold font-playfair text-gray-900 mb-2">
                {currentHeader.title}
              </h1>
              <p className="text-sm font-montserrat text-gray-600">
                {currentHeader.subtitle}
              </p>
            </div>

            <section className="space-y-10">
              {renderSection()}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default SellerPage;

