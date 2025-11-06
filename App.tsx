import React, { useState, useMemo } from 'react';
import { Product, CartItem, Order } from './types';
import { PRODUCTS } from './constants';
import Login from './components/Login';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import OrderHistory from './components/OrderHistory';
import Footer from './components/Footer';

type Page = 'login' | 'products' | 'checkout' | 'confirmation' | 'history';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>('products');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orders, setOrders] = useState<Order[]>([]);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('products');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // for simplicity, we don't implement a login page redirect on logout
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const itemInCart = prevItems.find(item => item.id === product.id);
      if (itemInCart) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setCurrentPage('checkout');
  };
  
  const handlePlaceOrder = () => {
    const newOrder: Order = {
        id: `ORD-${Date.now()}`,
        items: cartItems,
        total: total,
        date: new Date(),
    };
    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setLastOrder(newOrder);
    setCartItems([]);
    setCurrentPage('confirmation');
  };

  const handleOrderAgain = (orderToRepeat: Order) => {
    setCartItems(currentCart => {
        const newCart = [...currentCart];

        orderToRepeat.items.forEach(orderItem => {
            const existingCartItemIndex = newCart.findIndex(cartItem => cartItem.id === orderItem.id);

            if (existingCartItemIndex > -1) {
                newCart[existingCartItemIndex] = {
                    ...newCart[existingCartItemIndex],
                    quantity: newCart[existingCartItemIndex].quantity + orderItem.quantity
                };
            } else {
                newCart.push(orderItem);
            }
        });
        
        return newCart;
    });

    setIsCartOpen(true);
    setCurrentPage('products');
};

  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
      return PRODUCTS.filter(product => {
          const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
          const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
          return matchesCategory && matchesSearch;
      });
  }, [searchTerm, selectedCategory]);

  const renderPage = () => {
    switch (currentPage) {
      case 'checkout':
        return <Checkout total={total} onBack={() => setCurrentPage('products')} onOrderPlaced={handlePlaceOrder} />;
      case 'confirmation':
        return <OrderConfirmation lastOrder={lastOrder} onBackToProducts={() => setCurrentPage('products')} />;
      case 'history':
        return <OrderHistory orders={orders} onBack={() => setCurrentPage('products')} onOrderAgain={handleOrderAgain} />;
      case 'products':
      default:
        return (
          <ProductList
            products={filteredProducts}
            addToCart={handleAddToCart}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        );
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        onLogout={handleLogout}
        onNavigate={(page) => setCurrentPage(page)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        total={total}
      />
      <Footer />
    </div>
  );
}

export default App;