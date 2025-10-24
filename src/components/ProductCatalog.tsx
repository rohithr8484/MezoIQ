import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CheckoutDialog } from './CheckoutDialog';
import { products } from '@/data/products';
import type { Product } from '@/types/product';
import { ShoppingBag } from 'lucide-react';

export const ProductCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutOpen(true);
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 border border-primary/20 rounded-full mb-4">
            <ShoppingBag className="w-5 h-5 text-primary animate-bounce" />
            <span className="text-sm font-semibold text-primary">Shop with Crypto</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Product Catalog
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Shop with MUSD or BTC • Real-time oracle pricing • 2% cashback on every purchase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard
                product={product}
                onCheckout={handleCheckout}
              />
            </div>
          ))}
        </div>
      </div>

      <CheckoutDialog
        product={selectedProduct}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </section>
  );
};
