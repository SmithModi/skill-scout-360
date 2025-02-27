
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CheckCircle, ShoppingBag } from "lucide-react";

export default function OrderSuccessPage() {
  return (
    <Container className="py-12">
      <div className="mx-auto max-w-md text-center">
        <CheckCircle className="mx-auto mb-4 h-16 w-16 text-green-500" />
        <h1 className="mb-2 text-3xl font-bold">Order Successful!</h1>
        <p className="mb-6 text-muted-foreground">
          Thank you for your purchase. Your order has been confirmed and will be shipped soon.
        </p>
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-xl font-medium">What's Next?</h2>
          <p className="mb-4 text-sm text-muted-foreground">
            You will receive an email confirmation with your order details and tracking information once your item(s) have been shipped.
          </p>
          <div className="grid gap-4">
            <Link to="/products">
              <Button className="w-full">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
}
