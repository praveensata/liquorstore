import React, { useState } from 'react';
import { BottleIcon } from './Icons';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }
        // In a real app, you'd validate credentials here.
        // For this demo, any input is valid.
        setError('');
        onLogin();
    };

    return (
        <div 
            className="min-h-screen flex items-center justify-center bg-gray-900 p-4" 
            style={{backgroundImage: 'radial-gradient(circle at top right, rgba(121, 85, 72, 0.1), transparent), radial-gradient(circle at bottom left, rgba(251, 191, 36, 0.1), transparent)'}}
        >
            <div className="w-full max-w-md bg-gray-800 bg-opacity-80 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
                <div className="flex flex-col items-center mb-8">
                    <div className="p-3 bg-gray-700 rounded-full mb-4">
                        <BottleIcon className="text-amber-400 w-10 h-10" />
                    </div>
                    <h1 className="text-4xl font-bold font-display text-amber-400 tracking-wider text-center">
                        BUJJAMMA
                    </h1>
                    <p className="text-gray-400 mt-2">Sign in to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="block w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="block w-full bg-gray-700 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <div>
                        <button
                            type="submit"
                            className="w-full mt-4 bg-amber-500 text-gray-900 font-bold py-3 rounded-lg text-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;