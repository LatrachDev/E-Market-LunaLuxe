import { Link } from "react-router-dom";
import { Package, ShoppingCart, User, LogOut } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";

function ClientNavBar() {

  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handlLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <header className="fixed top-0 left-0 w-full flex items-center justify-between px-6 sm:px-12 py-4 bg-white shadow-sm z-50">
      {/* Logo */}
      <Link to="/client">
        <h3 className="font-bold text-xl sm:text-2xl tracking-widest uppercase font-playfair text-brandRed">
          LunaLuxe
        </h3>
      </Link>

      {/* Icons Container */}
      <div className="flex items-center gap-4">
        {/* Products Icon */}
        <Link
          to="/client"
          className="p-2 rounded-full flex hover:bg-gray-100 transition-colors duration-300"
          aria-label="Products"
        >
          <Package size={24} className="w-5 h-5 text-gray-800 hover:text-brandBrown transition-colors" />
          <p className="text-sm font-montserrat ml-2">Products</p>
        </Link>

        {/* Cart Icon */}
        <Link
          to="/cart"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300 relative"
          aria-label="Shopping Cart"
        >
          <ShoppingCart size={24} className="w-5 h-5 text-gray-800 hover:text-brandBrown transition-colors" />
        
          <span className="absolute top-0 -right-3 bg-brandRed text-brandWhite text-xs rounded-full w-5 h-5 flex items-center font-montserrat justify-center">
            0
          </span>
        </Link>

        {/* Profile Icon */}
        <button
          onClick={handleOpen}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
          aria-label="Profile"
        >
          <User size={24} className="w-5 h-5 text-gray-800 hover:text-brandBrown transition-colors" />
        </button>

        {open && (
          <div ref={modalRef} className="absolute top-12 right-6 bg-white shadow-md rounded-md p-4 z-50">
              <Link
                to="/client/profile"
                onClick={handleClose}
                className="p-2 rounded-full flex hover:bg-gray-100 transition-colors duration-300"
                aria-label="Profile"
              >
                <User size={24} className="w-5 h-5 text-gray-800 hover:text-brandBrown transition-colors" />
                <p className="text-sm font-montserrat ml-2">Profile</p>
              </Link>
              <button
                onClick={handlLogout}
                className="p-2 rounded-full flex hover:bg-gray-100 transition-colors duration-300"
                aria-label="Logout"
              >
                <LogOut size={24} className="w-5 h-5 text-gray-800 hover:text-brandBrown transition-colors" />
                <p className="text-sm font-montserrat ml-2">Logout</p>
              </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default ClientNavBar;

