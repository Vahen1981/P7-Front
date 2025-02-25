import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Popup from "../components/Popup";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
    const { updateUserData } = useContext(UserContext);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();

    const currentEmail = localStorage.getItem("userEmail");
    const currentUsername = localStorage.getItem("username");

    const [activeUser, setActiveUser] = useState({
        username: "",
        email: ""
    });

    const handleChange = (e) => {
        setActiveUser({ ...activeUser, [e.target.name]: e.target.value });
    };

    const showPopupMessage = (message) => {
        setPopupMessage(message);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    const validateEmail = (email) => {
        const emailFormat = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailFormat.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(activeUser.username.trim() === "" && activeUser.email.trim() === ""){
            showPopupMessage("Debe ingresar algún campo para actualizar");
            return;
        }
        if(activeUser.email.trim() !== "" && !validateEmail(activeUser.email)){
            showPopupMessage("Debe ingresar un e-mail válido");
            return;
        }
        const filteredData = Object.fromEntries(
            Object.entries(activeUser).filter(([, value]) => value.trim() !== "")
        );

        const res = await updateUserData(filteredData);
        if(res.status === 201){
            showPopupMessage("Datos actualizados correctamente");
        }
        setActiveUser({ username: "", email: "" });
    };

        



  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100">
        {showPopup && <Popup message={popupMessage} />}
        <div className="w-full max-w-85 md:max-w-[60vw] p-6 md:p-8 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Administrar Perfil</h2>
            <div className="flex flex-col md:flex-row gap-4">
                
                {/* Columna Izquierda */}
                <div className="w-full bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Datos de Usuario</h3>
                    <div className="flex flex-row justify-between">
                        <div>
                            <div className="flex justify-left text-gray-700">
                                <span className="font-medium text-sm">Nombre de Usuario:</span>
                            </div>
                            <div className="flex justify-left text-gray-700">
                                <span>{currentUsername}</span>
                            </div>
                            <div className="flex justify-left text-gray-700 mt-4">
                                <span className="font-medium text-sm">e-mail:</span>
                            </div>
                            <div className="flex justify-left text-gray-700">
                                <span>{currentEmail}</span>
                            </div>
                        </div>
                        <div className="w-30 h-30 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            <span className="text-3xl text-bold">?</span>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha */}
                <div className="w-full ">
                    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nuevo Nombre</label>
                            <input
                                type="text"
                                name="username"
                                value={activeUser.username}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={currentUsername}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Nuevo e-mail</label>
                            <input
                                type="email"
                                name="email"
                                value={activeUser.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder={currentEmail}
                            />
                        </div>
                        <div className="flex justify-center mt-10">
                            <button
                                type="submit"
                                className="w-50 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                            >
                                Guardar Cambios
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex justify-center mt-5">
                <p className="text-blue-700 text-sm text-bold hover:text-blue-500 cursor-pointer"
                onClick={() => {navigate("/changePassword")}}>¿Cambiar contraseña?</p>
            </div>
        </div>
    </div>
  );
}


export default UserProfile;