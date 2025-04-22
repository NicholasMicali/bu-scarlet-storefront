
import { useState } from "react";
import { PRODUCTS, useCartState } from "@/hooks/useCart";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import CartSheet from "@/components/CartSheet";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const cartState = useCartState();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="bg-[#ea384c] min-h-screen pb-10 flex flex-col">
      <Navbar cartCount={cartState.cart.reduce((a, b) => a + b.quantity, 0)} onCartClick={() => setCartOpen(true)} />
      <main className="max-w-6xl w-full mx-auto flex-1 px-3 py-12">
        <h1 className="text-white font-extrabold text-4xl sm:text-5xl mb-10 text-center drop-shadow-lg tracking-wider">Boston University Merch</h1>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => {
                cartState.addToCart(product);
                toast({
                  title: `${product.name} added to cart!`,
                  description: "Go to cart or checkout to view your items.",
                });
              }}
            />
          ))}
        </div>
      </main>
      <CartSheet
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartState.cart}
        remove={cartState.removeFromCart}
        updateQty={cartState.updateQuantity}
      />
      <footer className="text-center py-5 text-sm text-white/80">
        &copy; {new Date().getFullYear()} Boston University Store. Not affiliated with Boston University.
      </footer>
    </div>
  );
};
export default Index;
