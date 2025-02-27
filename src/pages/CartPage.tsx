
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { CartItemCard } from "@/components/ui/cart-item";
import { Button } from "@/components/ui/button";
import { ShoppingBag, CreditCard } from "lucide-react";
import { useShop } from "@/context/shop-context";
import { initRazorpayPayment, createRazorpayOrder } from "@/services/razorpay";
import { toast } from "@/hooks/use-toast";

export default function CartPage() {
  const { cart, removeFromCart, updateCartItemQuantity, cartTotal, clearCart } = useShop();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // In a real app, this would be an API call to your backend
      const orderId = await createRazorpayOrder(cartTotal * 100);
      
      await initRazorpayPayment(
        {
          key: "rzp_test_YourRazorpayKeyHere", // Replace with your actual test key
          amount: cartTotal * 100, // amount in paisa
          currency: "INR",
          name: "Elegance Jewelry",
          description: "Thank you for your purchase!",
          image: "https://your-logo-url.com/logo.png", // Replace with your logo URL
          order_id: orderId,
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        },
        (response) => {
          // Payment success
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          });
          clearCart();
          navigate("/order-success");
        },
        (error) => {
          // Payment failure
          toast({
            title: "Payment Failed",
            description: error.description || "Please try again later.",
            variant: "destructive",
          });
        }
      );
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout Failed",
        description: "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Container className="py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      
      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
          <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
          <p className="mb-6 text-muted-foreground">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={updateCartItemQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          </div>
          
          <div className="rounded-lg border p-6">
            <h2 className="mb-4 text-xl font-medium">Order Summary</h2>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>FREE</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="font-medium">Total</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <Button
              className="mt-6 w-full"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              {isProcessing ? "Processing..." : "Checkout"}
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
