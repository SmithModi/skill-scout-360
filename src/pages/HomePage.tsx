
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { ArrowRight, Diamond, Shield, Truck } from "lucide-react";
import { ProductCard } from "@/components/ui/product-card";
import { useShop } from "@/context/shop-context";
import { products } from "@/data/products";

export default function HomePage() {
  const { addToCart, addToWishlist } = useShop();
  
  // Featured products - just grab first 3 for demo
  const featuredProducts = products.slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-secondary/50 to-background py-16">
        <Container className="grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Discover Timeless <span className="text-primary">Elegance</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Handcrafted jewelry that celebrates individuality and style, creating memories that last a lifetime.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/products">
                <Button size="lg">
                  Shop Collection
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Our Story
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000"
              alt="Elegant jewelry"
              className="h-full w-full object-cover"
            />
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold">Shop by Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link
              to="/products?category=necklaces"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000"
                alt="Necklaces"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-medium text-white">Necklaces</h3>
              </div>
            </Link>
            <Link
              to="/products?category=earrings"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1630020352937-3be58883df99?q=80&w=1000"
                alt="Earrings"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-medium text-white">Earrings</h3>
              </div>
            </Link>
            <Link
              to="/products?category=bracelets"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?q=80&w=1000"
                alt="Bracelets"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-medium text-white">Bracelets</h3>
              </div>
            </Link>
            <Link
              to="/products?category=rings"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1000"
                alt="Rings"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity group-hover:bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-medium text-white">Rings</h3>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-secondary/20">
        <Container>
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Collection</h2>
            <Link to="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onAddToWishlist={addToWishlist}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <h2 className="mb-12 text-center text-3xl font-bold">Why Choose Us</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Diamond className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Quality Craftsmanship</h3>
              <p className="text-muted-foreground">
                Each piece is handcrafted using the finest materials and attention to detail.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Free Shipping</h3>
              <p className="text-muted-foreground">
                Enjoy free shipping on all orders over $50, with secure packaging.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-medium">Lifetime Warranty</h3>
              <p className="text-muted-foreground">
                Our commitment to quality includes a lifetime warranty on all jewelry.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
