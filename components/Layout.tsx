import React from 'react';
import { ShoppingCart, Menu, X, Dumbbell, Search, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { itemCount, toggleCart } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-brand-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link to="/" className="flex items-center gap-2 group">
            <Dumbbell className="h-8 w-8 text-brand-yellow group-hover:rotate-12 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-display font-bold text-2xl tracking-tighter text-white leading-none">
                BG EVOLUTION
              </span>
              <span className="text-[10px] tracking-[0.3em] text-brand-yellow font-bold uppercase">
                Suppley
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-bold uppercase tracking-wide hover:text-brand-yellow transition-colors ${isActive('/') ? 'text-brand-yellow' : 'text-gray-300'}`}
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className={`text-sm font-bold uppercase tracking-wide hover:text-brand-yellow transition-colors ${isActive('/catalog') ? 'text-brand-yellow' : 'text-gray-300'}`}
            >
              Produtos
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-300 hover:text-brand-yellow transition-colors group"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-yellow text-brand-black text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                  {itemCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-brand-black border-t border-white/10 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 text-base font-bold text-white hover:text-brand-yellow uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/catalog" 
              className="block px-3 py-2 text-base font-bold text-white hover:text-brand-yellow uppercase"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Produtos
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const CartDrawer: React.FC = () => {
  const { isCartOpen, toggleCart, items, removeItem, updateQuantity, total, finishPurchase } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
        onClick={toggleCart}
      />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-brand-gray border-l border-white/10 flex flex-col h-full shadow-2xl">
          
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-brand-black">
            <h2 className="text-xl font-display font-bold text-white uppercase tracking-wide">
              Seu Carrinho
            </h2>
            <button onClick={toggleCart} className="text-gray-400 hover:text-white transition-colors">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <ShoppingCart className="h-16 w-16 opacity-20" />
                <p className="text-lg font-medium">Seu carrinho está vazio</p>
                <Link 
                  to="/catalog" 
                  onClick={toggleCart}
                  className="px-6 py-2 bg-brand-yellow text-brand-black font-bold uppercase tracking-wider text-sm hover:bg-white transition-colors rounded-lg"
                >
                  Ver Produtos
                </Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map((item, index) => (
                  <li key={`${item.id}-${item.selectedFlavor || 'default'}-${index}`} className="flex py-2 animate-fadeIn">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-white/10 bg-white">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex justify-between text-base font-bold text-white">
                          <h3 className="line-clamp-2 pr-4">{item.name}</h3>
                          <p className="ml-4 text-brand-yellow">{formatCurrency(item.price * item.quantity)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-400">{item.brand}</p>
                        {item.selectedFlavor && (
                           <p className="text-xs text-brand-yellow mt-0.5 uppercase font-bold tracking-wider">
                             Sabor: {item.selectedFlavor}
                           </p>
                        )}
                      </div>
                      <div className="flex items-end justify-between text-sm">
                        <div className="flex items-center border border-white/20 rounded">
                          <button 
                            className="px-2 py-1 text-gray-400 hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedFlavor)}
                          >
                            -
                          </button>
                          <span className="px-2 text-white font-mono">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 text-gray-400 hover:text-white"
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedFlavor)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id, item.selectedFlavor)}
                          className="font-medium text-red-500 hover:text-red-400 text-xs uppercase tracking-wide"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-white/10 px-6 py-6 bg-brand-black">
              <div className="flex justify-between text-base font-medium text-white mb-4">
                <p className="uppercase tracking-wide text-gray-400">Subtotal</p>
                <p className="font-display text-xl font-bold text-brand-yellow">{formatCurrency(total)}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-500 mb-6">
                Frete e impostos calculados no checkout.
              </p>
              <button
                className="w-full flex items-center justify-center rounded-lg bg-brand-yellow px-6 py-4 text-base font-bold text-brand-black shadow-sm hover:bg-white transition-colors uppercase tracking-widest group "
                onClick={finishPurchase}
              >
                Finalizar Compra
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-brand-black text-white selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        {children}
      </main>
      <footer className="bg-black border-t border-white/10 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400 text-sm">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="h-6 w-6 text-brand-yellow" />
                <span className="font-display font-bold text-lg text-white">BG EVOLUTION SUPLEY</span>
              </div>
              <p>O combustível para sua evolução física e mental!</p>
            </div>
            <div>
              <h3 className="font-bold text-white uppercase tracking-wider mb-4">Links Rápidos</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="hover:text-brand-yellow transition-colors">Home</Link></li>
                <li><Link to="/catalog" className="hover:text-brand-yellow transition-colors">Catálogo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white uppercase tracking-wider mb-4">Contato</h3>
              <ul className="space-y-2">
                <li><strong>Gustavo: </strong>(15) 99816-5505</li>
                <li><strong>Rafael: </strong>(15) 99654-3544</li>
                <li>Laranjhal Paulista, SP</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs text-gray-600">
            <a href="https://www.lrb.dev.br" target="_blank" rel="noopener noreferrer" className="hover:text-brand-yellow transition-colors">
              © 2025 lrb softwares. Todos os direitos reservados.
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};