import React from 'react';
import { Order } from '../types';

interface OrderHistoryProps {
    orders: Order[];
    onBack: () => void;
    onOrderAgain: (order: Order) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders, onBack, onOrderAgain }) => {
    return (
        <div className="max-w-4xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <button onClick={onBack} className="text-amber-400 hover:text-amber-300 mb-6">&larr; Back to Products</button>
            <h2 className="text-3xl font-display font-bold text-amber-400 mb-6 border-b border-gray-700 pb-4">Your Orders</h2>
            {orders.length === 0 ? (
                <p className="text-gray-400 text-center py-8">You have not placed any orders yet.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order.id} className="bg-gray-700 p-4 rounded-lg">
                            <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-100">Order ID: <span className="font-mono">{order.id}</span></h3>
                                    <p className="text-sm text-gray-400">{order.date.toLocaleDateString()}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="font-bold text-xl text-amber-400">₹{order.total.toFixed(2)}</p>
                                    <button 
                                        onClick={() => onOrderAgain(order)}
                                        className="bg-amber-500 text-gray-900 font-bold py-2 px-4 rounded-full text-sm hover:bg-amber-400 transition-colors duration-300"
                                    >
                                        Order Again
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                        <span className="text-gray-300">{item.name} (x{item.quantity})</span>
                                        <span className="text-gray-400">₹{(item.price * item.quantity).toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;