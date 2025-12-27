import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Trophy } from 'lucide-react';
import { HOME_CONTENT, CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import {  
  HeroSectionData, 
  CategoriesSectionData, 
  FeaturedProductsSectionData, 
  BenefitsSectionData 
} from '../types';

const Hero: React.FC<{ data: HeroSectionData }> = ({ data }) => (
  <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
    <div className="absolute inset-0 z-0">
      <img 
        src={data.backgroundImage} 
        alt="Hero Background" 
        className="w-full h-full object-cover grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-2xl animate-fadeInUp">
        <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-white uppercase leading-none mb-6">
          {data.title}
          <span className="text-brand-yellow">.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg font-light leading-relaxed">
          {data.subtitle}
        </p>
        <Link
          to={data.ctaLink}
          className="inline-flex items-center px-8 py-4 bg-brand-yellow text-brand-black font-bold uppercase tracking-widest text-sm hover:bg-white transition-colors group rounded-lg"
        >
          {data.ctaText}
          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  </section>
);

const Benefits: React.FC<{ data: BenefitsSectionData }> = ({ data }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'shield': return <Shield className="h-8 w-8 text-brand-yellow" />;
      case 'zap': return <Zap className="h-8 w-8 text-brand-yellow" />;
      case 'trophy': return <Trophy className="h-8 w-8 text-brand-yellow" />;
      default: return null;
    }
  };

  return (
    <section className="bg-brand-gray border-y border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 border border-white/5 hover:border-brand-yellow/30 transition-colors bg-brand-black/50 rounded-lg">
              <div className="mb-4 p-3 bg-white/5 rounded-full">
                {getIcon(item.icon)}
              </div>
              <h3 className="text-xl font-display font-bold text-white uppercase mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Categories: React.FC<{ data: CategoriesSectionData }> = ({ data }) => {
  const categoriesToShow = CATEGORIES.filter(c => data.items.includes(c.id));

  return (
    <section className="py-24 bg-brand-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <h2 className="font-display font-bold text-4xl text-white uppercase">
            {data.title}
          </h2>
          <Link to="/catalog" className="text-brand-yellow text-sm font-bold uppercase tracking-wider hover:text-white transition-colors flex items-center">
            Ver todas <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categoriesToShow.map((cat) => (
            <Link 
              key={cat.id} 
              to={`/catalog?category=${cat.id}`}
              className="group relative h-80 overflow-hidden block border border-white/10 rounded-lg"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-display font-bold text-white uppercase italic group-hover:translate-x-2 transition-transform">
                  {cat.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedProducts: React.FC<{ data: FeaturedProductsSectionData }> = ({ data }) => {
  const featured = PRODUCTS.filter(p => p.featured).slice(0, data.count);

  return (
    <section className="py-24 bg-brand-black relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl text-white uppercase mb-4">
            {data.title}
          </h2>
          {data.subtitle && (
            <p className="text-gray-400 max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  return (
    <div className="flex flex-col">
      {HOME_CONTENT.sections.map((section, index) => {
        switch (section.type) {
          case 'hero':
            return <Hero key={index} data={section} />;
          case 'benefits':
            return <Benefits key={index} data={section} />;
          case 'categories':
            return <Categories key={index} data={section} />;
          case 'featured-products':
            return <FeaturedProducts key={index} data={section} />;
          default:
            return null;
        }
      })}
    </div>
  );
};