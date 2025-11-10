import Header from '../../components/Home/Header';
import NavBar from '../../components/Layouts/NavBar';
import LoginPage from '../Auth/LoginPage';
import HomeProducts from '../../components/Home/HomeProducts';
import Discover from '../../components/Home/Discover';
import History from '../../components/Home/History';
import Routine from '../../components/Home/Routine';
import Footer from '../../components/Layouts/Footer';

export default function IndexPage()
{
    return (
        <>
            <NavBar />
            <Header />
            <HomeProducts />
            <Discover />
            <History />
            <Routine />
            <Footer />
        </>
    )
}