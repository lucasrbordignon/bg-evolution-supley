import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { CartItem, Product } from '../types';
import { formatCurrency } from '@/utils';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, flavor?: string) => void;
  removeItem: (productId: string, flavor?: string) => void;
  updateQuantity: (productId: string, quantity: number, flavor?: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isCartOpen: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const savedCart = sessionStorage.getItem('titan_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart from session', e);
      }
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem('titan_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, flavor?: string) => {
    const selectedFlavor = flavor || (product.flavors && product.flavors.length === 1 ? product.flavors[0] : undefined);
    
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id && item.selectedFlavor === selectedFlavor);
      
      if (existing) {
        return prev.map((item) =>
          (item.id === product.id && item.selectedFlavor === selectedFlavor)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedFlavor }];
    });
    setIsCartOpen(true);
  };

  const removeItem = (productId: string, flavor?: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === productId && item.selectedFlavor === flavor)));
  };

  const updateQuantity = (productId: string, quantity: number, flavor?: string) => {
    if (quantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        (item.id === productId && item.selectedFlavor === flavor) ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const finishPurchase = () => {
    if (items.length === 0) return;

    const phoneNumber = '5515998165505';

    let message = 
      'Olá, selecionei esses produtos no catálogo. ' +
      'Poderia checar a disponibilidade e dar andamento ao meu pedido?\n\n';

    items.forEach((item) => {
      const subtotal = item.price * item.quantity;

      message +=
        `*${item.name} - ${item.brand}*\n` +
        (item.selectedFlavor ? `Sabor: ${item.selectedFlavor}\n` : '') +
        `Quantidade: ${item.quantity}\n` +
        `Valor unitário: ${formatCurrency(item.price)}\n` +
        `Subtotal: ${formatCurrency(subtotal)}\n\n`;
    });

    message += `*Total do pedido: ${formatCurrency(total)}*`;

    const encodedMessage = encodeURIComponent(message);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        total,
        itemCount,
        isCartOpen,
        toggleCart,
        finishPurchase,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};