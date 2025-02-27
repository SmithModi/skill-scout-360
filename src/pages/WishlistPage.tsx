
import React from "react";
import { Container } from "@/components/ui/container";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "@/context/shop-context";

export default function WishlistPage() {
  const { wishlist, addToCart, removeFromWishlist, addToWishlist } = useShop();

  return (
    <Container className="py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-medium">Your wishlist is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Save items you love for later by clicking the heart icon.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {wishlist.map((product) => (
            <div key={product.id} className="relative">
              <ProductCard
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-2 z-10 bg-background/80 backdrop-blur-sm"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}
