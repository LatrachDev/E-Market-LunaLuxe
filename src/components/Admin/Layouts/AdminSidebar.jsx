import React from 'react';
import { NavLink } from 'react-router-dom';

export default function AdminSidebar({ navLinks }) {
  return (
    <aside className="relative w-full bg-white shadow-sm lg:sticky lg:top-0 lg:h-screen lg:max-h-screen lg:w-72 lg:overflow-y-auto">
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-br from-brandRed via-[#c35a4c] to-[#f0d6d1] opacity-90" aria-hidden="true" />
      <div className="relative px-6 pt-10 text-white">
        <p className="text-xl font-montserrat text-center uppercase tracking-[0.3em] text-white/80">
          LunaLuxe
        </p>
      </div>

      <nav className="relative border-t border-white/10 px-3 py-6 lg:mt-10">
        <ul className="space-y-2">
          {navLinks.map((link) => (
            <li key={link.id}>
              <NavLink
                to={link.path}
                end={link.path === '/admin'}
                className={({ isActive }) =>
                  `group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium font-montserrat transition ${
                    isActive
                      ? 'bg-brandRed text-white shadow-md'
                      : 'text-gray-700 hover:bg-brandRed/10 hover:text-brandRed'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                          isActive ? 'bg-white/20 text-white' : 'bg-brandRed/10 text-brandRed'
                        }`}
                      >
                        {link.icon}
                      </span>
                      {link.label}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`text-sm transition ${
                        isActive ? 'translate-x-1 opacity-100' : 'opacity-60 group-hover:translate-x-1 group-hover:opacity-100'
                      }`}
                    >
                      →
                    </span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative hidden border-t border-white/10 mt-5 px-6 py-6 lg:block">
        <p className="text-xs font-montserrat uppercase tracking-wide text-gray-500">
          Need Assistance?
        </p>
        <p className="mt-2 text-sm font-montserrat text-gray-600">
          Contact the support team or review the latest operation handbook.
        </p>
        <button
          className="mt-4 cursor-pointer w-full rounded-lg bg-brandRed px-4 py-2 text-sm font-semibold font-montserrat text-white transition hover:bg-hoverBrandRed"
        >
          Contact Support
        </button>

        <button
          className="mt-2 w-full cursor-pointer rounded-lg bg-brandRed px-4 py-2 text-sm font-semibold font-montserrat text-white transition hover:bg-hoverBrandRed"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}

