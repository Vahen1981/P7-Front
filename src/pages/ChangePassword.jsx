import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Popup from "../components/Popup/Popup";

const ChangePassword = () => {
    const { user, updateUserData , verifyPassword, loading } = useContext(UserContext);
    const [repiteNewPassword, setRepiteNewPassword] = useState("");
    const [password, setPassword] = useState("");
    const [popupMessage, setPopupMessage] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState({
        password: ""
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (newPassword.password !== repiteNewPassword) {
        showPopUpMessage("Ha cometido un error al ingresar la nueva contraseña");
        return;
      }
    
      const passwordMatch = await verifyPassword(password, user.id);
    
      if (!passwordMatch) {
        showPopUpMessage("La contraseña actual no coincide");
        return;
      }
    
      const res = await updateUserData(newPassword);
    
      if (res) {
        showPopUpMessage("Ha establecido correctamente una nueva contraseña", true);
      } else {
        showPopUpMessage("No se ha podido establecer una nueva contraseña, inténtelo de nuevo");
      }
    };
    
    const showPopUpMessage = (message, redirect = false) => {
      setPopupMessage(message);
      setShowPopup(true);
      
      setTimeout(() => {
        setShowPopup(false);
        if (redirect) navigate("/");
      }, 2000);
    };
    

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
      {showPopup && <Popup message={popupMessage} />}
      <div className="w-full max-w-85 md:max-w-[40vw] p-8 bg-white shadow-lg rounded-lg mt-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Cambiar Contraseña</h2>
        
        {loading ? (
          <div className="flex justify-center mb-4">
            <div className="w-8 h-8 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Nueva contraseña</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword.password}
                onChange={(e) => setNewPassword({ password: e.target.value })}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu nueva contraseña"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Repetir nueva contraseña</label>
              <input
                type="password"
                id="repitedPassword"
                value={repiteNewPassword}
                onChange={(e) => setRepiteNewPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Repite la nueva contraseña"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña actual</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ingresa tu contraseña actual"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Cambiar Contraseña
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ChangePassword;
