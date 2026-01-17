import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CheckoutDialog } from './CheckoutDialog';
import { WalletConnectButton } from './WalletConnectButton';
import { products } from '@/data/products';
import type { Product } from '@/types/product';
import { ShoppingBag, Wallet } from 'lucide-react';
import { useMezoWallet } from '@/hooks/useMezoWallet';

export const ProductCatalog = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const { isConnected } = useMezoWallet();

  const handleCheckout = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutOpen(true);
  };

  return (
    <section className="relative py-16 md:py-24 px-4 overflow-hidden bg-background">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-20 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-primary/5 rounded-full blur-[100px] md:blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-16 space-y-3 md:space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium animate-fade-in">
            <ShoppingBag className="w-4 h-4 inline mr-2" />
            Marketplace
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-foreground animate-fade-in-up">
            Product Catalog
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in-up px-4" style={{ animationDelay: '0.1s' }}>
            Pay with MUSD or BTC • Real-time pricing • 2% cashback rewards
          </p>
          
          {!isConnected && (
            <div className="max-w-xl mx-auto mt-6 md:mt-8 p-5 md:p-6 glass-card rounded-xl md:rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
                  <Wallet className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="text-base md:text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
                  <p className="text-xs md:text-sm text-muted-foreground mb-4">
                    Connect to Mezo Mainnet to start shopping
                  </p>
                </div>
                
                <div className="bg-card/50 p-3 md:p-4 rounded-lg md:rounded-xl border border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-muted-foreground">Network</p>
                      <p className="text-xs md:text-sm font-semibold text-foreground truncate">Mezo Mainnet (Chain ID: 31612)</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-center pt-2">
                  <WalletConnectButton />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="animate-fade-in-up"
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
