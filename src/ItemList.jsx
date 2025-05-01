import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiItemsCount, setApiItemsCount] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Hindari double slash dengan trimTrailingSlash
        const baseApi = import.meta.env.VITE_API_URL?.replace(/\/+$/, '') || 'https://backendcs9fido.vercel.app';
        const apiUrl = `${baseApi}/item`;

        const response = await axios.get(apiUrl, {
          // Penting: pastikan header CORS diterima
          withCredentials: false
        });

        let apiItems = [];
        if (response.data && Array.isArray(response.data.payload)) {
          apiItems = response.data.payload;
          setApiItemsCount(apiItems.length);
        } else if (Array.isArray(response.data)) {
          apiItems = response.data;
          setApiItemsCount(apiItems.length);
        } else {
          throw new Error('Invalid response structure. Expected an array or {payload: array}');
        }

        const normalizedApiItems = apiItems.map(item => ({
          id: item.id || item._id,
          name: item.name || item.nama,
          price: item.price || item.harga,
          stock: item.stock || item.stok,
          image: item.image_url || item.image || item.gambar || 'https://via.placeholder.com/150',
        }));

        setItems(normalizedApiItems);
      } catch (error) {
        console.error('Error fetching items:', error);
        if (error.response) {
          setError(`Server error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
          setError('Network error: Unable to reach the server. Please check your connection or CORS.');
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  if (loading) return <div className="p-6">Loading items...</div>;

  if (error) {
    return (
      <div className="p-6 text-red-500">
        <div>{error}</div>
        <div className="text-sm text-gray-500 mt-2">Check your backend CORS settings and API URL.</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Daftar Item</h1>
      <p className="mb-4">Showing {items.length} items ({apiItemsCount} from API)</p>

      {items.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded">
          No items found. Please add items through your API.
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <li key={item.id} className="border p-4 rounded shadow hover:shadow-lg transition-shadow duration-300">
              <Link to={`/items/${item.id}`} className="block">
                <div className="h-64 flex items-center justify-center mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain rounded"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                    }}
                  />
                </div>
                <h2 className="text-lg font-semibold text-center">{item.name}</h2>
                <p className="text-center">Harga: Rp{item.price?.toLocaleString('id-ID') || '-'}</p>
                <p className="text-center">Stok: {item.stock || 0}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
