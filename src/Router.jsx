import { createBrowserRouter } from 'react-router-dom'
import { Register } from './pages/Register'
import { SuccessfulRegistration } from './pages/SuccessfulRegistration'
import AllProducts from './pages/AllProducts';
import Layout from './components/Layout';
import MenClothing from './pages/MenClothing';
import WomenClothing from './pages/WomenClothing';
import Jewelery from './pages/Jewelery';
import Electronics from './pages/Electronics';
import LoginPage from './pages/Login';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';

export const Router = createBrowserRouter([
    { 
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <AllProducts />},
            { path: '/men', element: <MenClothing />},
            { path: '/women', element: <WomenClothing />},
            { path: '/jewelery', element: <Jewelery />},
            { path: '/electronics', element: <Electronics />},
            { path: '/productDetail/:id', element: <ProductDetail />},
            { path: '/cart', element: <ShoppingCart />},
            { path: '/register', element: <Register />},
            { path: '/login', element: <LoginPage />},
            { path: '/SuccessfulRegistration', element: <SuccessfulRegistration />}
        ]
    },
]);


