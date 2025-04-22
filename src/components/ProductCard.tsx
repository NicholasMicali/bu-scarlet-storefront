
import { Product } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

type CardProps = {
  product: Product;
  onAdd: () => void;
};
export default function ProductCard({ product, onAdd }: CardProps) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center glass">
      <img
        src={product.image}
        alt={product.name}
        className="h-40 w-40 object-contain rounded-lg mb-4"
        draggable={false}
        loading="lazy"
      />
      <h2 className="font-bold text-xl mb-1 text-center">{product.name}</h2>
      <p className="mb-2 text-[#ea384c] font-bold text-lg">${product.price}</p>
      <Button
        className="bg-[#ea384c] hover:bg-red-700 text-white font-bold w-full rounded-lg uppercase"
        onClick={onAdd}
      >
        Add to Cart
      </Button>
    </div>
  );
}
