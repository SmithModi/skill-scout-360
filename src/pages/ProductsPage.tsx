
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductCard, Product } from "@/components/ui/product-card";
import { useShop } from "@/context/shop-context";
import { products } from "@/data/products";
import { Container } from "@/components/ui/container";

export default function ProductsPage() {
  const location = useLocation();
  const { addToCart, addToWishlist } = useShop();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get("category");
    
    if (category) {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [location.search]);

  return (
    <Container className="py-8">
      <h1 className="mb-8 text-3xl font-bold">Our Collection</h1>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={addToCart}
            onAddToWishlist={addToWishlist}
          />
        ))}
      </div>
    </Container>
  );
}
