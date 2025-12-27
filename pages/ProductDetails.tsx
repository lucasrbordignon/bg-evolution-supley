import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Minus, Plus, ShoppingCart, Check, AlertCircle } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id);
  
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'nutritional'>('description');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product) {
      if (product.flavors && product.flavors.length === 1) {
        setSelectedFlavor(product.flavors[0]);
      } else if (!product.flavors || product.flavors.length === 0) {
        setSelectedFlavor('Padrão');
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-bold text-white mb-4">Produto não encontrado</h2>
        <button 
          onClick={() => navigate('/catalog')}
          className="text-brand-yellow hover:underline"
        >
          Voltar para o catálogo
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product.flavors && product.flavors.length > 1 && !selectedFlavor) {
      setError('Por favor, selecione um sabor.');
      return;
    }
    
    for(let i = 0; i < quantity; i++) {
        addItem(product, selectedFlavor);
    }
    setError('');
  };

  const hasFlavors = product.flavors && product.flavors.length > 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-brand-yellow transition-colors mb-8 text-sm uppercase font-bold tracking-wide"
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white rounded-lg p-8 flex items-center justify-center aspect-square lg:aspect-auto lg:h-[600px] border border-white/5">
          <img 
            src={product.image} 
            alt={product.name} 
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <div className="flex flex-col">
          <p className="text-brand-yellow font-bold uppercase tracking-wider text-sm mb-2">
            {product.brand}
          </p>
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white uppercase mb-4 leading-none">
            {product.name}
          </h1>
          <p className="text-gray-400 text-lg mb-8 leading-relaxed border-b border-white/10 pb-8">
            {product.description}
          </p>

          <div className="mb-8">
            <span className="text-4xl font-display font-bold text-white">
              {formatCurrency(product.price)}
            </span>
            {/* <span className="text-gray-500 text-sm ml-2">ou 3x de {formatCurrency(product.price / 3)} sem juros</span> */}
          </div>

          {hasFlavors && product.flavors!.length > 1 && (
            <div className="mb-8">
              <h3 className="text-sm font-bold text-white uppercase mb-3">Escolha o Sabor:</h3>
              <div className="flex flex-wrap gap-3">
                {product.flavors!.map((flavor) => (
                  <button
                    key={flavor}
                    onClick={() => {
                        setSelectedFlavor(flavor);
                        setError('');
                    }}
                    className={`
                      px-4 py-2 text-sm font-bold border transition-all duration-200 uppercase tracking-wide rounded-lg
                      ${selectedFlavor === flavor 
                        ? 'bg-brand-yellow border-brand-yellow text-brand-black' 
                        : 'bg-transparent border-white/20 text-gray-300 hover:border-brand-yellow hover:text-white'}
                    `}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
              {error && (
                <div className="flex items-center text-red-500 text-sm mt-2 font-medium">
                  <AlertCircle className="h-4 w-4 mr-1" /> {error}
                </div>
              )}
            </div>
          )}

          <div className="flex sm:flex-row gap-4 mb-12">
            <div className="flex items-center bg-brand-gray border border-white/20 h-14 w-32 rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="flex-1 text-center font-mono text-lg text-white font-bold">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-brand-yellow text-brand-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors h-14 flex items-center justify-center gap-2 group rounded-lg px-4"
            >
              <ShoppingCart className="h-5 w-5" />
              Adicionar ao Carrinho
            </button>
          </div>
          
          <div className="mt-auto">
            <div className="flex border-b border-white/10 mb-6">
              <button
                onClick={() => setActiveTab('description')}
                className={`pb-3 pr-6 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'description' ? 'border-brand-yellow text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                Descrição
              </button>
              <button
                onClick={() => setActiveTab('nutritional')}
                className={`pb-3 px-6 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 ${activeTab === 'nutritional' ? 'border-brand-yellow text-white' : 'border-transparent text-gray-500 hover:text-white'}`}
              >
                Nutricional
              </button>
            </div>

            <div className="min-h-[150px]">
              {activeTab === 'description' && (
                <div className="animate-fadeIn">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {product.longDescription || product.description}
                  </p>
                  {product.ingredients && (
                     <div>
                        <h4 className="font-bold text-white text-sm uppercase mb-2">Ingredientes:</h4>
                        <p className="text-gray-400 text-sm leading-relaxed">{product.ingredients}</p>
                     </div>
                  )}
                </div>
              )}

              {activeTab === 'nutritional' && (
                <div className="animate-fadeIn">
                  {product.nutritionalInfo ? (
                    <div className="border border-white/10 rounded overflow-hidden">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-white uppercase font-bold text-xs">
                          <tr>
                            <th className="px-4 py-3">Informação</th>
                            <th className="px-4 py-3 text-right">Por Porção</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {product.nutritionalInfo.map((info, idx) => (
                            <tr key={idx} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 py-3 text-gray-300 font-medium">{info.label}</td>
                              <td className="px-4 py-3 text-right text-brand-yellow font-bold">{info.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">Informação nutricional não disponível para este produto.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};