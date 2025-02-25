import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import Popup from '../Popup';

export default function PrivateRoute({ children }) {
  const userContext = useContext(UserContext);
  const { isAuthenticated, verifyingToken } = userContext;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      await verifyingToken();
      setLoading(false);
      if(!isAuthenticated){
        setTimeout(() => {
            navigate('/login');
            }, 2000);
        }
    };
    verifyToken();
  }, [isAuthenticated]);


  if (loading) return null;

  return isAuthenticated ? children : 
    <>
        <Popup message="Debe estar autenticado para acceder a esta característica" />
    </> 
}
