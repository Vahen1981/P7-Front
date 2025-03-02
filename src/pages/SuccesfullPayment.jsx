import { Link } from "react-router-dom"

export const SuccessfulPayment = () => {

    return (
        <>
        <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl">
                Pago exitoso!
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-lg">
                Pronto recibirás tus productos
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link to="/" className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200">Volver al Inicio</Link>
            </div>
            </div>
        </main>
        </>
    )
}