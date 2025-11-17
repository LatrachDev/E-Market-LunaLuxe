import React, { useState } from 'react';
import AdminSidebar from '../../components/Admin/Layouts/AdminSidebar';
import UserManagement from '../../components/Admin/UserManagement';

const navLinks = [
  { id: 'overview', label: 'Dashboard Overview', icon: '🏠' },
  { id: 'reports', label: 'Reports & Analytics', icon: '📊' },
  { id: 'products', label: 'Product Management', icon: '🛍️' },
  { id: 'categories', label: 'Category Management', icon: '🗂️' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'feedback', label: 'Feedback Management', icon: '�' },
];

const sectionHeaders = {
  overview: {
    title: 'Admin Dashboard Overview',
    subtitle: 'Stay on top of your community, catalogue, and revenue drivers with curated metrics and quick actions.',
  },
  reports: {
    title: 'Reports & Analytics',
    subtitle: 'Analyse revenue, order health, and campaign performance with ready-to-export insights.',
  },
  products: {
    title: 'Product Management',
    subtitle: 'Maintain catalogue accuracy, pricing, and merchandising priorities for both clients and professionals.',
  },
  categories: {
    title: 'Category Management',
    subtitle: 'Shape the browsing experience and ensure all product lines remain aligned with brand strategy.',
  },
  users: {
    title: 'User Management',
    subtitle: 'Approve professional partners, support shoppers, and manage account access in one place.',
  },
  feedback: {
    title: 'Feedback Management',
    subtitle: 'Manage feedback from users and professionals.',
  },
};

function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');

  const currentHeader = sectionHeaders[activeSection];

  const renderSection = () => {
    switch (activeSection) {
      case 'reports':
        return (
          <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold font-playfair text-gray-900 mb-4">
              Reports & Analytics
            </h2>
            <p className="text-sm font-montserrat text-gray-600">
              Reports section content will be displayed here.
            </p>
          </div>
        );

      case 'products':
        return (
          <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold font-playfair text-gray-900 mb-4">
              Product Management
            </h2>
            <p className="text-sm font-montserrat text-gray-600">
              Product management content will be displayed here.
            </p>
          </div>
        );

      case 'categories':
        return (
          <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold font-playfair text-gray-900 mb-4">
              Category Management
            </h2>
            <p className="text-sm font-montserrat text-gray-600">
              Category management content will be displayed here.
            </p>
          </div>
        );

      case 'users':
        return <UserManagement />

      case 'overview':
      default:
        return (
          <div className="rounded-3xl border border-brandRed/10 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold font-playfair text-gray-900 mb-4">
              Dashboard Overview
            </h2>
            <p className="text-sm font-montserrat text-gray-600">
              Dashboard overview content will be displayed here.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#fef7f5] via-white to-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AdminSidebar
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

export default AdminDashboard;
