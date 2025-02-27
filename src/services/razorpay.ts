
export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description?: string;
  image?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
    method?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
    backdrop_color?: string;
    hide_topbar?: boolean;
  };
  modal?: {
    confirm_close?: boolean;
    animation?: boolean;
    backdropclose?: boolean;
    handleback?: boolean;
    escape?: boolean;
  };
  send_sms_hash?: boolean;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Dynamically load Razorpay script
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

// Initialize Razorpay payment
export const initRazorpayPayment = async (
  options: RazorpayOptions,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
): Promise<void> => {
  const scriptLoaded = await loadRazorpayScript();
  
  if (!scriptLoaded) {
    onError(new Error("Failed to load Razorpay script"));
    return;
  }
  
  const razorpay = new window.Razorpay({
    ...options,
    handler: (response: any) => {
      onSuccess(response);
    },
  });
  
  razorpay.on("payment.failed", (error: any) => {
    onError(error);
  });
  
  razorpay.open();
};

// This function would be called from a backend service that creates an order
// For demo purposes, we're mocking it here
export const createRazorpayOrder = async (amount: number): Promise<string> => {
  // In a real application, this would make an API call to your backend
  // which would interact with Razorpay's API to create an order
  
  // For demo purposes, we're returning a mock order ID
  return `order_${Math.random().toString(36).substring(2, 15)}`;
};
