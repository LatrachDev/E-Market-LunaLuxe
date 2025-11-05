import { Link } from "react-router-dom";
import LoginImage from "../../assets/Images/login-image.png";
import LoginHeader from "../../components/Layouts/LoginHeader"
import { useEffect } from "react";

export default function Login() {

  // this use effect for hide the overflow for the login page!
  useEffect(() => {
    // add styles when component mounts
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.overflow = 'hidden';

    // cleanup function to remove styles when component unmounts
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <>
      <LoginHeader />
      <div className="flex lg:flex-row w-full h-screen ">

        <div className="hidden lg:block lg:w-[45%] relative">
          <img
            src={LoginImage}
            alt="Cosmetologist"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="w-full lg:w-[55%] flex flex-col justify-center mb-20 items-center px-4 sm:px-8 bg-[#FAFAFA]">

          <h1 className="text-center font-playfair font-bold uppercase text-4xl lg:text-5xl mb-[57px] text-brandRed">
            Content de te revoir !
          </h1>

          {/* Success Message */}
          {/* {success && (
          <div className="w-full max-w-md mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )} */}

          {/* Error Message */}
          {/* {error && (
          <div className="w-full max-w-md mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )} */}

          <form className="w-full max-w-md">
            {/* Email Input */}
            <div className="mb-[34px]">
              <input
                type="email"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
                className="font-playfair placeholder:opacity-50 w-full p-3 border border-black focus:border-brandRed focus:outline-none transition-colors bg-white text-brandBrown"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-[67px]">
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                className="font-playfair placeholder:opacity-50 w-full p-3 border border-black focus:border-brandRed focus:outline-none transition-colors bg-white text-brandBrown"
                required
              />
            </div>

            {/* Login Button */}
            <div className="flex items-center mb-3">
              <div className="grow border-t-2 border-brandRed"></div>
              <button
                type="submit"
                className="font-montserrat font-normal px-6 uppercase py-2 mx-4 text-lg text-white bg-brandRed hover:bg-brandBrown disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer shadow-md transition-colors duration-300 whitespace-nowrap w-[320px]"
              >
                Login
              </button>
              <div className="grow border-t-2 border-brandRed"></div>
            </div>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="font-playfair text-brandBrown">
                Vous n'avez pas de compte ?{" "}
                <Link
                  to="/signup"
                  className="text-brandRed hover:text-brandRed transition-colors duration-300"
                >
                  Inscrivez-vous
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}