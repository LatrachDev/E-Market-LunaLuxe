export default function ProductsPage() {
    return(
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-8 text-center">
                    Our Products
                </h1>
                <Products />
            </div>
        </div>
    )
}