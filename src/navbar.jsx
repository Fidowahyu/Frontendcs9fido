import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between">
      <h1 className="font-bold text-lg">TUTAM Store</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">
          Login
        </Link>
        <Link to="/products" className="hover:underline">
          Produk
        </Link>
        <Link to="/transactions" className="hover:underline">
          Transaksi
        </Link>
        <Link to="/items" className="hover:underline">
          Item
        </Link>
      </div>
    </nav>
  );
}