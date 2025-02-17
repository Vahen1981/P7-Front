import { useEffect, useContext, useState } from 'react';
import ProductContext from '../context/ProductContext';
import ProductCard from '../components/ProductCard';


const WomenClothing = () => {
  const { globalState, getWomenClothing } = useContext(ProductContext);
  const { products } = globalState;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitProducts = async () => {
      await getWomenClothing();
      setLoading(false);
    };
    waitProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold">Cargando productos...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Todos los productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default WomenClothing;
