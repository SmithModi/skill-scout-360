
import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="container grid gap-8 md:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Elegance</h3>
          <p className="text-sm text-muted-foreground">
            Discover timeless elegance with our handcrafted jewelry collection.
          </p>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Shop</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/products" className="hover:text-primary">All Products</Link>
            </li>
            <li>
              <Link to="/products?category=necklaces" className="hover:text-primary">Necklaces</Link>
            </li>
            <li>
              <Link to="/products?category=earrings" className="hover:text-primary">Earrings</Link>
            </li>
            <li>
              <Link to="/products?category=bracelets" className="hover:text-primary">Bracelets</Link>
            </li>
            <li>
              <Link to="/products?category=rings" className="hover:text-primary">Rings</Link>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Company</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-primary">About Us</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-primary">Careers</Link>
            </li>
            <li>
              <Link to="/blog" className="hover:text-primary">Blog</Link>
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Support</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/faq" className="hover:text-primary">FAQ</Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:text-primary">Shipping & Returns</Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">Terms & Conditions</Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mt-8 border-t pt-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Elegance. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">Facebook</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">Instagram</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary">
              <span className="sr-only">Twitter</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
