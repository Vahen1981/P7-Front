import { useEffect, useContext, useState } from 'react';
import ProductContext from '../../context/Products/ProductContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Loader2 } from 'lucide-react';


const MenClothing = () => {
  const { globalState, getMenClothing } = useContext(ProductContext);
  const { products } = globalState;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const waitProducts = async () => {
      await getMenClothing();
      setLoading(false);
    };
    waitProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center">
        <Loader2 className="w-20 h-20 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Ropa de Hombre</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default MenClothing;
