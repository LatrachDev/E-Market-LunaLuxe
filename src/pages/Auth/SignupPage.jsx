import { useState, useEffect } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/Images/login-image.png";
import LoginHeader from "../../components/LoginHeader";
import axios from "axios";
import API_ENDPOINTS, { api } from "../../config/api";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import store from "../../features/store";


export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Hide overflow for the signup page
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {

    if (!formData.fullname || !formData.email || !formData.password) {
      return "Veuillez remplir tous les champs.";
    }
    
    if (formData.password.length < 8) {
      return "Le mot de passe doit contenir au moins 8 caractères.";
    }
    
    if (!/[A-Z]/.test(formData.password)) {
      return "Le mot de passe doit contenir au moins une lettre majuscule.";
    }

    if (!/[a-z]/.test(formData.password)) {
      return "Le mot de passe doit contenir au moins une lettre minuscule.";
    }

    return null;

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await api.post(API_ENDPOINTS.AUTH.SIGNUP, {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password
      });

      console.log('response: ', response);
      

      dispatch(setCredentials({
      token: response.data.data.token,
      user: response.data.data.user,
    }));
    console.log(store.getState());
    

      if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        console.log('token stored successfully');
      }
      
      if (response.data?.data?.user) {
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        console.log('user stored successfully');
      }

      navigate("/client", { 
        state: { message: "Compte créé avec succès! Veuillez vous connecter." }
      });
      setSuccess("Compte créé avec succès! Veuillez vous connecter.");
    } catch (error) {
      console.error('Registration error');
    }

    console.log("Signup data:", formData);
  };

  return (
    <>
      <LoginHeader />
      <div className="flex lg:flex-row w-full h-screen">
        {/* Form Section - Left side */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 lg:px-20 bg-[#FAFAFA]">
          
          <div className="w-full -mt-16 max-w-lg">
            <h1 className="text-center font-playfair font-bold uppercase text-4xl lg:text-5xl mb-12 text-brandRed tracking-wide">
              Inscrivez-vous
            </h1>

            {/* Success Message */}
            {success && (
              <div className="w-full mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="w-full mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              {/* Full Name */}
              <div className="mb-6">
                <input
                  type="text"
                  name="fullname"
                  placeholder="Nom Et Prénom"
                  value={formData.fullname}
                  onChange={handleChange}
                  className="font-montserrat w-full px-4 py-3 border-2 border-black focus:border-brandRed focus:outline-none transition-colors bg-white text-gray-800"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="font-montserrat w-full px-4 py-3 border-2 border-black focus:border-brandRed focus:outline-none transition-colors bg-white text-gray-800"
                  required
                />
              </div>

              {/* Password Fields in Row */}
              <div className="flex gap-4 mb-8">
                {/* Password */}
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="font-montserrat w-full px-4 py-3 border-2 border-black focus:border-brandRed focus:outline-none transition-colors bg-white text-gray-800 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-600 hover:text-brandRed transition-colors"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

   
              </div>

              {/* Register Button with decorative lines */}
              <div className="flex items-center mb-8">
                <div className="flex-1 h-px bg-gray-300"></div>
                <button
                  type="submit"
                  className="font-montserrat mx-6 px-8 py-3 text-brandWhite bg-[#6B4C3C] hover:bg-[#5a3d2f] transition-colors duration-300 uppercase tracking-wide"
                >
                  Créer Un Compte
                </button>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              {/* Login Link */}
              <div className="text-center">
                <p className="font-montserrat text-gray-800">
                  Vous Avez Déjà Un Compte ?{" "}
                  <Link
                    to="/login"
                    className="text-brandRed hover:underline transition-all duration-300"
                  >
                    Se Connecter
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Image Section - Right side */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src={LoginImage}
            alt="Cosmetologist"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </>
  );
}