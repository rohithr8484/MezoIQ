import { useState } from 'react';
import { ProductCard } from './ProductCard';
import { CheckoutDialog } from './CheckoutDialog';
import { WalletConnectButton } from './WalletConnectButton';
import { products, nftProducts, otherProducts } from '@/data/products';
import type { Product } from '@/types/product';
import { ShoppingBag, Wallet, Sparkles, Cpu, Wrench, Filter } from 'lucide-react';
import { useMezoWallet } from '@/hooks/useMezoWallet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | 'nft' | 'hardware' | 'software' | 'service';

const categoryFilters: { id: CategoryFilter; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'All', icon: Filter },
  { id: 'nft', label: 'NFTs', icon: Sparkles },
  { id: 'hardware', label: 'Hardware', icon: Cpu },
  { id: 'software', label: 'Software', icon: ShoppingBag },
  { id: 'service', label: 'Services', icon: Wrench },
];

const rarityColors: Record<string, string> = {
  common: 'bg-muted text-muted-foreground',
  rare: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  epic: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  legendary: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export const MarketplaceSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const { isConnected } = useMezoWallet();

  const handleCheckout = (product: Product) => {
    setSelectedProduct(product);
    setCheckoutOpen(true);
  };

  const filteredProducts = activeFilter === 'all' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <section className="py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <ShoppingBag className="w-4 h-4" />
            Marketplace
          </span>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground">
            NFTs & Digital Assets
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover exclusive NFTs and digital products. Pay with MUSD or BTC • Real-time pricing • 2% cashback rewards
          </p>
        </div>

        {/* Connect Wallet Prompt */}
        {!isConnected && (
          <div className="max-w-xl mx-auto mb-10 p-6 glass-card rounded-2xl animate-fade-in-up">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Connect to Mezo Mainnet to start shopping
                </p>
              </div>
              <WalletConnectButton />
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categoryFilters.map((filter) => {
            const Icon = filter.icon;
            const isActive = activeFilter === filter.id;
            const count = filter.id === 'all' 
              ? products.length 
              : products.filter(p => p.category === filter.id).length;
            
            return (
              <Button
                key={filter.id}
                variant={isActive ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className={cn(
                  'gap-2',
                  isActive && 'bg-primary text-primary-foreground'
                )}
              >
                <Icon className="w-4 h-4" />
                {filter.label}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {count}
                </Badge>
              </Button>
            );
          })}
        </div>

        {/* NFT Featured Section */}
        {(activeFilter === 'all' || activeFilter === 'nft') && nftProducts.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-bold">Featured NFTs</h2>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {nftProducts.length} items
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeFilter === 'nft' ? nftProducts : nftProducts.slice(0, 3)).map((product, index) => (
                <div
                  key={product.id}
                  className="relative group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {product.rarity && (
                    <Badge 
                      className={cn(
                        'absolute top-4 right-4 z-10 border',
                        rarityColors[product.rarity]
                      )}
                    >
                      {product.rarity.charAt(0).toUpperCase() + product.rarity.slice(1)}
                    </Badge>
                  )}
                  {product.collection && (
                    <Badge 
                      variant="outline"
                      className="absolute top-4 left-4 z-10 bg-background/80 backdrop-blur-sm"
                    >
                      {product.collection}
                    </Badge>
                  )}
                  <ProductCard
                    product={product}
                    onCheckout={handleCheckout}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Products */}
        {(activeFilter === 'all' ? otherProducts.length > 0 : activeFilter !== 'nft' && filteredProducts.length > 0) && (
          <div>
            {activeFilter === 'all' && (
              <div className="flex items-center gap-3 mb-6">
                <Cpu className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Products & Services</h2>
                <Badge className="bg-primary/10 text-primary border-primary/20">
                  {otherProducts.length} items
                </Badge>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(activeFilter === 'all' ? otherProducts : filteredProducts).map((product, index) => (
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
        )}

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
            <p className="text-muted-foreground">Try selecting a different category</p>
          </div>
        )}
      </div>

      <CheckoutDialog
        product={selectedProduct}
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
      />
    </section>
  );
};
