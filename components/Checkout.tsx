import React from 'react';

interface CheckoutProps {
    onBack: () => void;
    onOrderPlaced: () => void;
    total: number;
}

const Checkout: React.FC<CheckoutProps> = ({ onBack, onOrderPlaced, total }) => {
    return (
        <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <button onClick={onBack} className="text-amber-400 hover:text-amber-300 mb-6">&larr; Back to Products</button>
            <h2 className="text-3xl font-display font-bold text-amber-400 mb-6 border-b border-gray-700 pb-4">Checkout</h2>
            
            <div className="space-y-6">
                <div>
                    <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" placeholder="First Name" className="bg-gray-700 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input type="text" placeholder="Last Name" className="bg-gray-700 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input type="email" placeholder="Email Address" className="md:col-span-2 bg-gray-700 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <input type="text" placeholder="Address" className="md:col-span-2 bg-gray-700 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-bold mb-4">Payment Details</h3>
                    <div className="space-y-4">
                         <input type="text" placeholder="Card Number" className="w-full bg-gray-700 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                         <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/YY" className="bg-gray-700 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                            <input type="text" placeholder="CVC" className="bg-gray-700 p-3 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                         </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 pt-6 mt-6">
                    <div className="flex justify-between items-center text-2xl font-bold">
                        <span>Order Total:</span>
                        <span className="text-amber-400">₹{total.toFixed(2)}</span>
                    </div>
                    <button 
                        onClick={onOrderPlaced}
                        className="w-full mt-6 bg-amber-500 text-gray-900 font-bold py-4 rounded-lg text-lg hover:bg-amber-400 transition-colors duration-300"
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;