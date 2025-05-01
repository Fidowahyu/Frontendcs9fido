import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegister) {
        // Registration logic
        if (!username || !email || !password) {
          setError('All fields are required for registration.');
          setLoading(false);
          return;
        }

        // Get users from localStorage or initialize empty array
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Check if email already exists
        if (users.some(user => user.email === email)) {
          setError('Email already registered. Please try another email or login.');
          setLoading(false);
          return;
        }
        
        // Create new user
        const newUser = {
          id: Date.now(),
          username,
          email,
          password
        };
        
        // Add new user to array and save to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Set current user and token
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        localStorage.setItem('token', `token-${Date.now()}`);
        
        // Add small delay to show loading indicator
        setTimeout(() => {
          alert('Registration successful! You are now logged in.');
          navigate('/dashboard');
        }, 500);
      } else {
        // Login logic
        if (!email || !password) {
          setError('Email and password are required for login.');
          setLoading(false);
          return;
        }

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Find user with matching email and password
        const user = users.find(user => user.email === email && user.password === password);
        
        if (!user) {
          setError('Invalid email or password. Please try again.');
          setLoading(false);
          return;
        }
        
        // Set current user and token
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('token', `token-${Date.now()}`);
        
        // Add small delay to show loading indicator
        setTimeout(() => {
          alert('Login successful!');
          navigate('/dashboard');
        }, 500);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isRegister ? 'Register to UI Store' : 'Login to UI Store'}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 flex justify-center items-center"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
            ) : null}
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-blue-500"
            onClick={() => {
              setIsRegister(!isRegister);
              setError(null);
            }}
          >
            {isRegister ? 'Login to UI Store' : 'Register to UI Store'}
          </button>
        </p>
      </div>
    </div>
  );
}