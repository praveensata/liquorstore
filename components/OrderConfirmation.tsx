import React from 'react';
import { Order } from '../types';

interface OrderConfirmationProps {
    onBackToProducts: () => void;
    lastOrder: Order | null;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onBackToProducts, lastOrder }) => {
    return (
        <div className="max-w-2xl mx-auto text-center bg-gray-800 p-8 rounded-lg shadow-lg">
            <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center bg-green-500 rounded-full">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h2 className="text-3xl font-display font-bold text-amber-400 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-400 mb-6">Thank you for your purchase. You will receive an email confirmation shortly.</p>
            {lastOrder && <p className="text-gray-400 mb-6">Order ID: <span className="font-mono text-gray-200">{lastOrder.id}</span></p>}
            <button
                onClick={onBackToProducts}
                className="bg-amber-500 text-gray-900 font-bold py-3 px-8 rounded-full hover:bg-amber-400 transition-colors duration-300"
            >
                Continue Shopping
            </button>
        </div>
    );
};

export default OrderConfirmation;
