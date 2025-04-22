
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartState, PRODUCTS } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const cartState = useCartState();

  // Simulate the cart being passed here. In a real app, this would probably be global or via context.
  // For this fake checkout, just show the filled cart if any.
  const items = cartState.cart.length ? cartState.cart : [];

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [form, setForm] = useState({ name: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "Order Confirmed!",
      description: "Thank you for your order!",
    });
    setTimeout(() => {
      cartState.clearCart();
      navigate("/");
    }, 1800);
  }

  if (submitted)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#ea384c]">
        <div className="bg-white rounded-2xl glass p-8 shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-[#ea384c] mb-4">Thank you for your order!</h2>
          <p className="text-gray-800 mb-1">Check your inbox for a receipt.</p>
          <Button className="mt-6" onClick={() => navigate("/")}>Back to Store</Button>
        </div>
      </div>
    );

  return (
    <div className="bg-[#ea384c] min-h-screen py-10 flex flex-col items-center">
      <div className="bg-white max-w-lg w-full rounded-2xl p-8 shadow-lg glass">
        <h1 className="text-3xl font-bold mb-6 text-[#ea384c] text-center">Checkout</h1>
        {items.length === 0 ? (
          <p className="mb-4 text-center text-gray-700">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mb-5 divide-y">
              {items.map(item => (
                <li key={item.id} className="py-3 flex justify-between items-center">
                  <span>{item.name} <span className="text-gray-400 text-sm">x{item.quantity}</span></span>
                  <span className="font-semibold text-[#ea384c]">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total:</span>
              <span className="text-[#ea384c]">${total.toFixed(2)}</span>
            </div>
            <form onSubmit={handleOrder} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Your Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#ea384c] focus:border-[#ea384c] outline-none"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-[#ea384c] focus:border-[#ea384c] outline-none"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              />
              <Button
                className="bg-[#ea384c] hover:bg-red-700 text-white font-bold w-full uppercase"
                type="submit"
              >
                Confirm Order
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
