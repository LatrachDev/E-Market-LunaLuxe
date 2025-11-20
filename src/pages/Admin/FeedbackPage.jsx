import React, { useMemo, useState } from 'react';

const mockProducts = [
  {
    id: 'prd-001',
    name: 'Velvet Glow Serum',
    sku: 'VG-2024',
    category: 'Skincare',
    seller: 'Luna Labs Collective',
    feedbacks: [
      {
        id: 'fb-101',
        customer: 'Maria M.',
        rating: 5,
        title: 'Holy grail serum',
        comment: 'Leaves my skin hydrated all day without feeling greasy.',
        createdAt: '2025-11-16 09:33',
        channel: 'Marketplace',
      },
      {
        id: 'fb-102',
        customer: 'Aisha K.',
        rating: 4,
        title: 'Lovely glow',
        comment: 'Great scent and packaging. Wish it absorbed a bit faster.',
        createdAt: '2025-11-13 14:20',
        channel: 'Loyalty App',
      },
      {
        id: 'fb-103',
        customer: 'Claire B.',
        rating: 3,
        title: 'Needs reformulation',
        comment: 'Caused slight irritation around my eyes.',
        createdAt: '2025-11-09 17:52',
        channel: 'Support Ticket',
      },
    ],
  },
  {
    id: 'prd-002',
    name: 'Luna Silk Cleanser',
    sku: 'LS-881',
    category: 'Cleansers',
    seller: 'House of Aurora',
    feedbacks: [
      {
        id: 'fb-201',
        customer: 'Noor S.',
        rating: 5,
        title: 'Gentle yet effective',
        comment: 'Removes make-up without stripping moisture. Love it!',
        createdAt: '2025-11-15 21:05',
        channel: 'Client App',
      },
      {
        id: 'fb-202',
        customer: 'Valerie D.',
        rating: 4,
        title: 'Solid staple',
        comment: 'Does the job. Would love a fragrance-free option.',
        createdAt: '2025-11-11 11:47',
        channel: 'Marketplace',
      },
      {
        id: 'fb-203',
        customer: 'Sophia G.',
        rating: 3,
        title: 'Leaves residue',
        comment: 'Takes a double rinse to get everything off.',
        createdAt: '2025-11-08 08:15',
        channel: 'Live Chat',
      },
    ],
  },
  {
    id: 'prd-003',
    name: 'Aurora Night Cream',
    sku: 'AN-552',
    category: 'Moisturizers',
    seller: 'Midnight Apothecary',
    feedbacks: [
      {
        id: 'fb-301',
        customer: 'Nadia P.',
        rating: 2,
        title: 'Heavy texture',
        comment: 'Feels too rich for combo skin and caused breakouts.',
        createdAt: '2025-11-18 22:44',
        channel: 'Marketplace',
      },
      {
        id: 'fb-302',
        customer: 'Lily F.',
        rating: 5,
        title: 'Spa in a jar',
        comment: 'Best night cream. I wake up glowing every morning.',
        createdAt: '2025-11-14 07:30',
        channel: 'Client App',
      },
    ],
  },
];

const FeedbackPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [selectedProductId, setSelectedProductId] = useState(mockProducts[0]?.id ?? null);
  const [searchTerm, setSearchTerm] = useState('');

  const selectedProduct = useMemo(
    () => products.find((product) => product.id === selectedProductId) ?? null,
    [products, selectedProductId],
  );

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [products, searchTerm]);

  const handleDeleteFeedback = (productId, feedbackId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id !== productId) return product;
        const updatedFeedbacks = product.feedbacks.filter((feedback) => feedback.id !== feedbackId);
        return {
          ...product,
          feedbacks: updatedFeedbacks,
        };
      }),
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <header>
        <p className="text-sm font-montserrat uppercase tracking-widest text-brandRed">
          Feedback Control Center
        </p>
        <h1 className="mt-2 text-3xl font-playfair font-semibold text-gray-900">
          Product Sentiment & Quality Signals
        </h1>
        <p className="mt-2 text-sm font-montserrat text-gray-600">
          Track product health, surface urgent feedback, and triage responses with one click.
        </p>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.3fr_minmax(0,1fr)]">
        <div className="rounded-3xl border border-brandRed/10 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold font-playfair text-gray-900">
                Product Feedback Streams
              </h2>
              <p className="text-sm font-montserrat text-gray-500">
                Click a row to inspect detailed feedback threads.
              </p>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by product or SKU"
              className="w-full rounded-2xl border border-gray-200 px-4 py-2 text-sm font-montserrat text-gray-700 placeholder:text-gray-400 focus:border-brandRed focus:outline-none focus:ring-1 focus:ring-brandRed sm:w-64"
            />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 text-left text-sm font-montserrat">
              <thead>
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-500">
                    Product
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-500">
                    Category
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-500">
                    Seller
                  </th>
                  <th className="whitespace-nowrap px-4 py-3 font-semibold text-gray-500">
                    Feedback Count
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const isActive = product.id === selectedProductId;
                  return (
                    <tr
                      key={product.id}
                      className={`cursor-pointer transition ${
                        isActive ? 'bg-brandRed/5 text-brandRed' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedProductId(product.id)}
                    >
                      <td className="px-4 py-3 font-semibold">
                        <span className="text-xs uppercase tracking-wide text-gray-400">{product.sku}</span>
                        <p className="text-sm text-gray-900">{product.name}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-500">{product.category}</td>
                      <td className="px-4 py-3 text-gray-500">{product.seller}</td>
                      <td className="px-4 py-3 text-gray-500">{product.feedbacks.length}</td>
                    </tr>
                  );
                })}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-6 text-center text-sm font-montserrat text-gray-400"
                    >
                      No products match this search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-brandRed/10 bg-white p-6 shadow-sm">
          {selectedProduct ? (
            <>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-montserrat uppercase tracking-wide text-brandRed">
                    Selected Product
                  </p>
                  <h2 className="text-2xl font-playfair font-semibold text-gray-900">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-sm font-montserrat text-gray-500">
                    SKU {selectedProduct.sku} · {selectedProduct.category}
                  </p>
                </div>
                <span className="rounded-full bg-brandRed/10 px-3 py-1 text-xs font-semibold font-montserrat text-brandRed">
                  {selectedProduct.feedbacks.length} feedback
                  {selectedProduct.feedbacks.length !== 1 && 's'}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {selectedProduct.feedbacks.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-gray-200 px-4 py-6 text-center">
                    <p className="text-sm font-montserrat text-gray-500">
                      No feedback entries remain for this product.
                    </p>
                  </div>
                )}

                {selectedProduct.feedbacks.map((feedback) => (
                  <article
                    key={feedback.id}
                    className="rounded-2xl border border-gray-100 bg-gray-50/80 px-4 py-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {feedback.title}
                        </p>
                        <p className="text-xs font-montserrat text-gray-500">
                          {feedback.customer} · {feedback.channel}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700">
                        {feedback.rating}★
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-montserrat text-gray-600">
                      {feedback.comment}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs font-montserrat text-gray-400">
                        {feedback.createdAt}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleDeleteFeedback(selectedProduct.id, feedback.id)}
                        className="rounded-full border border-brandRed px-4 py-1 text-xs font-semibold font-montserrat text-brandRed transition hover:bg-brandRed hover:text-white"
                      >
                        Delete feedback
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <p className="text-sm font-montserrat text-gray-500">
                Select a product from the table to load its feedback details.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default FeedbackPage;

