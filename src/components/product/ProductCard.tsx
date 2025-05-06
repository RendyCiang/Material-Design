import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { Product } from '../../types';
import Card, { CardMedia, CardContent, CardActions } from '../ui/Card';
import Button from '../ui/Button';
import { toast } from 'react-hot-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    toast.success(`Added ${product.name} to cart`);
  };

  const handleProductClick = () => {
    navigate(`/products/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return (
    <Card elevation={1} onClick={handleProductClick} className="h-full">
      <div className="relative">
        <CardMedia 
          image={product.image} 
          alt={product.name} 
          aspectRatio="1/1"
        />
        <button
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white text-gray-600 hover:text-rose-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            toast.success('Added to favorites!');
          }}
        >
          <Heart size={18} />
        </button>
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-rose-600 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <CardContent>
        <div className="text-xs text-indigo-600 font-medium mb-1">
          {product.category}
        </div>
        <h3 className="font-medium text-gray-900 line-clamp-1 mb-1">
          {product.name}
        </h3>
        <div className="flex items-baseline">
          <span className="text-gray-900 font-bold">
            {formatPrice(product.price * (1 - product.discount / 100))}
          </span>
          {product.discount > 0 && (
            <span className="ml-2 text-gray-500 text-sm line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        {product.rating && (
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-amber-400'
                      : 'text-gray-300'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviews})
            </span>
          </div>
        )}
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          startIcon={<ShoppingCart size={16} />}
          onClick={handleAddToCart}
          fullWidth
          className="mt-2"
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;