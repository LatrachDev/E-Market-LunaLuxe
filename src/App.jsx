import './App.css';
import './index.css';
import RoutesList from './Routes/Routes';
import SmoothFollower from './components/Layouts/SmoothFollower';
import ScrollToTop from './components/Layouts/ScrollTop';

function App() {

  return (
    <>
      <ScrollToTop />
      <SmoothFollower />
      <RoutesList />
    </>
  )
}

export default App
