import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login';
import ItemList from './ItemList';
import Dashboard from './Dashboard'; // Import Dashboard

function App() {
  return (
    <Router>
      <div>
        <header className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-8 shadow-2xl">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img
                src="/Logo UI store.jpeg" // Ensure the image is placed in the public folder
                alt="UI Store Logo"
                className="w-20 h-20 object-contain rounded shadow-lg border-2 border-yellow-300"
              />
              <Link to="/" className="text-4xl font-extrabold tracking-wide hover:text-yellow-300 transition duration-300">
                UI Store
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="/Logo UI.png" // Ensure the image is placed in the public folder
                alt="UI Logo"
                className="w-14 h-14 object-contain rounded-full shadow-lg border-2 border-white"
              />
            </div>
            <nav className="space-x-6">
              <Link to="/" className="hover:underline transition duration-300 ease-in-out hover:text-yellow-300 text-lg">
                Login
              </Link>
              <Link to="/dashboard" className="hover:underline transition duration-300 ease-in-out hover:text-yellow-300 text-lg">
                Dashboard
              </Link>
              <Link to="/items" className="hover:underline transition duration-300 ease-in-out hover:text-yellow-300 text-lg">
                Item
              </Link>
            </nav>
          </div>
        </header>
        <div className="bg-gradient-to-b from-blue-100 via-pink-100 to-yellow-100 min-h-screen p-10">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard dapat diakses tanpa login */}
            <Route path="/items" element={<ItemList />} /> {/* Items dapat diakses tanpa login */}
          </Routes>
        </div>
        {/* Floating Logo */}
        <div className="fixed bottom-4 right-4">
          <img
            src="/Logo UI.png" // Ensure the image is placed in the public folder
            alt="UI Store Logo"
            className="w-16 h-16 object-contain rounded-full shadow-lg border-4 border-yellow-300 hover:scale-110 transition-transform duration-300"
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
