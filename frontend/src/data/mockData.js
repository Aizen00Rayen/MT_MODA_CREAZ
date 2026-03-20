// ─── Unsplash helpers ─────────────────────────────────────────────────────────
const up = (id, w = 600, h = 600, crop = 'entropy') =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&crop=${crop}&auto=format&q=80`

// Real portrait photos (women)
const PORTRAITS = [
  up('1531746020798-e6953c6e8e04', 400, 400, 'face'),
  up('1494790108377-be9c29b29330', 400, 400, 'face'),
  up('1517841905240-472988babdf9', 400, 400, 'face'),
  up('1534528741775-53994a69daeb', 400, 400, 'face'),
  up('1524504388940-b1c1722653e1', 400, 400, 'face'),
  up('1488426862026-3ee34a7d66df', 400, 400, 'face'),
]

// Real fashion / traditional dress photos
const FASHION = [
  up('1558618666-fcd25c85cd64'),           // elegant embroidered gown
  up('1515886657613-9f3515b0c78f'),         // runway model
  up('1490481651871-ab68de25d43d'),         // editorial fashion
  up('1539109136881-3be0616acf4b'),         // fashion editorial
  up('1562157873-818bc0726f68'),            // evening dress
  up('1551803091-e20673f15770'),            // formal outfit
  up('1445205170230-053b83016050'),         // couture detail
  up('1558769132-cb1aea458c5e'),            // fashion close-up
  up('1509631179647-0177331693ae'),         // fashion sketch / design
  up('1567401893414-76b7b1e5a7a5'),         // fashion editorial
  up('1585914641050-fa5883c14e73'),         // designer sketch
  up('1590841609987-4ac211f23137'),         // wedding gown
  up('1612423284934-2298ab933c4c'),         // haute couture
  up('1572804013309-59a88b7e92f1'),         // fashion design
  up('1503342217505-b0a15ec3261c'),         // fashion
]

// Real sewing / fabric / atelier photos for banners
const COVERS = [
  up('1558618047-3c8c76ca7d13', 1200, 400, 'center'),   // needle & thread
  up('1469334031218-e382a71b716b', 1200, 400, 'center'), // fabric bolts
  up('1547496502-affa22d38842', 1200, 400, 'center'),    // fabric texture
  up('1582139329536-e7284fece509', 1200, 400, 'center'), // textile rolls
  up('1508214751620-4ab04d7cfa4d', 1200, 400, 'center'), // sewing workspace
  up('1561731216-c3a4244f6d73', 1200, 400, 'center'),   // fabric close-up
]

// ─── Demo users ─────────────────────────────────────────────────────────────
export const DEMO_USERS = {
  client: {
    id: 'u-client',
    email: 'client@demo.mt',
    full_name: 'Amira Benali',
    role: 'client',
    phone: '+213 555 100 200',
    wilaya: 'Alger',
    created_at: '2024-09-01T10:00:00Z',
  },
  tailor: {
    id: 'u-tailor',
    email: 'tailor@demo.mt',
    full_name: 'Fatima Khelifi',
    role: 'tailor',
    phone: '+213 555 300 400',
    wilaya: 'Tizi Ouzou',
    created_at: '2024-07-15T08:00:00Z',
  },
  admin: {
    id: 'u-admin',
    email: 'admin@demo.mt',
    full_name: 'Admin MT Moda',
    role: 'admin',
    phone: '+213 555 000 001',
    wilaya: 'Alger',
    created_at: '2024-01-01T00:00:00Z',
  },
}

// ─── Tailors ─────────────────────────────────────────────────────────────────
export const TAILORS = [
  {
    id: 't-1',
    user: { id: 'u-tailor', full_name: 'Fatima Khelifi', email: 'fatima@demo.mt' },
    display_name: 'Fatima Khelifi',
    bio: 'Spécialiste en robes kabyles brodées à la main depuis 15 ans. Chaque création est unique.',
    wilaya: 'Tizi Ouzou',
    phone: '+213 555 300 400',
    specialties: ['kabyle', 'broderie', 'traditionnel'],
    is_verified: true,
    is_available: true,
    avg_rating: 4.9,
    total_reviews: 87,
    total_orders: 243,
    starting_price: 8000,
    profile_photo: PORTRAITS[0],
    cover_photo: COVERS[0],
    avatar: PORTRAITS[0],
    portfolio: [
      { id: 'p-1', image_url: FASHION[0], title: 'Robe kabyle broderie or' },
      { id: 'p-2', image_url: FASHION[4], title: 'Karakou soirée' },
      { id: 'p-3', image_url: FASHION[11], title: 'Robe de cérémonie' },
      { id: 'p-4', image_url: FASHION[6], title: 'Ensemble traditionnel' },
    ],
  },
  {
    id: 't-2',
    user: { id: 'u-2', full_name: 'Nadia Boucherit', email: 'nadia@demo.mt' },
    display_name: 'Nadia Boucherit',
    bio: "Couturière haute couture moderne. Fusion entre l'élégance contemporaine et les motifs algériens.",
    wilaya: 'Alger',
    phone: '+213 555 400 500',
    specialties: ['moderne', 'soiree', 'mariage'],
    is_verified: true,
    is_available: true,
    avg_rating: 4.7,
    total_reviews: 62,
    total_orders: 178,
    starting_price: 12000,
    profile_photo: PORTRAITS[1],
    cover_photo: COVERS[1],
    avatar: PORTRAITS[1],
    portfolio: [
      { id: 'p-5', image_url: FASHION[2], title: 'Robe de soirée moderne' },
      { id: 'p-6', image_url: FASHION[11], title: 'Robe de mariée' },
      { id: 'p-7', image_url: FASHION[5], title: 'Ensemble de soirée' },
    ],
  },
  {
    id: 't-3',
    user: { id: 'u-3', full_name: 'Samira Hadj', email: 'samira@demo.mt' },
    display_name: 'Samira Hadj',
    bio: "Maître dans l'art du tissage de soie et de la création de tenues de mariage traditionnelles.",
    wilaya: 'Constantine',
    phone: '+213 555 500 600',
    specialties: ['mariage', 'haute_couture', 'traditionnel'],
    is_verified: true,
    is_available: false,
    avg_rating: 4.8,
    total_reviews: 54,
    total_orders: 130,
    starting_price: 18000,
    profile_photo: PORTRAITS[2],
    cover_photo: COVERS[2],
    avatar: PORTRAITS[2],
    portfolio: [
      { id: 'p-8', image_url: FASHION[12], title: 'Djebba de mariée' },
      { id: 'p-9', image_url: FASHION[7],  title: 'Robe en soie brodée' },
    ],
  },
  {
    id: 't-4',
    user: { id: 'u-4', full_name: 'Yasmine Amrani', email: 'yasmine@demo.mt' },
    display_name: 'Yasmine Amrani',
    bio: 'Créatrice de mode casual et moderne. Vêtements confortables avec une touche algérienne.',
    wilaya: 'Oran',
    phone: '+213 555 600 700',
    specialties: ['casual', 'moderne'],
    is_verified: true,
    is_available: true,
    avg_rating: 4.5,
    total_reviews: 41,
    total_orders: 98,
    starting_price: 5000,
    profile_photo: PORTRAITS[3],
    cover_photo: COVERS[3],
    avatar: PORTRAITS[3],
    portfolio: [
      { id: 'p-10', image_url: FASHION[9],  title: 'Ensemble casual chic' },
      { id: 'p-11', image_url: FASHION[13], title: 'Tenue décontractée' },
    ],
  },
  {
    id: 't-5',
    user: { id: 'u-5', full_name: 'Meriem Ziani', email: 'meriem@demo.mt' },
    display_name: 'Meriem Ziani',
    bio: "Spécialiste en broderie à l'aiguille et en tenues de soirée luxueuses.",
    wilaya: 'Annaba',
    phone: '+213 555 700 800',
    specialties: ['broderie', 'soiree', 'haute_couture'],
    is_verified: false,
    is_available: true,
    avg_rating: 4.6,
    total_reviews: 28,
    total_orders: 65,
    starting_price: 9500,
    profile_photo: PORTRAITS[4],
    cover_photo: COVERS[4],
    avatar: PORTRAITS[4],
    portfolio: [
      { id: 'p-12', image_url: FASHION[6], title: 'Robe à broderies' },
    ],
  },
  {
    id: 't-6',
    user: { id: 'u-6', full_name: 'Houria Belkacem', email: 'houria@demo.mt' },
    display_name: 'Houria Belkacem',
    bio: 'Couturière traditionnelle de Tlemcen, experte en tenues de la région.',
    wilaya: 'Tlemcen',
    phone: '+213 555 800 900',
    specialties: ['traditionnel', 'kabyle', 'mariage'],
    is_verified: true,
    is_available: true,
    avg_rating: 4.9,
    total_reviews: 73,
    total_orders: 195,
    starting_price: 10000,
    profile_photo: PORTRAITS[5],
    cover_photo: COVERS[5],
    avatar: PORTRAITS[5],
    portfolio: [
      { id: 'p-13', image_url: FASHION[0],  title: 'Tenue Tlemcenienne' },
      { id: 'p-14', image_url: FASHION[3],  title: 'Kaftan brodé' },
      { id: 'p-15', image_url: FASHION[12], title: 'Ensemble cérémonie' },
    ],
  },
]

// ─── Orders ───────────────────────────────────────────────────────────────────
export const ORDERS = [
  {
    id: 'o-1',
    client: DEMO_USERS.client,
    tailor: TAILORS[0],
    status: 'in_progress',
    design_description: 'Robe kabyle avec broderies dorées sur velours bordeaux, manches larges, taille 38',
    budget: 15000,
    deadline: '2026-04-20T00:00:00Z',
    created_at: '2026-03-01T10:00:00Z',
    design_image_url: FASHION[0],
    measurements: { tour_poitrine: 88, tour_taille: 68, tour_hanches: 96, hauteur: 165 },
    steps: [
      { id: 's-1', label: 'Commande reçue',     completed: true,  date: '2026-03-01T10:00:00Z' },
      { id: 's-2', label: 'Mesures confirmées', completed: true,  date: '2026-03-03T14:00:00Z' },
      { id: 's-3', label: 'Tissu sélectionné',  completed: true,  date: '2026-03-05T11:00:00Z' },
      { id: 's-4', label: 'Coupe en cours',      completed: false, date: null },
      { id: 's-5', label: 'Broderie',            completed: false, date: null },
      { id: 's-6', label: 'Finitions',           completed: false, date: null },
      { id: 's-7', label: 'Livraison',           completed: false, date: null },
    ],
    messages: [
      { id: 'm-1', sender: 'tailor', content: "Bonjour ! J'ai bien reçu votre commande. Je commence les mesures demain.", created_at: '2026-03-01T12:00:00Z' },
      { id: 'm-2', sender: 'client', content: "Merci ! J'ai hâte de voir le résultat.",                                  created_at: '2026-03-01T13:00:00Z' },
      { id: 'm-3', sender: 'tailor', content: 'Le tissu velours bordeaux est arrivé, il est magnifique !',              created_at: '2026-03-05T09:00:00Z' },
    ],
  },
  {
    id: 'o-2',
    client: DEMO_USERS.client,
    tailor: TAILORS[1],
    status: 'pending',
    design_description: 'Robe de soirée moderne noire avec applications en dentelle, col V, longueur midi',
    budget: 20000,
    deadline: '2026-05-01T00:00:00Z',
    created_at: '2026-03-15T14:00:00Z',
    design_image_url: FASHION[4],
    measurements: { tour_poitrine: 88, tour_taille: 68, tour_hanches: 96, hauteur: 165 },
    steps: [
      { id: 's-8',  label: 'Commande reçue',     completed: true,  date: '2026-03-15T14:00:00Z' },
      { id: 's-9',  label: 'Mesures confirmées', completed: false, date: null },
      { id: 's-10', label: 'Tissu sélectionné',  completed: false, date: null },
      { id: 's-11', label: 'Coupe en cours',      completed: false, date: null },
      { id: 's-12', label: 'Finitions',           completed: false, date: null },
      { id: 's-13', label: 'Livraison',           completed: false, date: null },
    ],
    messages: [
      { id: 'm-4', sender: 'tailor', content: 'Bonjour Amira, votre commande est bien notée. Pouvez-vous confirmer vos mesures ?', created_at: '2026-03-15T16:00:00Z' },
    ],
  },
  {
    id: 'o-3',
    client: DEMO_USERS.client,
    tailor: TAILORS[2],
    status: 'completed',
    design_description: 'Djebba de mariage en soie ivoire avec broderies traditionnelles',
    budget: 35000,
    deadline: '2026-01-15T00:00:00Z',
    created_at: '2025-11-20T09:00:00Z',
    design_image_url: FASHION[11],
    measurements: { tour_poitrine: 88, tour_taille: 68, tour_hanches: 96, hauteur: 165 },
    steps: [
      { id: 's-14', label: 'Commande reçue',     completed: true, date: '2025-11-20T09:00:00Z' },
      { id: 's-15', label: 'Mesures confirmées', completed: true, date: '2025-11-22T11:00:00Z' },
      { id: 's-16', label: 'Tissu sélectionné',  completed: true, date: '2025-11-25T10:00:00Z' },
      { id: 's-17', label: 'Coupe en cours',      completed: true, date: '2025-12-01T09:00:00Z' },
      { id: 's-18', label: 'Broderie',            completed: true, date: '2025-12-15T09:00:00Z' },
      { id: 's-19', label: 'Finitions',           completed: true, date: '2026-01-10T09:00:00Z' },
      { id: 's-20', label: 'Livraison',           completed: true, date: '2026-01-14T15:00:00Z' },
    ],
    messages: [
      { id: 'm-5', sender: 'tailor', content: 'Votre robe de mariage est prête. Elle est absolument magnifique !', created_at: '2026-01-14T10:00:00Z' },
      { id: 'm-6', sender: 'client', content: "Merci infiniment ! C'est exactement ce que je voulais.",            created_at: '2026-01-14T12:00:00Z' },
    ],
  },
  {
    id: 'o-4',
    client: { id: 'u-7', full_name: 'Rania Meziane', email: 'rania@demo.mt', role: 'client' },
    tailor: TAILORS[0],
    status: 'pending',
    design_description: 'Ensemble kabyle pour cérémonie de mariage, couleur or et vert forêt',
    budget: 12000,
    deadline: '2026-05-10T00:00:00Z',
    created_at: '2026-03-18T08:00:00Z',
    design_image_url: FASHION[6],
    measurements: null,
    steps: [
      { id: 's-21', label: 'Commande reçue', completed: true, date: '2026-03-18T08:00:00Z' },
    ],
    messages: [],
  },
  {
    id: 'o-5',
    client: { id: 'u-8', full_name: 'Souad Cherif', email: 'souad@demo.mt', role: 'client' },
    tailor: TAILORS[0],
    status: 'in_progress',
    design_description: 'Robe kabyle enfant 6 ans, broderies rouges et blanches',
    budget: 6000,
    deadline: '2026-04-05T00:00:00Z',
    created_at: '2026-03-05T11:00:00Z',
    design_image_url: FASHION[2],
    measurements: { tour_poitrine: 62, tour_taille: 56, tour_hanches: 66, hauteur: 120 },
    steps: [
      { id: 's-22', label: 'Commande reçue',     completed: true,  date: '2026-03-05T11:00:00Z' },
      { id: 's-23', label: 'Mesures confirmées', completed: true,  date: '2026-03-06T09:00:00Z' },
      { id: 's-24', label: 'Broderie en cours',  completed: false, date: null },
    ],
    messages: [],
  },
]

// ─── Saved designs ────────────────────────────────────────────────────────────
export const DESIGNS = [
  {
    id: 'd-1',
    prompt_text: 'Robe kabyle avec broderies dorées sur fond bordeaux',
    style_tags: ['kabyle', 'broderie'],
    generated_image_url: FASHION[0],
    color_palette: ['#800020', '#c9a84c', '#f5f0e8', '#1a1a2e'],
    saved: true,
    created_at: '2026-03-10T14:00:00Z',
  },
  {
    id: 'd-2',
    prompt_text: 'Robe de soirée moderne noire dentelle',
    style_tags: ['moderne', 'soiree'],
    generated_image_url: FASHION[4],
    color_palette: ['#1a1a2e', '#c9a84c', '#ffffff', '#888888'],
    saved: true,
    created_at: '2026-03-08T10:00:00Z',
  },
  {
    id: 'd-3',
    prompt_text: 'Kaftan mariage blanc broderies argent',
    style_tags: ['mariage', 'haute_couture'],
    generated_image_url: FASHION[11],
    color_palette: ['#ffffff', '#c0c0c0', '#f5f0e8', '#888888'],
    saved: true,
    created_at: '2026-03-01T09:00:00Z',
  },
]

// ─── Notifications ────────────────────────────────────────────────────────────
export const NOTIFICATIONS = [
  { id: 'n-1', type: 'order_update', title: 'Commande mise à jour',  message: 'Votre commande #o-1 est en cours de broderie.',         read: false, created_at: '2026-03-19T08:00:00Z', order_id: 'o-1' },
  { id: 'n-2', type: 'message',      title: 'Nouveau message',       message: 'Fatima Khelifi vous a envoyé un message.',             read: false, created_at: '2026-03-18T16:30:00Z', order_id: 'o-1' },
  { id: 'n-3', type: 'order_update', title: 'Nouvelle commande',     message: "Nadia Boucherit a accepté votre commande #o-2.",       read: true,  created_at: '2026-03-16T10:00:00Z', order_id: 'o-2' },
  { id: 'n-4', type: 'review',       title: 'Avis laissé',           message: "Votre commande #o-3 a reçu un avis 5 étoiles.",        read: true,  created_at: '2026-01-15T09:00:00Z', order_id: 'o-3' },
]

// ─── Reviews ──────────────────────────────────────────────────────────────────
export const REVIEWS = [
  { id: 'r-1', client: DEMO_USERS.client,                             tailor_id: 't-1', order_id: 'o-3', rating: 5, comment: "Travail absolument exceptionnel. La robe était parfaite pour mon mariage !",              created_at: '2026-01-15T10:00:00Z' },
  { id: 'r-2', client: { id: 'u-9',  full_name: 'Lina Oukaci' },     tailor_id: 't-1', order_id: 'o-x', rating: 5, comment: "Magnifique broderie, délais respectés. Je recommande vivement.",                        created_at: '2026-02-20T11:00:00Z' },
  { id: 'r-3', client: { id: 'u-10', full_name: 'Sara Benmansour' }, tailor_id: 't-1', order_id: 'o-y', rating: 4, comment: "Très belle qualité, quelques jours de délai supplémentaire mais le résultat vaut l'attente.", created_at: '2026-01-28T14:00:00Z' },
]

// ─── Admin stats ──────────────────────────────────────────────────────────────
export const ADMIN_STATS = {
  total_users: 1247,
  total_tailors: 89,
  pending_verifications: 12,
  total_orders: 3842,
  orders_this_month: 247,
  revenue_this_month: 4580000,
  active_orders: 156,
}
