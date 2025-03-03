import { createBrowserRouter } from 'react-router-dom'
import { Register } from './components/register/Register'
import { SuccessfulRegistration } from './pages/SuccessfulRegistration'
import AllProducts from './pages/AllProducts';
import Layout from './components/Layout/Layout';
import MenClothing from './pages/MenClothing';
import WomenClothing from './pages/WomenClothing';
import Jewelery from './pages/Jewelery';
import Electronics from './pages/Electronics';
import LoginPage from './components/login/Login';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetail from './pages/ProductDetail';
import UserProfile from './pages/UserProfile';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import PrivateRoute from './components/auth/PrivateRoute';
import { SuccessfulPayment } from './pages/SuccesfullPayment';
import { FailedPayment } from './pages/FailedPayment';

export const Router = createBrowserRouter([
    { 
        path: '/',
        element: <Layout />,
        children: [
            //Rutas públicas
            { path: '/', element: <Home />},
            { path: '/allproducts', element: <AllProducts />},
            { path: '/men', element: <MenClothing />},
            { path: '/women', element: <WomenClothing />},
            { path: '/jewelery', element: <Jewelery />},
            { path: '/electronics', element: <Electronics />},
            { path: '/productDetail/:id', element: <ProductDetail />},
            { path: '/cart', element: <ShoppingCart /> },
            { path: '/register', element: <Register />},
            { path: '/login', element: <LoginPage />},
            { path: '/successful-registration', element: <SuccessfulRegistration />},
            { path: '/successful-payment', element: <SuccessfulPayment />},
            { path: '/failed-payment', element: <FailedPayment />},

            //Rutas Privadas
            { path: '/userProfile', element: (<PrivateRoute><UserProfile /></PrivateRoute>) },
            { path: '/changePassword', element: (<PrivateRoute><ChangePassword /></PrivateRoute>) },
        ]
    },
]);



