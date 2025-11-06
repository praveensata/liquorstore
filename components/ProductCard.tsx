import React, { useState } from 'react';
import { Product } from '../types';
import { generateProductDescription } from '../services/geminiService';
import Loader from './Loader';
import { CheckIcon } from './Icons';

interface ProductCardProps {
    product: Product;
    addToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
    const [aiDescription, setAiDescription] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleGenerateDescription = async () => {
        setIsLoading(true);
        const description = await generateProductDescription(product.name);
        setAiDescription(description);
        setIsLoading(false);
    };

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 flex flex-col group">
            <div className="relative">
                <img src={product.imageUrl} alt={product.name} className="w-full h-64 object-cover" />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <span className="absolute top-2 right-2 bg-amber-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">{product.category}</span>
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-display text-gray-100 font-bold mb-2 truncate">{product.name}</h3>
                
                <div className="min-h-[60px]">
                    {aiDescription ? (
                        <p className="text-gray-400 text-sm mb-4 italic">"{aiDescription}"</p>
                    ) : (
                        <button 
                            onClick={handleGenerateDescription} 
                            disabled={isLoading}
                            className="text-amber-400 hover:text-amber-300 text-sm mb-4 flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-wait"
                        >
                            {isLoading ? <Loader /> : 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-3.125L5 18V4z" />
                            </svg>}
                            {isLoading ? 'Generating...' : 'Get AI Tasting Notes'}
                        </button>
                    )}
                </div>

                <div className="mt-auto flex justify-between items-center">
                    <p className="text-2xl font-bold text-white">₹{product.price.toFixed(2)}</p>
                    <button 
                        onClick={handleAddToCart}
                        disabled={isAdded}
                        className={`font-bold py-2 px-4 rounded-full transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 ${
                            isAdded
                                ? 'bg-green-500 text-white'
                                : 'bg-amber-500 text-gray-900 hover:bg-amber-400'
                        }`}
                    >
                        {isAdded ? <>Added <CheckIcon /></> : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;