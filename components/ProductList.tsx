import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[];
    addToCart: (product: Product) => void;
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, addToCart, categories, selectedCategory, onSelectCategory }) => {
    return (
        <div>
            <div className="mb-8 flex flex-wrap justify-center gap-2 sm:gap-4">
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className={`px-4 py-2 text-sm sm:text-base font-bold rounded-full transition-all duration-300 ${
                            selectedCategory === category
                                ? 'bg-amber-500 text-gray-900 shadow-lg'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            ) : (
                 <div className="text-center py-16">
                    <h3 className="text-2xl font-bold text-gray-300">No Products Found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
};

export default ProductList;