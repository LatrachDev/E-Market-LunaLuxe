
import { useEffect, useState } from "react";
import { User, Mail } from "lucide-react";
import API_ENDPOINTS from "../../config/api";
import { api } from "../../config/api";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(API_ENDPOINTS.PROFILE.MYPROFILE);

        const userData = response.data?.user;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError(error.response?.data?.message || "Erreur lors du chargement du profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-brandWhite min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brandRed mb-4"></div>
          <p className="font-montserrat text-lg text-gray-600">Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-brandWhite min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-montserrat text-lg text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-2 bg-brandRed text-white rounded-md hover:bg-hoverBrandRed transition-colors duration-300 font-montserrat"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-5 py-16 bg-brandWhite min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-brandRed mb-2">
            Mon Profil
          </h1>
          <p className="font-montserrat text-gray-600">
            Gérez vos informations personnelles
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-8">
            {/* Profile Icon Section */}
            <div className="flex justify-center mb-8">
              <div className="w-32 h-32 rounded-full bg-brandRed/10 flex items-center justify-center">
                <User size={64} className="text-brandRed" />
              </div>
            </div>

            {/* User Information */}
            <div className="space-y-6">
              {/* Fullname */}
              <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
                <div className="shrink-0 w-12 h-12 rounded-full bg-brandBrown/10 flex items-center justify-center">
                  <User size={24} className="text-brandBrown" />
                </div>
                <div className="flex-1">
                  <label className="block font-montserrat text-sm font-medium text-gray-500 mb-1">
                    Nom complet
                  </label>
                  <p className="font-playfair text-xl font-semibold text-l_black">
                    {user?.fullname || user?.name || "Non spécifié"}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-brandBrown/10 flex items-center justify-center">
                  <Mail size={24} className="text-brandBrown" />
                </div>
                <div className="flex-1">
                  <label className="block font-montserrat text-sm font-medium text-gray-500 mb-1">
                    Adresse e-mail
                  </label>
                  <p className="font-montserrat text-lg text-l_black">
                    {user?.email || "Non spécifié"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
