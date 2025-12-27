import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';
import { ProductCard } from '../components/ProductCard';

type SortOption = 'price-asc' | 'price-desc' | 'name-asc';

export const Catalog: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [location.search]);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      
      if (product.price < priceRange[0] || product.price > priceRange[1]) return false;
      
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.brand.toLowerCase().includes(query)
        );
      }
      
      return true;
    }).sort((a, b) => {
      switch (sortOption) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });
  }, [selectedCategory, priceRange, searchQuery, sortOption]);

  const brands = Array.from(new Set(PRODUCTS.map(p => p.brand)));

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    const params = new URLSearchParams(location.search);
    if (catId === 'all') params.delete('category');
    else params.set('category', catId);
    navigate({ search: params.toString() }, { replace: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-white uppercase">Catálogo de Produtos</h1>
          <p className="text-gray-400 text-sm mt-1">Encontre o combustível ideal para seu objetivo.</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Buscar produto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-brand-gray border border-white/10 text-white pl-10 pr-4 py-2 focus:outline-none focus:border-brand-yellow transition-colors placeholder:text-gray-600 rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <button 
          className="lg:hidden flex items-center justify-center gap-2 bg-brand-gray border border-white/10 py-3 text-white font-bold uppercase rounded-lg"
          onClick={() => setShowMobileFilters(true)}
        >
          <SlidersHorizontal className="h-4 w-4" /> Filtros
        </button>

        <aside className={`
          fixed inset-0 z-40 bg-black/95 p-6 lg:p-0 lg:static lg:bg-transparent lg:w-64 lg:block overflow-y-auto
          ${showMobileFilters ? 'block' : 'hidden'}
        `}>
          <div className="flex items-center justify-between lg:hidden mb-6">
            <h2 className="text-xl font-bold text-white uppercase">Filtros</h2>
            <button onClick={() => setShowMobileFilters(false)} className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-8 mt-12 relative">
            <div className="">
              <button onClick={() => setShowMobileFilters(false)} className="lg:hidden mb-4 text-white absolute top-0 right-0">
                <X className="h-6 w-6 hover:text-brand-yellow" />
              </button>
              <h3 className="font-display font-bold text-white uppercase mb-4 tracking-wide">Categorias</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => handleCategoryChange('all')}
                    className={`text-sm hover:text-brand-yellow transition-colors ${selectedCategory === 'all' ? 'text-brand-yellow font-bold' : 'text-gray-400'}`}
                  >
                    Todos os Produtos
                  </button>
                </li>
                {CATEGORIES.map(cat => (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`text-sm hover:text-brand-yellow transition-colors ${selectedCategory === cat.id ? 'text-brand-yellow font-bold' : 'text-gray-400'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-white uppercase mb-4 tracking-wide">Preço</h3>
              <input
                type="range"
                min="0"
                max="500"
                step="10"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full h-1 bg-brand-gray rounded-lg appearance-none cursor-pointer accent-brand-yellow"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-2">
                <span>R$ 0</span>
                <span>Até R$ {priceRange[1]}</span>
              </div>
            </div>            
          </div>
        </aside>

        <div className="flex-1">
          <div className="flex justify-end mb-6">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SortOption)}
              className="bg-brand-black text-sm text-white border border-white/10 px-4 py-2 focus:outline-none focus:border-brand-yellow cursor-pointer rounded-lg"
            >
              <option value="name-asc">Nome (A-Z)</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-white/5 bg-brand-gray/50">
              <p className="text-gray-400 text-lg">Nenhum produto encontrado com estes filtros.</p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                  setPriceRange([0, 500]);
                }}
                className="mt-4 text-brand-yellow font-bold hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};