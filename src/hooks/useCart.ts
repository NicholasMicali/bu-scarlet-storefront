
import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
};

export type CartItem = Product & { quantity: number };

const PRODUCTS: Product[] = [
  {
    id: "notebook",
    name: "BU Notebook",
    image: "/lovable-uploads/2d5a0ac6-11ce-4552-af25-b60da23b2960.png",
    price: 10,
  },
  {
    id: "mug",
    name: "BU Proud Parent Mug",
    image: "/lovable-uploads/70fe1e60-f71e-45ed-b1f4-5a170ef7b877.png",
    price: 14,
  },
  {
    id: "crewneck",
    name: "BU Crewneck",
    image: "/lovable-uploads/844942ac-adff-4130-a486-4ec01285189e.png",
    price: 45,
  },
  {
    id: "shirt",
    name: "BU T-Shirt",
    image: "/lovable-uploads/c9e58c27-feda-4c13-8a62-99346c901c75.png",
    price: 25,
  },
  {
    id: "hoodie",
    name: "BU Hoodie",
    image: "/lovable-uploads/ba006da8-11c3-4fd6-b9e9-403f74e94402.png",
    price: 60,
  },
  {
    id: "backpack",
    name: "BU Nike Backpack",
    image: "/lovable-uploads/ce778669-cb3e-4059-a19f-e583515d4e48.png",
    price: 48,
  },
];

export function useCartState() {
  const [cart, setCart] = useState<CartItem[]>([]);

  function addToCart(product: Product) {
    setCart(items => {
      const idx = items.findIndex(item => item.id === product.id);
      if (idx !== -1) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...items, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(pid: string) {
    setCart(items => items.filter(item => item.id !== pid));
  }

  function updateQuantity(pid: string, quantity: number) {
    setCart(items =>
      items.map(item =>
        item.id === pid ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

export { PRODUCTS };
