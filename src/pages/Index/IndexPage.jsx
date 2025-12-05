import { lazy, Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Lazy load heavy components
const Header = lazy(() => import('../../components/Home/Header'));
const HomeProducts = lazy(() => import('../../components/Home/HomeProducts'));
const Discover = lazy(() => import('../../components/Home/Discover'));
const History = lazy(() => import('../../components/Home/History'));
const Routine = lazy(() => import('../../components/Home/Routine'));

const SectionLoader = () => (
  <div className="py-12 flex justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-brandRed border-r-transparent"></div>
  </div>
);

export default function IndexPage()
{
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is authenticated
        const token = localStorage.getItem("token");
        const userData = localStorage.getItem("user");
        
        if (token && userData) {
            try {
                const user = JSON.parse(userData);
                
                // Redirect based on user role
                if (user?.role === "admin") {
                    navigate('/admin', { replace: true });
                } else if (user?.role === "seller") {
                    navigate('/seller', { replace: true });
                } else if (user?.role === "user") {
                    navigate('/client', { replace: true });
                } else {
                    navigate('/', { replace: true });
                }
            } catch (error) {
                navigate('/', { replace: true });
            }
        }
    }, [navigate]);

    return (
        <>
   
            <Suspense fallback={<SectionLoader />}>
                <Header />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <HomeProducts />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <Discover />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <History />
            </Suspense>
            
            <Suspense fallback={<SectionLoader />}>
                <Routine />
            </Suspense>

        </>
    )
}