import React from 'react';
import { Plus, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (product.flavors && product.flavors.length > 1) {
      navigate(`/product/${product.id}`);
    } else {
      addItem(product);
    }
  };

  const goToDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div 
      onClick={goToDetails}
      className="group relative bg-brand-gray border border-white/5 hover:border-brand-yellow/50 transition-all duration-300 flex flex-col h-full overflow-hidden cursor-pointer rounded-lg"
    >
      {product.featured && (
        <span className="absolute top-2 left-2 z-10 bg-brand-yellow text-brand-black text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
          Destaque
        </span>
      )}

      <div className="aspect-square w-full overflow-hidden bg-white relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-contain object-center group-hover:scale-105 transition-transform duration-500 p-4"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">{product.brand}</p>
        <h3 className="text-sm font-bold text-white uppercase leading-tight mb-2 min-h-[2.5rem]">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">A partir de</span>
            <span className="text-lg font-display font-bold text-brand-yellow">
              {formatCurrency(product.price)}
            </span>
          </div>
          
          <button
            onClick={handleAction}
            className="h-10 w-10 bg-white text-brand-black flex items-center justify-center hover:bg-brand-yellow transition-colors rounded-lg"
            aria-label={product.flavors && product.flavors.length > 1 ? "Ver opções" : "Adicionar ao carrinho"}
          >
            {product.flavors && product.flavors.length > 1 ? (
              <Eye className="h-5 w-5" />
            ) : (
              <Plus className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};