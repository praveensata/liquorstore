import React from 'react';
import { ShoppingBagIcon, BottleIcon, SearchIcon } from './Icons';

interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
    onLogout: () => void;
    onNavigate: (page: 'products' | 'history') => void;
    searchTerm: string;
    onSearchChange: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, onLogout, onNavigate, searchTerm, onSearchChange }) => {
    return (
        <header className="bg-gray-800 bg-opacity-80 backdrop-blur-sm sticky top-0 z-20 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    <button onClick={() => onNavigate('products')} className="flex items-center gap-3 flex-shrink-0">
                        <BottleIcon className="w-8 h-8 text-amber-400" />
                        <h1 className="hidden sm:block text-2xl font-bold font-display text-amber-400 tracking-wider">BUJJAMMA</h1>
                    </button>
                    
                    <div className="relative flex-1 max-w-xl mx-4">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                             <SearchIcon className="w-5 h-5 text-gray-400" />
                        </span>
                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            placeholder="Search products..."
                            className="w-full bg-gray-700/50 text-white pl-12 pr-4 py-2.5 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors"
                        />
                    </div>
                    
                    <nav className="flex items-center gap-4 sm:gap-6">
                         <button
                            onClick={() => onNavigate('history')}
                            className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium"
                        >
                            History
                        </button>
                        <button onClick={onCartClick} className="relative text-gray-300 hover:text-white transition-colors">
                            <ShoppingBagIcon className="w-7 h-7" />
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex items-center justify-center w-5 h-5 text-xs font-bold text-gray-900 bg-amber-400 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={onLogout}
                            className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base font-medium"
                        >
                            Logout
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;