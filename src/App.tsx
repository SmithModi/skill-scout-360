
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { ShopProvider } from "@/context/shop-context";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import "./App.css";
import { useShop } from "@/context/shop-context";

// Wrapper component to use the shop context
function AppContent() {
  const { cartCount, wishlistCount } = useShop();

  return (
    <Router>
      <div className="flex min-h-screen flex-col">
        <Navbar cartItemsCount={cartCount} wishlistItemsCount={wishlistCount} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/order-success" element={<OrderSuccessPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
}

function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}

export default App;
