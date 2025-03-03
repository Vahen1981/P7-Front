import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Popup from '../Popup/Popup';

export default function PrivateRoute({ children }) {
  const userContext = useContext(UserContext);
  const { verifyingToken, isAuthenticated, logout } = userContext;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      const isAuth = await verifyingToken();
      setLoading(false);
      if (!isAuth) {
        setTimeout(() => {
        logout();
        navigate('/login');
        }, 2000);
      }
    };
    verifyToken();
  }, []);


  if (loading) return null;

  return isAuthenticated ? children : 
    <>
        <Popup message="Debe estar autenticado para acceder a esta característica" />
    </> 
}
