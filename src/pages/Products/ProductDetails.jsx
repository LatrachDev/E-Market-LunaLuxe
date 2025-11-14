import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Heart, Share2 } from "lucide-react";
import axios from "axios";
import API_ENDPOINTS from "../../config/api";
import Layout from "../../components/Layouts/Layout";

const PLACEHOLDER_IMAGE = "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop";

export default function ProductDetails() {

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {

      try {
        
        const response = await axios.get(API_ENDPOINTS.PRODUCTS.GET_ONE.replace(':id', id));
        console.log('respooooonse', response);
        
        const productData = response.data;
        setProduct(productData);
        
        console.log('product data', productData);
        
      } catch (error) {
        console.log('erro fetching');
      }

    };
    if (id){
      fetchProduct();
    }
  }, []);

    if (!product) {
      return (
        <Layout>
          <div className="flex justify-center items-center min-h-screen">
            <p className="font-montserrat text-gray-500">Chargement...</p>
          </div>
        </Layout>
      );
    }
  
    
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 bg-brandWhite min-h-screen">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-brandBrown hover:text-brandRed transition-colors duration-300 mb-6 font-montserrat"
          >
            <ArrowLeft size={20} />
            <span>Retour</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative w-full aspect-square overflow-hidden rounded-lg bg-brandSwhite">
                <img
                  src={PLACEHOLDER_IMAGE}
                  className="w-full h-full object-cover"
                />
                
                  <div className="absolute top-4 right-4 bg-brandRed text-white px-5 py-1 rounded-md text-sm font-montserrat font-light">
                    -20%
                  </div>
            
              </div>

            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-l_black mb-4">
                  {product.title}
                </h1>

        

                <p className="font-montserrat text-base text-gray-700 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Stock Information */}
               
                  <div className="mb-6">
                    <p className="font-montserrat text-sm text-gray-600">
                      Stock disponible: <span className="font-semibold text-green-600">
                        {product.stock}
                      </span>
                    </p>
                  </div>
                

                {/* Quantity Selector */}
                
                  <div className="mb-6">
                    <label className="block font-montserrat text-sm font-medium text-gray-700 mb-2">
                      Quantité:
                    </label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setQuantity(Math.max(0, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300 font-montserrat font-semibold"
                      >
                        -
                      </button>
                      <span className="font-montserrat text-lg font-semibold w-12 text-center">
                        1
                      </span>
                      <button
                        onClick={() => setQuantity(Math.min(1, quantity + 1))}
                        className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-100 transition-colors duration-300 font-montserrat font-semibold"
                      >
                        +
                      </button>
                    </div>
                  </div>
                
              </div>

              <div className="space-y-4 pt-6 border-t border-gray-200">
                <button
                  onClick={(e) => e.preventDefault()}
                  disabled={true}
                  className="w-full flex items-center justify-center gap-2 bg-brandRed text-white px-8 py-4 rounded-full hover:bg-hoverBrandRed transition-colors duration-300 font-montserrat font-medium text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={20} />
                  <span>Ajouter au panier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
