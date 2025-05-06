import React from 'react';
import { ArrowRight, Package, ShieldCheck, Truck, Clock } from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const { featuredProducts, newArrivals, loading } = useProducts();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Discover Amazing Products for Your Lifestyle
              </h1>
              <p className="text-lg opacity-90">
                Find the perfect items to enhance your everyday life. From electronics to home goods, we've got you covered.
              </p>
              <div className="pt-4">
                <Button
                  color="secondary"
                  size="large"
                  endIcon={<ArrowRight size={18} />}
                  onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
                >
                  Shop Now
                </Button>
              </div>
            </div>
            <div className="relative hidden md:block">
              <div className="aspect-[4/3] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl transform rotate-2">
                <img
                  src="https://images.pexels.com/photos/1548274/pexels-photo-1548274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Featured products"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 aspect-square w-48 bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-xl transform -rotate-3">
                <img
                  src="https://images.pexels.com/photos/322207/pexels-photo-322207.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Featured product"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Truck className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Free Shipping</h3>
                <p className="text-gray-600 text-sm">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <ShieldCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Secure Payment</h3>
                <p className="text-gray-600 text-sm">100% protected payments</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Package className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">Easy Returns</h3>
                <p className="text-gray-600 text-sm">30-day return policy</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg mb-1">24/7 Support</h3>
                <p className="text-gray-600 text-sm">Customer support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of the best products on sale. Limited time offers at amazing prices.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              variant="outlined"
              endIcon={<ArrowRight size={18} />}
            >
              View All Featured Products
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Check out our latest products. Be the first to get your hands on our newest items.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button
              variant="outlined"
              endIcon={<ArrowRight size={18} />}
            >
              View All New Arrivals
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
            <p className="mb-6 opacity-90">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button color="secondary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;