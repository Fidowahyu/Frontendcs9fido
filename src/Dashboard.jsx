import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Dashboard</h1>
        <div className="space-y-4">
          <Link
            to="/items"
            className="block w-full bg-yellow-500 text-white py-2 rounded text-center hover:bg-yellow-600"
          >
            Items
          </Link>
        </div>
      </div>
    </div>
  );
}
