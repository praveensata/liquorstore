import React from 'react';
import { CartItem } from '../types';
import { PlusIcon, MinusIcon, TrashIcon, CloseIcon, ShoppingBagIcon } from './Icons';

interface CartProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: CartItem[];
    onUpdateQuantity: (productId: number, newQuantity: number) => void;
    onCheckout: () => void;
    total: number;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onCheckout, total }) => {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black bg-opacity-60 z-30 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            ></div>
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-800 text-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center p-4 border-b border-gray-700">
                        <h2 className="text-2xl font-display font-bold text-amber-400">Your Cart</h2>
                        <button onClick={onClose} className="text-gray-400 hover:text-white">
                            <CloseIcon />
                        </button>
                    </div>
                    
                    {cartItems.length === 0 ? (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
                            <ShoppingBagIcon className="w-24 h-24 text-gray-600 mb-4" />
                            <h3 className="text-xl font-bold text-gray-300">Your cart is empty</h3>
                            <p className="text-gray-500 mt-1">Looks like you haven't added anything yet.</p>
                             <button
                                onClick={onClose}
                                className="mt-6 bg-amber-500 text-gray-900 font-bold py-2 px-6 rounded-full hover:bg-amber-400 transition-colors duration-300"
                            >
                                Start Shopping
                            </button>
                        </div>
                    ) : (
                        <div className="flex-grow overflow-y-auto p-4 space-y-4">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex items-center space-x-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-20 object-cover rounded" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-sm text-gray-400">₹{item.price.toFixed(2)}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 bg-gray-700 rounded-full p-1">
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-1 rounded-full hover:bg-gray-600"><MinusIcon /></button>
                                        <span className="w-6 text-center font-bold">{item.quantity}</span>
                                        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-1 rounded-full hover:bg-gray-600"><PlusIcon /></button>
                                    </div>
                                    <button onClick={() => onUpdateQuantity(item.id, 0)} className="text-gray-500 hover:text-red-500"><TrashIcon /></button>
                                </div>
                            ))}
                        </div>
                    )}

                    {cartItems.length > 0 && (
                        <div className="p-4 border-t border-gray-700 space-y-4">
                            <div className="flex justify-between font-bold text-xl">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={onCheckout}
                                className="w-full bg-amber-500 text-gray-900 font-bold py-3 rounded-lg hover:bg-amber-400 transition-colors duration-300"
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;