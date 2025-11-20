import React from 'react';

const workflows = [
  {
    title: 'Bulk price adjustments',
    description: 'Schedule coordinated price updates across priority SKUs.',
    cta: 'Open pricing tool',
  },
  {
    title: 'Catalogue QA queue',
    description: 'Resolve imagery, description, and compliance issues.',
    cta: 'Review issues',
  },
  {
    title: 'Launch new collection',
    description: 'Upload assets, assign categories, and set launch windows.',
    cta: 'Start launch wizard',
  },
];

export default function AdminProducts() {
  return (
    <div className="flex flex-col gap-10">
      <header>
        <p className="text-sm font-montserrat uppercase tracking-widest text-brandRed">
          Product Management
        </p>
        <h1 className="mt-2 text-3xl font-playfair font-semibold text-gray-900">
          Keep the catalogue fresh
        </h1>
        <p className="mt-2 text-sm font-montserrat text-gray-600">
          Govern pricing, launch plans, and merchandising tasks without leaving this workspace.
        </p>
      </header>

      <section className="rounded-3xl border border-brandRed/10 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-playfair font-semibold text-gray-900">Actionable Workflows</h2>
        <div className="mt-6 space-y-5">
          {workflows.map((workflow) => (
            <article
              key={workflow.title}
              className="rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-4"
            >
              <p className="text-sm font-semibold text-gray-900">{workflow.title}</p>
              <p className="text-sm font-montserrat text-gray-600">{workflow.description}</p>
              <button className="mt-3 rounded-full border border-brandRed px-4 py-1 text-xs font-semibold font-montserrat text-brandRed transition hover:bg-brandRed hover:text-white">
                {workflow.cta}
              </button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

