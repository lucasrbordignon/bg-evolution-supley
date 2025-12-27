import { Product, Category, HomeContent } from './types'

export const CATEGORIES: Category[] = [
  {
    id: 'c1',
    name: 'Proteínas',
    slug: 'proteinas',
    image:
      'https://images.unsplash.com/photo-1693996045300-521e9d08cabc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'c2',
    name: 'Creatina',
    slug: 'creatina',
    image:
      'https://images.unsplash.com/photo-1693996045435-af7c48b9cafb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'c3',
    name: 'Pré-Treino',
    slug: 'pre-treino',
    image:
      'https://images.unsplash.com/photo-1693996047008-1b6210099be1?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'c4',
    name: 'Vitaminas',
    slug: 'vitaminas',
    image:
      'https://plus.unsplash.com/premium_photo-1664373622147-d610c247a11b?q=80&w=397&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'c5',
    name: 'Acessórios',
    slug: 'acessorios',
    image:
      'https://images.unsplash.com/photo-1595348020949-87cdfbb44174?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'c6',
    name: 'Barrinhas',
    slug: 'barrinhas',
    image:
      'https://plus.unsplash.com/premium_photo-1664392029345-eba492b172d8?q=80&w=744&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 'c7',
    name: 'Pasta de Amendoim',
    slug: 'pasta-amendoim',
    image:
      'https://images.unsplash.com/flagged/photo-1625402535207-953e03369f59?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  }
]

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: '100% Whey',
    description:
      'Proteína concentrada para ganho e manutenção de massa muscular.',
    longDescription:
      'Whey protein de alto valor biológico indicado para suplementação diária, auxiliando na recuperação muscular e aporte proteico.',
    price: 129.99,
    category: 'c1',
    brand: 'Max Titanium',
    image: 'https://product-data.raiadrogasil.io/images/3515006.webp',
    featured: true,
    flavors: ['Cookies & Cream', 'Chocolate', 'Morango']
  },
  {
    id: 'p2',
    name: 'Whey Protein',
    description: 'Proteína do soro do leite para suporte nutricional.',
    price: 139.99,
    category: 'c1',
    brand: 'Integralmédica',
    image: 'https://imgcentauro-a.akamaihd.net/1200x1200/86042200A2.jpg',
    flavors: ['Baunilha', 'Chocolate']
  },
  {
    id: 'p3',
    name: 'Isolate Protein Zero Lactose',
    description: 'Proteína isolada de rápida absorção e zero lactose.',
    price: 165.0,
    category: 'c1',
    brand: 'Integralmédica',
    image:
      'https://www.drogaraia.com.br/_next/image?url=https%3A%2F%2Fproduct-data.raiadrogasil.io%2Fimages%2F7618376.webp&w=3840&q=40',
    featured: true,
    flavors: ['Chocolate']
  },
  {
    id: 'p4',
    name: 'Creatina Hardcore 300g',
    description: 'Creatina monohidratada para aumento de força e desempenho.',
    longDescription:
      'Creatina pura indicada para treinos de alta intensidade, auxiliando na força e explosão muscular.',
    price: 89.99,
    category: 'c2',
    brand: 'Integralmédica',
    image: 'https://m.media-amazon.com/images/I/81UashXoAxL.jpg',
    featured: true,
    flavors: ['Sem sabor']
  },
  {
    id: 'p5',
    name: 'Creatina Monohidratada 300g',
    description: 'Creatina pura e micronizada.',
    price: 89.99,
    category: 'c2',
    brand: 'Dux Nutrition',
    image: 'https://product-data.raiadrogasil.io/images/3521084.webp',
    flavors: ['Sem sabor']
  },
  {
    id: 'p6',
    name: 'Fire Black',
    description: 'Pré-treino para energia e foco.',
    longDescription:
      'Fórmula desenvolvida para aumentar a disposição e intensidade nos treinos.',
    price: 39.99,
    category: 'c3',
    brand: 'Max Titanium',
    image:
      'https://lojamaxtitanium.vtexassets.com/arquivos/ids/157891-256-0/Fire-black-60caps.png?v=638428408811800000',
    flavors: ['Sem sabor']
  },
  {
    id: 'p7',
    name: 'Évora PW',
    description: 'Pré-treino de alta performance.',
    price: 109.99,
    category: 'c3',
    brand: 'Darkness',
    image:
      'https://cdn.shoppub.io/cdn-cgi/image/w=1000,h=1000,q=80,f=auto/gsn/media/uploads/produtos/foto/esyyqkbc/frutasvermelhas.png',
    featured: true,
    flavors: ['Frutas Amarelas', 'Frutas Vermelhas', 'Limão', 'Uva']
  },
  {
    id: 'p8',
    name: 'Power Protein Crisp Bar',
    description: 'Barrinha proteica prática e saborosa.',
    price: 8.0,
    category: 'c6',
    brand: 'Max Titanium',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKUo_5cNgywuKTG0zmd34831BcPT3KbkF_9Q&s',
    flavors: ['Dark Truffle', 'Cookies', 'Frutas Vermelhas', 'Caramelo']
  },
  {
    id: 'p9',
    name: 'Multi Max Complex',
    description: 'Multivitamínico completo para o dia a dia.',
    price: 59.99,
    category: 'c4',
    brand: 'Max Titanium',
    image:
      'https://lojamaxtitanium.vtexassets.com/arquivos/ids/157556/multimax-complex-max-titanium-90-capsulas-1.jpg?v=638351326253770000',
    flavors: ['Sem sabor']
  },
  {
    id: 'p10',
    name: 'Ômega 3',
    description: 'Suplemento de ácidos graxos essenciais.',
    price: 29.99,
    category: 'c4',
    brand: 'Litee',
    image:
      'https://images.tcdn.com.br/img/img_prod/714546/omega_3_180_capsulas_gelatinosas_embalagem_economica_57_1_f43010ac98f09885e5c43f861dad975d.png',
    flavors: ['Sem sabor']
  },
  {
    id: 'p11',
    name: 'Pasta de Amendoim',
    description: 'Pasta de amendoim saborizada.',
    price: 59.99,
    category: 'c7',
    brand: 'Dr. Peanut',
    image:
      'https://cdn.awsli.com.br/1253/1253915/produto/338684511/f18d17a2-7bfb-41a4-8bb6-dd10cd6c9d3f-1-rqsh2btd31-removebg-preview-c7c6ojfob1.png',
    featured: true,
    flavors: [
      'Pistache',
      'Doce de Leite',
      'Cookies & Cream',
      'Brigadeiro',
      'Beijinho',
      'Brownie',
      'Chocolate Branco',
      'Avelã'
    ]
  },
  {
    id: 'p12',
    name: 'Coqueteleira',
    description: 'Coqueteleira prática para preparo de suplementos.',
    price: 19.99,
    category: 'c5',
    brand: 'Max Titanium',
    image:
      'https://www.ecompletocdn.com.br//i/fp/1861/1516285_1_1686774744.jpg',
    flavors: ['Preto']
  }
  ,
  {
    id: 'p13',
    name: 'Alfajor',
    description: 'Snack proteico com muito sabor, sem glúten e zero açúcar. Perfeito para sua rotina saudável!',
    price: 12,
    category: 'c6',
    brand: 'Dr. Peanut',
    image:
      'https://suasaudedistribuidora.com.br/cdn/shop/files/CopiadeALFAJORDRPEANUT_1.png?v=1687466391',
    flavors: ['Leite em pó', 'Avelã']
  },
  {
    id: 'p14',
    name: 'Mass Titanium 17500',
    description: 'Hipercalórico completo e sem lactose! MASS TITANIUM 17500 ZERO LACTOSE combina três fontes proteicas de alta biodisponibilidade e digestibilidade e duas fontes de carboidratos.',
    price: 109.99,
    category: 'c1',
    brand: 'Max Titanium',
    image:
      'https://lojamaxtitanium.vtexassets.com/arquivos/ids/159809/mass-titanium-max-titanium-1.4kg-chocolate-1.jpg?v=639016028048100000',
    flavors: ['Baunilha', 'Morango', 'Chocolate']
  },
  {
    id: 'p15',
    name: '100% Whey Caramelo Macchiato',
    description: 'O 100% Whey Protein Concentrado Linha Ramon Dino Pote 900G da Max Titanium é a escolha ideal para quem busca uma proteína de alta qualidade para potencializar os seus objetivos de treino. Composto por proteína concentrada do soro do leite (WPC), este suplemento passa por um avançado processo de filtração que preserva nutrientes essenciais, como proteínas, lactose e minerais, enquanto reduz a quantidade de gordura e carboidratos. Cada porção oferece até 20g de proteína, auxiliando no ganho de massa muscular, recuperação pós-treino e manutenção da massa magra.',
    price: 145,
    category: 'c1',
    brand: 'Max Titanium',
    image:
      'https://m.media-amazon.com/images/I/51F8MYeNT2L.jpg',
    flavors: ['Caramelo Macchiato']
  },
  {
    id: 'p16',
    name: '100% Whey Brownie',
    description: 'O Whey 100% Brownie Rafael Brandão Max Titanium 900g é desenvolvido em parceria com o renomado influencer fitness Rafael Brandão, este suplemento proteico em pó da Max Titanium oferece uma combinação única de alta qualidade e sabor irresistível. Perfeito para quem busca otimizar o crescimento muscular e a recuperação, enquanto desfruta de um delicioso sabor Brownie.',
    price: 145,
    category: 'c1',
    brand: 'Max Titanium',
    image:
      'https://cdn.awsli.com.br/600x700/2306/2306871/produto/324073868/imagem-loja-integrada--4--xl28mqxnp0.jpg',
    flavors: ['Brownie']
  },
  {
    id: 'p17',
    name: 'Whey Protein Concentrado',
    description: 'O WHEY 80% HD™ de 900 gramas da BLACK SKULL™ é um suplemento de proteína de soro do leite (Whey Protein Concentrado) de alta qualidade, ideal para atletas e praticantes de atividades físicas que buscam otimizar a recuperação e o crescimento muscular. Com uma alta concentração proteica, ele fornece aminoácidos essenciais para o corpo.',
    price: 109.99,
    category: 'c1',
    brand: 'Black Skull',
    image:
      'https://blackskullusa.vtexassets.com/arquivos/ids/162679-800-auto?v=639010806240930000&width=800&height=auto&aspect=true',
    flavors: ['Morango', 'Baunilha', 'Chocolate']
  }
]

export const HOME_CONTENT: HomeContent = {
  sections: [
    {
      type: 'hero',
      title: 'EVOLUA SEU TREINO',
      subtitle: 'Suplementação de elite para quem busca performance máxima.',
      ctaText: 'COMPRAR AGORA',
      ctaLink: '/catalog',
      backgroundImage:
        'https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      type: 'benefits',
      items: [
        {
          icon: 'shield',
          title: 'Qualidade Garantida',
          description:
            'Produtos de primeira linha com rigorosos padrões de qualidade.'
        },
        {
          icon: 'zap',
          title: 'Entrega Rápida',
          description: 'Logística otimizada para região de Laranjal Paulista.'
        },
        {
          icon: 'trophy',
          title: 'Resultados Reais',
          description: 'Produtos de alta performance para atletas dedicados.'
        }
      ]
    },
    {
      type: 'categories',
      title: 'CATEGORIAS',
      items: ['c1', 'c2', 'c3']
    },
    {
      type: 'featured-products',
      title: 'MAIS VENDIDOS',
      subtitle: 'Os favoritos dos atletas de alto rendimento.',
      count: 4
    }
  ]
}
