
import { CartItem } from "@/hooks/useCart";
import { X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
};

export default function CartSheet({
  open,
  onClose,
  items,
  remove,
  updateQty,
}: Props) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-30 flex justify-end bg-black/30 transition-opacity duration-200 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div className="w-full max-w-md h-full bg-white shadow-2xl px-6 py-6 flex flex-col transition-transform duration-300 transform glass morphism relative">
        <button className="absolute top-4 right-4 p-2" onClick={onClose} title="Close cart">
          <X size={24} />
        </button>
        <h2 className="text-2xl font-bold mb-4 text-[#ea384c]">Your Cart</h2>
        <div className="flex-1 overflow-y-auto pr-1">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center mt-28">Your cart is empty.</p>
          ) : (
            items.map(item => (
              <div className="flex items-center justify-between mb-6 gap-4" key={item.id}>
                <img src={item.image} alt={item.name} className="h-16 w-16 object-contain rounded" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-[#ea384c] font-bold">${item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={e => updateQty(item.id, Number(e.target.value))}
                      className="w-14 border rounded p-1 text-center"
                    />
                    <span className="ml-1 text-gray-400 text-sm">x</span>
                  </div>
                </div>
                <button
                  className="ml-2 hover:text-red-500 text-gray-400"
                  onClick={() => remove(item.id)}
                  title="Remove"
                >
                  <X size={18} />
                </button>
              </div>
            ))
          )}
        </div>
        <div className="border-t pt-4 mt-4 flex flex-col gap-2">
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span className="text-[#ea384c]">${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <Button
              className="w-full mt-3 bg-[#ea384c] hover:bg-red-700 text-white font-bold uppercase"
              disabled={items.length === 0}
              onClick={onClose}
            >
              Checkout <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
