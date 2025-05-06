import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash, ShoppingCart, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import Card, { CardContent } from '../components/ui/Card';
import { toast } from 'react-hot-toast';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * (1 - item.discount / 100) * item.quantity,
    0
  );
  
  const shipping = subtotal > 50 ? 0 : 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = () => {
    toast.success('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        <Card className="text-center py-12">
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <ShoppingCart size={64} className="text-gray-300" />
              <h2 className="text-2xl font-medium text-gray-700">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button
                variant="contained"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <div className="divide-y">
              <div className="p-4 bg-gray-50 text-gray-600 font-medium grid grid-cols-12 gap-4 hidden md:grid">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Subtotal</div>
              </div>

              {cartItems.map((item) => (
                <div key={item.id} className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Mobile Remove Button */}
                    <div className="absolute top-2 right-2 md:hidden">
                      <button
                        className="text-gray-400 hover:text-rose-600"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                    
                    {/* Product */}
                    <div className="md:col-span-6 flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="md:col-span-2 text-center">
                      <div className="flex flex-col md:items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {formatPrice(item.price * (1 - item.discount / 100))}
                        </div>
                        {item.discount > 0 && (
                          <div className="text-xs text-gray-500 line-through">
                            {formatPrice(item.price)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Quantity */}
                    <div className="md:col-span-2 flex justify-start md:justify-center">
                      <div className="flex items-center">
                        <button
                          className="p-1 rounded-l border border-gray-300 bg-gray-50 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => 
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value, 10) || 1
                            )
                          }
                          className="w-10 text-center border-t border-b border-gray-300 p-1"
                        />
                        <button
                          className="p-1 rounded-r border border-gray-300 bg-gray-50 hover:bg-gray-100"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Subtotal */}
                    <div className="md:col-span-2 flex md:justify-end items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {formatPrice(
                          item.price * (1 - item.discount / 100) * item.quantity
                        )}
                      </span>
                      
                      {/* Desktop Remove Button */}
                      <button
                        className="text-gray-400 hover:text-rose-600 ml-4 hidden md:block"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          <div className="flex justify-between mt-4">
            <Button
              variant="outlined"
              color="primary"
              onClick={() => navigate('/')}
            >
              Continue Shopping
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Trash size={16} />}
              onClick={() => {
                clearCart();
                toast.success('Cart cleared');
              }}
            >
              Clear Cart
            </Button>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent>
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-3 border-b pb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'Free' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">{formatPrice(tax)}</span>
                </div>
              </div>
              <div className="flex justify-between py-4 font-bold text-lg">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCheckout}
                className="mt-4"
              >
                Checkout
              </Button>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-4">
                <div className="font-medium mb-2">Accepted Payment Methods</div>
                <div className="flex space-x-2">
                  {['Visa', 'Mastercard', 'American Express', 'PayPal'].map((method) => (
                    <div
                      key={method}
                      className="px-2 py-1 bg-white border border-gray-200 rounded text-xs"
                    >
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;