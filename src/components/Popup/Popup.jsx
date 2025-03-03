const Popup = ({ message }) => {
    return (
        <div className="fixed inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-50 ">
            <div className="max-w-[95vw] bg-blue-500/90 text-white text-xl py-4 px-8 rounded-2xl shadow-[0_4px_5px_rgba(0,0,0,0.6)]">
                <p className= "mt-5 mb-5 ml-10 mr-10">{message}</p>
                
            </div>
        </div>
    );
  };
  
  export default Popup;
  