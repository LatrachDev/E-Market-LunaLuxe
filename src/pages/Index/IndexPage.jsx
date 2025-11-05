import Header from '../../components/Home/Header';
import NavBar from '../../components/Layouts/NavBar';
import LoginPage from '../Auth/LoginPage';
import HomeProducts from '../../components/Home/HomeProducts';

export default function IndexPage()
{
    return (
        <>
            <NavBar />
            <Header />
            <HomeProducts />
        </>
    )
}