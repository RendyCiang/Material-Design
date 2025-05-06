import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share, Star, Truck, Package, RefreshCw, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import { toast } from 'react-hot-toast';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getProductById, products, loading } = useProducts();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = id ? getProductById(id) : undefined;
  
  const similarProducts = products
    .filter(p => p.category === product?.category && p.id !== product?.id)
    .slice(0, 4);

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success(`Added ${quantity} ${product.name} to cart`);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm">
          <a href="/" className="text-gray-500 hover:text-indigo-600">Home</a>
          <span className="mx-2 text-gray-400">/</span>
          <a href="/" className="text-gray-500 hover:text-indigo-600">{product.category}</a>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900 font-medium">{product.name}</span>
        </nav>

        {/* Product Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`
                    bg-gray-100 rounded-lg overflow-hidden cursor-pointer
                    ${i === 0 ? 'ring-2 ring-indigo-500' : ''}
                  `}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i + 1}`}
                    className="w-full h-auto object-cover aspect-square"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-indigo-600 font-medium mb-1">
                {product.category}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              
              {/* Product Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.floor(product.rating || 0)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.reviews} reviews
                </span>
              </div>
              
              {/* Product Price */}
              <div className="mb-4">
                {product.discount > 0 ? (
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {formatPrice(product.price * (1 - product.discount / 100))}
                    </span>
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <span className="ml-2 bg-rose-100 text-rose-800 text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </span>
                  </div>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {product.description}
              </p>
              
              {/* Stock Status */}
              <div className="flex items-center mb-4">
                {product.inStock ? (
                  <div className="flex items-center text-green-600">
                    <Check size={16} className="mr-1" />
                    <span className="text-sm font-medium">In Stock</span>
                  </div>
                ) : (
                  <div className="text-rose-600 text-sm font-medium">
                    Out of Stock
                  </div>
                )}
              </div>
            </div>
            
            {/* Add to Cart */}
            <div className="border-t border-b py-4 space-y-4">
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-4">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    className="p-2 rounded-l border border-gray-300 bg-gray-50 hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10) || 1)}
                    className="w-12 text-center border-t border-b border-gray-300 p-2"
                  />
                  <button
                    className="p-2 rounded-r border border-gray-300 bg-gray-50 hover:bg-gray-100"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<ShoppingCart size={20} />}
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Heart size={20} />}
                  fullWidth
                  onClick={() => toast.success('Added to favorites!')}
                >
                  Favorite
                </Button>
              </div>
            </div>
            
            {/* Shipping Info */}
            <div className="space-y-3">
              <div className="flex items-center">
                <Truck size={20} className="text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Free shipping on orders over $50
                </span>
              </div>
              <div className="flex items-center">
                <Package size={20} className="text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">
                  Secure packaging to protect your purchase
                </span>
              </div>
              <div className="flex items-center">
                <RefreshCw size={20} className="text-gray-600 mr-2" />
                <span className="text-sm text-gray-700">
                  30-day easy returns
                </span>
              </div>
            </div>
            
            {/* Share */}
            <div className="flex items-center space-x-4 pt-4">
              <span className="text-sm font-medium text-gray-700">Share:</span>
              <button className="text-gray-500 hover:text-indigo-600">
                <Share size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="border-t pt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;