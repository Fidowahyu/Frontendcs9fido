import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://backendcs9fido.vercel.app/item`);
        console.log(response);
        setProducts(response.data.payload.slice(0, 8));
      } catch (error) {
        console.error("Error fetching item:", error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Barang Dijual</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((barang) => (
          <div key={barang._id} className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-xl font-semibold">{barang.nama}</h2>
            <p className="text-gray-700">Harga: Rp{barang.harga}</p>
            <p className="text-sm text-gray-500">Stok: {barang.stok}</p>
          </div>
        ))}
      </div>
    </div>
  );
}