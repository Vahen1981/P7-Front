import { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, error, loading, isAuthenticated } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Iniciar sesión</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {loading ? (
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu email"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Iniciar sesión
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
