import type { Product } from '@/types/product'

/**
 * Catálogo mock — somente moda masculina.
 * Imagens Unsplash conferidas (HTTP 200 + visual masculino) em ago/2026.
 */
const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`

export const products: Product[] = [
  // ── Camisas ──────────────────────────────────────────────
  {
    id: 'p01',
    slug: 'camisa-oxford-grafite',
    name: 'Camisa Oxford Grafite',
    description:
      'Oxford de trama firme com caimento reto. Colarinho estruturado, mangas com punho limpo — peça diária com presença.',
    priceCents: 28900,
    category: 'camisas',
    featured: true,
    fabric: '100% algodão oxford',
    care: 'Lavar à máquina frio · Passar temperatura média',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'grafite', name: 'Grafite', hex: '#4a4d4b' },
      { id: 'branco', name: 'Off-white', hex: '#e8e6e1' },
      { id: 'azul', name: 'Azul noite', hex: '#1e2a3a' },
    ],
    images: [img('photo-1602810318383-e386cc2a3ccf'), img('photo-1603252109303-2751441dd157')],
  },
  {
    id: 'p02',
    slug: 'camisa-social-branca',
    name: 'Camisa Social Branca',
    description:
      'Popeline de fio fino, colarinho italiano e punho simples. Caimento estruturado para reunião ou jantar.',
    priceCents: 29900,
    category: 'camisas',
    featured: true,
    fabric: '100% algodão popeline',
    care: 'Lavar à máquina frio · Passar quente',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'branco', name: 'Branco', hex: '#f7f6f2' },
      { id: 'azul-claro', name: 'Azul claro', hex: '#b8c4d4' },
    ],
    images: [img('photo-1598033129183-c4f50c736f10'), img('photo-1598032895397-b9472444bf93')],
  },
  {
    id: 'p03',
    slug: 'camisa-flanelada-xadrez',
    name: 'Camisa Flanelada Xadrez',
    description:
      'Flanela de algodão com xadrez clássico. Corte regular para usar aberta sobre camiseta ou fechada no frio seco.',
    priceCents: 26900,
    category: 'camisas',
    fabric: '100% algodão flanelado',
    care: 'Lavar à máquina frio · Não alvejar',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'marinho', name: 'Marinho e mostarda', hex: '#2a3544' },
      { id: 'musgo', name: 'Musgo', hex: '#3f4f3a' },
    ],
    images: [img('photo-1607345366928-199ea26cfe3e')],
  },
  {
    id: 'p04',
    slug: 'camisa-azul-business',
    name: 'Camisa Azul Business',
    description:
      'Oxford azul claro com bolso no peito e colarinho button-down. O básico que sobe o look com gravata ou sem.',
    priceCents: 27900,
    category: 'camisas',
    fabric: '100% algodão oxford',
    care: 'Lavar à máquina frio · Passar temperatura média',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'azul', name: 'Azul claro', hex: '#7a9bb8' },
      { id: 'lilas', name: 'Lilás suave', hex: '#9a8fb0' },
    ],
    images: [img('photo-1598032895397-b9472444bf93'), img('photo-1603252109303-2751441dd157')],
  },
  {
    id: 'p05',
    slug: 'camiseta-algodao-pesado',
    name: 'Camiseta Algodão Pesado',
    description:
      'Malha 220g com ombros reforçados e gola rib dupla. Cor sólida, caimento reto — base do guarda-roupa masculino.',
    priceCents: 14900,
    category: 'camisas',
    featured: true,
    fabric: '100% algodão penteado 220g',
    care: 'Lavar à máquina frio · Secar na sombra',
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    colors: [
      { id: 'branco', name: 'Branco', hex: '#f5f4f0' },
      { id: 'preto', name: 'Preto', hex: '#121212' },
      { id: 'cinza', name: 'Cinza mescla', hex: '#8a8c88' },
    ],
    images: [img('photo-1521572163474-6864f9cf17ab'), img('photo-1583743814966-8936f5b7be1a')],
  },
  {
    id: 'p06',
    slug: 'camiseta-preta-essencial',
    name: 'Camiseta Preta Essencial',
    description:
      'Preto sólido com caimento reto e manga que para no bíceps. Peça diária — combine com chino ou jeans.',
    priceCents: 13900,
    category: 'camisas',
    fabric: '100% algodão',
    care: 'Lavar à máquina frio · Não usar alvejante',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'preto', name: 'Preto', hex: '#121212' },
      { id: 'carvao', name: 'Carvão', hex: '#2c2f2d' },
    ],
    images: [img('photo-1618354691373-d851c5c3a990'), img('photo-1583743814966-8936f5b7be1a')],
  },
  {
    id: 'p07',
    slug: 'camiseta-branca-urbana',
    name: 'Camiseta Branca Urbana',
    description:
      'Branco limpo, gola reforçada e comprimento que fica bem para dentro ou para fora da calça.',
    priceCents: 13900,
    category: 'camisas',
    fabric: '100% algodão penteado',
    care: 'Lavar à máquina frio · Secar na sombra',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'branco', name: 'Branco', hex: '#f5f4f0' },
      { id: 'off', name: 'Off-white', hex: '#e8e4dc' },
    ],
    images: [img('photo-1489980557514-251d61e3eeb6'), img('photo-1586790170083-2f9ceadc732d')],
  },
  {
    id: 'p08',
    slug: 'kit-basicos-masc',
    name: 'Kit Básicos Masculinos',
    description:
      'Seis cores essenciais em malha média. Monte combinações sem pensar — o fundamento do closet masculino.',
    priceCents: 39900,
    category: 'camisas',
    fabric: '100% algodão',
    care: 'Lavar à máquina frio · Separar cores escuras',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'misto', name: 'Kit 6 cores', hex: '#3a423c' },
    ],
    images: [img('photo-1562157873-818bc0726f68'), img('photo-1490578474895-699cd4e2cf59')],
  },

  // ── Calças ───────────────────────────────────────────────
  {
    id: 'p09',
    slug: 'calca-chino-carvao',
    name: 'Calça Chino Carvão',
    description:
      'Chino de algodão com stretch sutil. Cintura média, perna reta — o equilíbrio entre formal e casual.',
    priceCents: 34900,
    category: 'calcas',
    featured: true,
    fabric: '97% algodão · 3% elastano',
    care: 'Lavar à máquina frio · Passar temperatura baixa',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { id: 'carvao', name: 'Carvão', hex: '#2c2f2d' },
      { id: 'caqui', name: 'Caqui', hex: '#9a8b6e' },
      { id: 'marinho', name: 'Marinho', hex: '#1a2433' },
    ],
    images: [img('photo-1473966968600-fa801b869a1a'), img('photo-1624378439575-d8705ad7ae80')],
  },
  {
    id: 'p10',
    slug: 'calca-algodao-clara',
    name: 'Calça Algodão Clara',
    description:
      'Tecido leve, queda fluida. Pensada para dias longos — bolsos laterais limpos, barra sem punho.',
    priceCents: 32900,
    category: 'calcas',
    fabric: '100% algodão peinado',
    care: 'Lavar à máquina frio · Secar pendurado',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { id: 'areia', name: 'Areia', hex: '#c9bfa8' },
      { id: 'cinza', name: 'Cinza claro', hex: '#b0b2ae' },
    ],
    images: [img('photo-1624378439575-d8705ad7ae80'), img('photo-1473966968600-fa801b869a1a')],
  },
  {
    id: 'p11',
    slug: 'jeans-indigo-reta',
    name: 'Jeans Indigo Reta',
    description:
      'Denim médio com lavagem limpa. Modelagem reta do quadril ao tornozelo — clássico masculino sem exagero.',
    priceCents: 37900,
    category: 'calcas',
    featured: true,
    fabric: '98% algodão · 2% elastano',
    care: 'Lavar do avesso · Evitar secadora',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [{ id: 'indigo', name: 'Indigo', hex: '#2a3a5c' }],
    images: [img('photo-1541099649105-f69ad21f3246'), img('photo-1576995853123-5a10305d93c0')],
  },
  {
    id: 'p12',
    slug: 'jeans-claro-slim',
    name: 'Jeans Claro Slim',
    description:
      'Lavagem clara com caimento slim-reto. Combina com blazer camel ou camiseta básica — versátil o ano todo.',
    priceCents: 36900,
    category: 'calcas',
    fabric: '98% algodão · 2% elastano',
    care: 'Lavar do avesso frio · Evitar secadora',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { id: 'claro', name: 'Azul claro', hex: '#7a92a8' },
      { id: 'medio', name: 'Azul médio', hex: '#4a6a8a' },
    ],
    images: [img('photo-1542272454315-4c01d7abdf4a'), img('photo-1576995853123-5a10305d93c0')],
  },
  {
    id: 'p13',
    slug: 'calca-alfaiataria-navy',
    name: 'Calça Alfaiataria Navy',
    description:
      'Lã fria com queda estruturada. Cintura média e barra italiana — o par ideal do blazer unstructured.',
    priceCents: 44900,
    category: 'calcas',
    fabric: '70% lã · 28% poliéster · 2% elastano',
    care: 'Limpeza a seco · Passar com pano úmido',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { id: 'navy', name: 'Navy', hex: '#1a2433' },
      { id: 'preto', name: 'Preto', hex: '#141414' },
    ],
    images: [img('photo-1617137968427-85924c800a22'), img('photo-1594938298603-c8148c4dae35')],
  },
  {
    id: 'p14',
    slug: 'calca-social-windowpane',
    name: 'Calça Social Windowpane',
    description:
      'Xadrez windowpane em tom azul. Parte do visual de alfaiataria contemporânea — use com colete ou blazer.',
    priceCents: 46900,
    category: 'calcas',
    fabric: '65% lã · 35% poliéster',
    care: 'Limpeza a seco',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [{ id: 'azul', name: 'Azul windowpane', hex: '#3d5a80' }],
    images: [img('photo-1594938298603-c8148c4dae35'), img('photo-1507679799987-c73779587ccf')],
  },
  {
    id: 'p15',
    slug: 'calca-preta-slim',
    name: 'Calça Preta Slim',
    description:
      'Preto fosco com stretch discreto. Do escritório casual à noite — a calça que some e destaca o corte.',
    priceCents: 33900,
    category: 'calcas',
    fabric: '97% algodão · 3% elastano',
    care: 'Lavar à máquina frio · Passar baixa',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [
      { id: 'preto', name: 'Preto', hex: '#121212' },
      { id: 'carvao', name: 'Carvão', hex: '#2c2f2d' },
    ],
    images: [img('photo-1520975954732-35dd22299614'), img('photo-1520975661595-6453be3f7070')],
  },
  {
    id: 'p16',
    slug: 'jeans-destroyed-escuro',
    name: 'Jeans Destroyed Escuro',
    description:
      'Denim escuro com destroyed pontual no joelho. Streetwear masculino com base limpa — sem excesso de rasgos.',
    priceCents: 35900,
    category: 'calcas',
    fabric: '100% algodão',
    care: 'Lavar do avesso · Evitar secadora',
    sizes: ['38', '40', '42', '44', '46'],
    colors: [{ id: 'escuro', name: 'Indigo escuro', hex: '#1a2433' }],
    images: [img('photo-1516826957135-700dedea698c'), img('photo-1541099649105-f69ad21f3246')],
  },

  // ── Camadas ──────────────────────────────────────────────
  {
    id: 'p17',
    slug: 'jaqueta-bomber-noite',
    name: 'Jaqueta Bomber Noite',
    description:
      'Bomber em twill matte com forro leve. Zíper discreto, punhos em ribana — camada de transição masculina.',
    priceCents: 48900,
    category: 'camadas',
    featured: true,
    fabric: 'Externo: poliéster reciclado · Forro: algodão',
    care: 'Limpeza a seco recomendada',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'noite', name: 'Noite', hex: '#12151a' },
      { id: 'oliva', name: 'Oliva escuro', hex: '#2f3a2c' },
    ],
    images: [img('photo-1591047139829-d91aecb6caea'), img('photo-1551028719-00167b16eac5')],
  },
  {
    id: 'p18',
    slug: 'jaqueta-couro-marrom',
    name: 'Jaqueta Couro Marrom',
    description:
      'Couro com zíperes metálicos e gola larga. Peça de presença — vista sobre camisa denim ou social.',
    priceCents: 78900,
    category: 'camadas',
    featured: true,
    fabric: 'Couro legítimo · Forro: acetato',
    care: 'Limpeza especializada em couro',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'marrom', name: 'Marrom', hex: '#5c3d2e' },
      { id: 'preto', name: 'Preto', hex: '#1a1a1a' },
    ],
    images: [img('photo-1487222477894-8943e31ef7b2'), img('photo-1614252369475-531eba835eb1')],
  },
  {
    id: 'p19',
    slug: 'jaqueta-couro-preta',
    name: 'Jaqueta Couro Preta',
    description:
      'Biker preta com hardware prateado. Clássico masculino — combine com calça preta e camiseta branca.',
    priceCents: 74900,
    category: 'camadas',
    fabric: 'Couro · Forro: poliéster',
    care: 'Limpeza especializada em couro',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [{ id: 'preto', name: 'Preto', hex: '#121212' }],
    images: [img('photo-1520975954732-35dd22299614'), img('photo-1520975661595-6453be3f7070')],
  },
  {
    id: 'p20',
    slug: 'blazer-camel',
    name: 'Blazer Camel',
    description:
      'Blazer alongado em tom camel. Sem ombreira excessiva — smart casual que funciona com jeans ou chino.',
    priceCents: 59900,
    category: 'camadas',
    featured: true,
    fabric: '54% lã · 44% poliéster · 2% elastano',
    care: 'Limpeza a seco · Pendurar em cabide largo',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'camel', name: 'Camel', hex: '#c4a574' },
      { id: 'cinza', name: 'Cinza', hex: '#6a6c6e' },
    ],
    images: [img('photo-1552374196-1ab2a1c593e8'), img('photo-1617127365659-c47fa864d8bc')],
  },
  {
    id: 'p21',
    slug: 'blazer-navy-slim',
    name: 'Blazer Navy Slim',
    description:
      'Navy slim com bolso faca e botão único. Do escritório ao evento — corte contemporâneo para o homem brasileiro.',
    priceCents: 57900,
    category: 'camadas',
    fabric: '70% lã · 30% poliéster',
    care: 'Limpeza a seco',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'navy', name: 'Navy', hex: '#1a2433' },
      { id: 'preto', name: 'Preto', hex: '#141414' },
    ],
    images: [img('photo-1617137968427-85924c800a22'), img('photo-1617127365659-c47fa864d8bc')],
  },
  {
    id: 'p22',
    slug: 'jaqueta-jeans-trucker',
    name: 'Jaqueta Jeans Trucker',
    description:
      'Trucker indigo com colarinho contrastante e forro listrado. Workwear clássico no closet masculino.',
    priceCents: 42900,
    category: 'camadas',
    fabric: '100% algodão denim · Forro: flanela',
    care: 'Lavar do avesso frio · Evitar secadora',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'indigo', name: 'Indigo', hex: '#2a3a5c' },
      { id: 'claro', name: 'Jeans claro', hex: '#6a8aaa' },
    ],
    images: [img('photo-1611312449408-fcece27cdbb7'), img('photo-1551028719-00167b16eac5')],
  },
  {
    id: 'p23',
    slug: 'hoodie-fleece-carvao',
    name: 'Hoodie Fleece Carvão',
    description:
      'Moletom com capuz, bolso canguru e cordão tom sobre tom. Fleece médio — volume controlado para o dia a dia.',
    priceCents: 27900,
    category: 'camadas',
    fabric: '80% algodão · 20% poliéster',
    care: 'Lavar à máquina frio · Secar na sombra',
    sizes: ['P', 'M', 'G', 'GG', 'XGG'],
    colors: [
      { id: 'carvao', name: 'Carvão', hex: '#2a2c2a' },
      { id: 'marinho', name: 'Marinho', hex: '#1a2433' },
    ],
    images: [img('photo-1556821840-3a63f95609a7'), img('photo-1516826957135-700dedea698c')],
  },
  {
    id: 'p24',
    slug: 'terno-navy-completo',
    name: 'Terno Navy Completo',
    description:
      'Conjunto blazer + calça em navy. Silhueta slim, acessórios em couro caramelo — presença total.',
    priceCents: 129900,
    category: 'camadas',
    fabric: '80% lã · 20% poliéster',
    care: 'Limpeza a seco · Guardar em capa respirável',
    sizes: ['P', 'M', 'G', 'GG'],
    colors: [
      { id: 'navy', name: 'Navy', hex: '#1a2433' },
      { id: 'carvao', name: 'Carvão', hex: '#2c2f2d' },
    ],
    images: [img('photo-1617137968427-85924c800a22'), img('photo-1507679799987-c73779587ccf')],
  },
]
