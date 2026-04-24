const DEFAULT_SERVICES = [
  { id: '1', title: 'Website Development', description: 'Pembuatan landing page, company profile, hingga web app kompleks.', icon: 'Globe' },
  { id: '2', title: 'Android Development', description: 'Aplikasi mobile Android yang responsif and user-friendly.', icon: 'Smartphone' },
  { id: '3', title: 'Data Science', description: 'Analisis data, visualisasi, dan machine learning untuk bisnis Anda.', icon: 'BarChart3' },
  { id: '4', title: 'Laporan Skripsi', description: 'Bantuan konsultasi dan pengerjaan laporan skripsi yang rapi.', icon: 'FileText' },
  { id: '5', title: 'Jurnal & Artikel', description: 'Penulisan jurnal ilmiah dan artikel profesional berkualitas tinggi.', icon: 'BookOpen' },
  { id: '6', title: 'Power Point', description: 'Desain presentasi PPT yang menarik dan komunikatif.', icon: 'Presentation' }
];

const DEFAULT_SOCIALS = [
  { id: '1', name: 'WhatsApp', url: 'https://wa.me/yournumber', color: '#25D366', platform: 'whatsapp' },
  { id: '2', name: 'Instagram', url: 'https://instagram.com/yourprofile', color: '#E1306C', platform: 'instagram' },
  { id: '3', name: 'TikTok', url: 'https://tiktok.com/@yourprofile', color: '#000000', platform: 'tiktok' }
];

const DEFAULT_PORTFOLIO = [
  { 
    id: '1', 
    title: 'CENDEKIA E-Commerce', 
    category: 'Website', 
    description: 'Platform belanja online modern dengan sistem manajemen inventaris cerdas.',
    image: '/images/portfolio/web.png',
    link: '#'
  },
  { 
    id: '2', 
    title: 'Health Tracker Pro', 
    category: 'Android', 
    description: 'Aplikasi pelacak kesehatan dengan sinkronisasi data real-time.',
    image: '/images/portfolio/android.png',
    link: '#'
  },
  { 
    id: '3', 
    title: 'Analytics Dashboard', 
    category: 'Data Science', 
    description: 'Visualisasi data mendalam untuk pengambilan keputusan bisnis.',
    image: '/images/portfolio/datascience.png',
    link: '#'
  }
];

export const getPortfolio = () => {
  if (typeof window === 'undefined') return DEFAULT_PORTFOLIO;
  const data = localStorage.getItem('cendekia_portfolio');
  const portfolio = data ? JSON.parse(data) : DEFAULT_PORTFOLIO;
  return portfolio.map(p => ({ ...p, id: String(p.id) }));
};

export const savePortfolio = (portfolio) => {
  localStorage.setItem('cendekia_portfolio', JSON.stringify(portfolio));
};

export const getServices = () => {
  if (typeof window === 'undefined') return DEFAULT_SERVICES;
  const data = localStorage.getItem('cendekia_services');
  const services = data ? JSON.parse(data) : DEFAULT_SERVICES;
  return services.map(s => ({ ...s, id: String(s.id) }));
};

export const saveServices = (services) => {
  localStorage.setItem('cendekia_services', JSON.stringify(services));
};

export const getSocials = () => {
  if (typeof window === 'undefined') return DEFAULT_SOCIALS;
  const data = localStorage.getItem('cendekia_socials');
  const socials = data ? JSON.parse(data) : DEFAULT_SOCIALS;
  return socials.map(s => ({ ...s, id: String(s.id) }));
};

export const saveSocials = (socials) => {
  localStorage.setItem('cendekia_socials', JSON.stringify(socials));
};
