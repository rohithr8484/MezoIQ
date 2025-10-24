import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CheckoutDialog } from './CheckoutDialog';
import { NetworkBadge } from './NetworkBadge';
import { WalletConnectButton } from './WalletConnectButton';
import { products } from '@/data/products';
import type { Product } from '@/types/product';
import { ShoppingBag } from 'lucide-react';
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
          
          {!isConnected && (
            <div className="max-w-2xl mx-auto mt-6 p-6 bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-xl shadow-glow animate-fade-in">
              <div className="space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2">Connect Your Wallet</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect to Mezo Mainnet via <span className="text-primary font-semibold">Boar Network</span> to start shopping
                  </p>
                </div>
                
                <div className="bg-background/50 backdrop-blur-sm p-4 rounded-lg border border-border/50">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-500 rounded-full mt-2 animate-pulse" />
                    <div className="flex-1 space-y-2">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Boar Network RPC</p>
                      <div className="font-mono text-xs text-primary break-all bg-primary/5 p-2 rounded border border-primary/20">
                        81YcmV8cjuhVuCdoidBcGlWIC0rSfy4c
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Network: <span className="text-foreground font-semibold">Mezo Mainnet</span> (Chain ID: 31612)
                      </p>
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
