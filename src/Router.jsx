import { createBrowserRouter } from 'react-router-dom'
import { Register } from './components/Register/Register'
import { SuccessfulRegistration } from './pages/UserPages/SuccessfulRegistration'
import Layout from './components/Layout/Layout';
import AllProducts from './pages/ProductsPages/AllProducts';
import MenClothing from './pages/ProductsPages/MenClothing';
import WomenClothing from './pages/ProductsPages/WomenClothing';
import Jewelery from './pages/ProductsPages/Jewelery';
import Electronics from './pages/ProductsPages/Electronics';
import LoginPage from './components/Login/Login';
import ShoppingCart from './pages/UserPages/ShoppingCart';
import ProductDetail from './pages/ProductsPages/ProductDetail';
import UserProfile from './pages/UserPages/UserProfile';
import ChangePassword from './pages/UserPages/ChangePassword';
import Home from './pages/Home/Home';
import PrivateRoute from './components/Auth/PrivateRoute';
import { SuccessfulPayment } from './pages/UserPages/SuccesfullPayment';
import { FailedPayment } from './pages/UserPages/FailedPayment';

export const Router = createBrowserRouter([
    { 
        path: '/',
        element: <Layout />,
        children: [
            //Rutas públicas
            { path: '/', element: <Home />},
            { path: '/all-products', element: <AllProducts />},
            { path: '/men', element: <MenClothing />},
            { path: '/women', element: <WomenClothing />},
            { path: '/jewelery', element: <Jewelery />},
            { path: '/electronics', element: <Electronics />},
            { path: '/product-detail/:id', element: <ProductDetail />},
            { path: '/register', element: <Register />},
            { path: '/login', element: <LoginPage />},
            { path: '/successful-registration', element: <SuccessfulRegistration />},
            { path: '/successful-payment', element: <SuccessfulPayment />},
            { path: '/failed-payment', element: <FailedPayment />},

            //Rutas Privadas
            { path: '/userProfile', element: (<PrivateRoute><UserProfile /></PrivateRoute>) },
            { path: '/changePassword', element: (<PrivateRoute><ChangePassword /></PrivateRoute>) },
            { path: '/cart', element: (<PrivateRoute><ShoppingCart /></PrivateRoute>)},
        ]
    },
]);



