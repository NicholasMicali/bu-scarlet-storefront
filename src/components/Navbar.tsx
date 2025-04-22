
import { ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type NavbarProps = {
  cartCount: number;
  onCartClick: () => void;
};
export default function Navbar({ cartCount, onCartClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 bg-[#ea384c] py-4 shadow-md text-white">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <span className="font-extrabold text-2xl tracking-wide" style={{ letterSpacing: 2 }}>BU STORE</span>
        </Link>
        <div className="flex items-center gap-6">
          <button
            className="relative hover:bg-white/10 rounded-lg p-2 transition-colors"
            aria-label="cart"
            onClick={onCartClick}
          >
            <ShoppingCart size={28} />
            {cartCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-white text-[#ea384c] rounded-full px-2 py-0.5 text-xs font-bold border-2 border-[#ea384c]"
              >
                {cartCount}
              </span>
            )}
          </button>
          <Link to="/checkout">
            <button className="flex items-center gap-2 bg-white text-[#ea384c] font-bold px-4 py-2 rounded-lg shadow transition hover:bg-red-200 focus:outline-none">
              Checkout
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
