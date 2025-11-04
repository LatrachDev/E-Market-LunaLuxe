import { Link } from 'react-router-dom';

export default function NavBar() {
    
    const navItem = [
        { name: "Home", path: "/" },
        { name: "Products", path: "/products" },
        { name: "About", path: "/about" },
    ]
    
    return (
        <nav className='flex justify-center gap-6 font-bold py-4'>
            {navItem.map(item => (
                <Link
                    key={item.name}
                    to={item.path}
                >
                    {item.name}
                </Link>
            ))}
        </nav>
    );
}