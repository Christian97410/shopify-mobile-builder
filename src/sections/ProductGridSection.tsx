import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
}

const ProductGridSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/shopify/products'); // à adapter
      const data = await res.json();
      setProducts(data.products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {products.map(product => (
        <div key={product.id} className="border rounded shadow-sm p-2">
          <img src={product.image} alt={product.title} className="w-full h-32 object-cover" />
          <h4 className="text-sm mt-2">{product.title}</h4>
          <p className="text-primary-500">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductGridSection;
