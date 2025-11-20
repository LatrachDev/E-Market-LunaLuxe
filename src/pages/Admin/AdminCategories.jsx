import React from 'react';

const categoryHealth = [
  { name: 'Skincare', coverage: '92%', gaps: 4 },
  { name: 'Makeup', coverage: '88%', gaps: 7 },
  { name: 'Fragrances', coverage: '76%', gaps: 11 },
  { name: 'Body Care', coverage: '81%', gaps: 6 },
];

export default function AdminCategories() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <p className="text-sm font-montserrat uppercase tracking-widest text-brandRed">
          Category Management
        </p>
        <h1 className="mt-2 text-3xl font-playfair font-semibold text-gray-900">
          Curate the browsing experience
        </h1>
        <p className="mt-2 text-sm font-montserrat text-gray-600">
          Balance assortment depth, navigation clarity, and promotional focus per category.
        </p>
      </header>

      <section className="rounded-3xl border border-brandRed/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-playfair font-semibold text-gray-900">Category Coverage</h2>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 text-left text-sm font-montserrat">
            <thead>
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-500">Category</th>
                <th className="px-4 py-3 font-semibold text-gray-500">Coverage</th>
                <th className="px-4 py-3 font-semibold text-gray-500">Open Gaps</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categoryHealth.map((row) => (
                <tr key={row.name} className="text-gray-700">
                  <td className="px-4 py-3 font-semibold text-gray-900">{row.name}</td>
                  <td className="px-4 py-3">{row.coverage}</td>
                  <td className="px-4 py-3">{row.gaps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

