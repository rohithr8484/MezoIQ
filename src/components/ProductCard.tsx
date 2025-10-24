import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Loader2, Wallet } from 'lucide-react';
import type { Product } from '@/types/product';
import { useProductPricing } from '@/hooks/useProductPricing';
import { useAccount } from 'wagmi';

interface ProductCardProps {
  product: Product;
  onCheckout: (product: Product) => void;
}

export const ProductCard = ({ product, onCheckout }: ProductCardProps) => {
  const { pricing, isLoading } = useProductPricing(product.priceUSD);
  const { isConnected } = useAccount();

  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 hover:shadow-glow transition-all duration-500 animate-fade-in-up">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <Badge className="absolute top-3 right-3 bg-primary/90 backdrop-blur-sm">
          {product.category}
        </Badge>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-2 p-4 bg-secondary/30 rounded-lg border border-border/30">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">USD</span>
              <span className="text-lg font-bold text-foreground">
                ${pricing.usd.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">MUSD</span>
              <span className="text-md font-semibold text-primary">
                {pricing.musd.toFixed(4)} MUSD
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">BTC</span>
              <span className="text-md font-semibold text-accent">
                ₿{pricing.btc.toFixed(8)}
              </span>
            </div>
          </div>
        )}

        {!isConnected && (
          <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg text-center">
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
              <Wallet className="w-4 h-4" />
              Connect wallet to purchase
            </p>
          </div>
        )}
        
        <Button
          onClick={() => onCheckout(product)}
          className="w-full gap-2 group/btn"
          disabled={isLoading}
        >
          <ShoppingCart className="w-4 h-4 group-hover/btn:animate-bounce" />
          {isConnected ? 'Buy Now' : 'Connect & Buy'}
        </Button>
      </div>
    </Card>
  );
};
