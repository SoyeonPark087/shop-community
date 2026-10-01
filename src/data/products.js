export const SHOP_CATEGORIES = [
  { value: 'all', label: 'ALL' },
  { value: 'outer', label: 'OUTER' },
  { value: 'top', label: 'TOP' },
  { value: 'bottom', label: 'BOTTOM' },
  { value: 'knit', label: 'KNIT' },
  { value: 'dress', label: 'DRESS' },
  { value: 'bag', label: 'BAG' },
  { value: 'acc', label: 'ACC' },
]

export const products = [
  {
    id: 1,
    name: '베이직 골지 슬리브리스',
    category: 'top',
    price: 49000,
    image: '/images/shop/product01.png',
    popularity: 99,
    featured: 9,

    colors: [
      { name: 'Charcoal', hex: '#4a4a48' },
      { name: 'Ivory', hex: '#e9e5db' },
      { name: 'Light Gray', hex: '#c8c8c5' },
      { name: 'Black', hex: '#242424' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product01.png',
      '/images/shop/product01-sub01.png',
      '/images/shop/product01-sub02.png',
      '/images/shop/product01-sub03.png',
      '/images/shop/product01-sub04.png',
      '/images/shop/product01-sub05.png',
      '/images/shop/product01-sub06.png',
      '/images/shop/product01-sub07.png',
      '/images/shop/product01-sub08.png',
      '/images/shop/product01-sub09.png',
    ],

    detailImages: [
      '/images/shop/product01-detail01.png',
      '/images/shop/product01-detail02.png',
      '/images/shop/product01-detail03.png',
      '/images/shop/product01-detail04.png',
      '/images/shop/product01-detail05.png',
      '/images/shop/product01-detail06.png',
      '/images/shop/product01-detail07.png',
      '/images/shop/product01-detail08.png',
    ],

    description:
      '부드러운 촉감과 편안한 착용감이 돋보이는 슬리브리스입니다.',

    material: 'Cotton 95%, Span 5%',
  },

  {
    id: 2,
    name: '소프트 코튼 셔츠',
    category: 'top',
    price: 93000,
    image: '/images/shop/product02.png',
    popularity: 98,
    featured: 8,

    colors: [
      { name: 'Pink', hex: '#d6b5b0' },
      { name: 'Ivory', hex: '#ece7dd' },
      { name: 'Beige', hex: '#c8b9a5' },
      { name: 'Light Blue', hex: '#abbcc6' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product02.png',
      '/images/shop/product02-sub01.png',
      '/images/shop/product02-sub02.png',
      '/images/shop/product02-sub03.png',
      '/images/shop/product02-sub04.png',
      '/images/shop/product02-sub05.png',
      '/images/shop/product02-sub06.png',
      '/images/shop/product02-sub07.png',
    ],

    detailImages: [
      '/images/shop/product02-detail01.png',
      '/images/shop/product02-detail02.png',
      '/images/shop/product02-detail03.png',
      '/images/shop/product02-detail04.png',
      '/images/shop/product02-detail05.png',
      '/images/shop/product02-detail06.png',
      '/images/shop/product02-detail07.png',
    ],

    description:
      '부드럽고 포근한 코튼 소재와 여유로운 실루엣이 돋보이는 셔츠입니다. 자연스럽게 떨어지는 핏으로 단독 또는 가벼운 아우터처럼 다양하게 활용할 수 있습니다.',

    material: 'Cotton 100%',
  },

  {
    id: 3,
    name: '부클 니트 가디건',
    category: 'knit',
    price: 89000,
    image: '/images/shop/product03.png',
    popularity: 97,
    featured: 7,

    colors: [
      { name: 'Sage Green', hex: '#9ca58d' },
      { name: 'Ivory', hex: '#e9e4d8' },
      { name: 'Beige', hex: '#c5b6a2' },
      { name: 'Dusty Purple', hex: '#948796' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product03.png',
      '/images/shop/product03-sub01.png',
      '/images/shop/product03-sub02.png',
      '/images/shop/product03-sub03.png',
      '/images/shop/product03-sub04.png',
      '/images/shop/product03-sub05.png',
      '/images/shop/product03-sub06.png',
      '/images/shop/product03-sub07.png',
      '/images/shop/product03-sub08.png',
    ],

    detailImages: [
      '/images/shop/product03-detail01.png',
      '/images/shop/product03-detail02.png',
      '/images/shop/product03-detail03.png',
      '/images/shop/product03-detail04.png',
      '/images/shop/product03-detail05.png',
      '/images/shop/product03-detail06.png',
      '/images/shop/product03-detail07.png',
      '/images/shop/product03-detail08.png',
    ],

    description:
      '포근한 부클 텍스처와 은은한 세이지 그린 컬러가 돋보이는 니트 가디건입니다. 여유로운 실루엣으로 단독 또는 레이어드 스타일을 편안하게 연출할 수 있습니다.',

    material: 'Soft Bouclé Blend',
  },

  {
    id: 4,
    name: '소프트 후드 집업',
    category: 'outer',
    price: 79000,
    image: '/images/shop/product04.png',
    popularity: 96,
    featured: 6,

    colors: [
      { name: 'Ivory', hex: '#e8e3d8' },
      { name: 'Oatmeal', hex: '#c9bda9' },
      { name: 'Gray', hex: '#999a98' },
      { name: 'Black', hex: '#242424' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product04.png',
      '/images/shop/product04-sub01.png',
      '/images/shop/product04-sub02.png',
      '/images/shop/product04-sub03.png',
      '/images/shop/product04-sub04.png',
      '/images/shop/product04-sub05.png',
      '/images/shop/product04-sub06.png',
      '/images/shop/product04-sub07.png',
      '/images/shop/product04-sub08.png',
    ],

    detailImages: [
      '/images/shop/product04-detail01.png',
      '/images/shop/product04-detail02.png',
      '/images/shop/product04-detail03.png',
      '/images/shop/product04-detail04.png',
      '/images/shop/product04-detail05.png',
      '/images/shop/product04-detail06.png',
      '/images/shop/product04-detail07.png',
      '/images/shop/product04-detail08.png',
    ],

    description:
      '부드러운 코튼 소재와 여유로운 실루엣이 돋보이는 후드 집업입니다. 이중 지퍼 디자인으로 다양한 스타일링이 가능하며, 편안한 데일리 아우터로 활용하기 좋습니다.',

    material: 'Cotton 100%',
  },

  {
    id: 5,
    name: '루즈핏 코튼 블루종 점퍼',
    category: 'outer',
    price: 149000,
    image: '/images/shop/product05.png',
    popularity: 95,
    featured: 5,

    colors: [
      { name: 'Navy', hex: '#252a35' },
      { name: 'Khaki', hex: '#737361' },
      { name: 'Beige', hex: '#b8aa96' },
      { name: 'Black', hex: '#222222' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product05.png',
      '/images/shop/product05-sub01.png',
      '/images/shop/product05-sub02.png',
      '/images/shop/product05-sub03.png',
      '/images/shop/product05-sub04.png',
      '/images/shop/product05-sub05.png',
      '/images/shop/product05-sub06.png',
      '/images/shop/product05-sub07.png',
      '/images/shop/product05-sub08.png',
    ],

    detailImages: [
      '/images/shop/product05-detail01.png',
      '/images/shop/product05-detail02.png',
      '/images/shop/product05-detail03.png',
      '/images/shop/product05-detail04.png',
      '/images/shop/product05-detail05.png',
      '/images/shop/product05-detail06.png',
      '/images/shop/product05-detail07.png',
      '/images/shop/product05-detail08.png',
    ],

    description:
      '여유로운 실루엣이 멋스러운 코튼 블루종 점퍼입니다. 탄탄한 코튼 소재와 신축성 있는 소매 및 밑단 디테일로 편안하게 착용할 수 있으며, 데일리룩부터 캐주얼한 스타일링까지 다양하게 활용할 수 있습니다.',

    material: 'Cotton 100%',
  },

  {
    id: 6,
    name: '케이블 니트 풀오버',
    category: 'knit',
    price: 85000,
    image: '/images/shop/product06.png',
    popularity: 94,
    featured: 4,

    colors: [
      { name: 'Ivory', hex: '#e6e0d5' },
      { name: 'Oatmeal', hex: '#c8b9a4' },
      { name: 'Light Gray', hex: '#c6c6c3' },
      { name: 'Navy', hex: '#303541' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product06.png',
      '/images/shop/product06-sub01.png',
      '/images/shop/product06-sub02.png',
      '/images/shop/product06-sub03.png',
      '/images/shop/product06-sub04.png',
      '/images/shop/product06-sub05.png',
      '/images/shop/product06-sub06.png',
      '/images/shop/product06-sub07.png',
      '/images/shop/product06-sub08.png',
    ],

    detailImages: [
      '/images/shop/product06-detail01.png',
      '/images/shop/product06-detail02.png',
      '/images/shop/product06-detail03.png',
      '/images/shop/product06-detail04.png',
      '/images/shop/product06-detail05.png',
      '/images/shop/product06-detail06.png',
      '/images/shop/product06-detail07.png',
      '/images/shop/product06-detail08.png',
    ],

    description:
      '포근한 아이보리 컬러와 입체적인 케이블 짜임이 돋보이는 니트 풀오버입니다. 여유로운 실루엣과 가벼운 착용감으로 편안하게 연출할 수 있습니다.',

    material: 'Cotton Blend',
  },

  {
    id: 7,
    name: '백 오픈 후드 맨투맨',
    category: 'top',
    price: 95000,
    image: '/images/shop/product07.png',
    popularity: 93,
    featured: 3,

    colors: [
      { name: 'Cocoa', hex: '#806856' },
      { name: 'Oatmeal', hex: '#c5b6a0' },
      { name: 'Charcoal', hex: '#52504d' },
      { name: 'Black', hex: '#242424' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product07.png',
      '/images/shop/product07-sub01.png',
      '/images/shop/product07-sub02.png',
      '/images/shop/product07-sub03.png',
      '/images/shop/product07-sub04.png',
      '/images/shop/product07-sub05.png',
      '/images/shop/product07-sub06.png',
      '/images/shop/product07-sub07.png',
      '/images/shop/product07-sub08.png',
      '/images/shop/product07-sub09.png',
      '/images/shop/product07-sub10.png',
    ],

    detailImages: [
      '/images/shop/product07-detail01.png',
      '/images/shop/product07-detail02.png',
      '/images/shop/product07-detail03.png',
      '/images/shop/product07-detail04.png',
      '/images/shop/product07-detail05.png',
      '/images/shop/product07-detail06.png',
      '/images/shop/product07-detail07.png',
      '/images/shop/product07-detail08.png',
    ],

    description:
      '뒷면의 넓은 타원형 오픈 디테일이 포인트인 후드 맨투맨입니다. 부드러운 코튼 블렌드 소재로 편안한 착용감을 제공하며, 여유 있는 실루엣으로 데일리하게 즐기기 좋은 아이템입니다.',

    material: 'Cotton Blend',
  },

  {
    id: 8,
    name: '소프트 부클 가디건',
    category: 'knit',
    price: 125000,
    image: '/images/shop/product08.png',
    popularity: 92,
    featured: 2,

    colors: [
      { name: 'Dusty Purple', hex: '#958797' },
      { name: 'Ivory', hex: '#e8e1d7' },
      { name: 'Pink', hex: '#c9a9ad' },
      { name: 'Charcoal', hex: '#555251' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product08.png',
      '/images/shop/product08-sub01.png',
      '/images/shop/product08-sub02.png',
      '/images/shop/product08-sub03.png',
      '/images/shop/product08-sub04.png',
      '/images/shop/product08-sub05.png',
      '/images/shop/product08-sub06.png',
      '/images/shop/product08-sub07.png',
    ],

    detailImages: [
      '/images/shop/product08-detail01.png',
      '/images/shop/product08-detail02.png',
      '/images/shop/product08-detail03.png',
      '/images/shop/product08-detail04.png',
      '/images/shop/product08-detail05.png',
      '/images/shop/product08-detail06.png',
      '/images/shop/product08-detail07.png',
    ],

    description:
      '포근한 부클 텍스처와 슬림한 크롭 실루엣이 돋보이는 가디건입니다. 단독 또는 레이어드 스타일로 다양하게 연출할 수 있습니다.',

    material: 'Soft Bouclé Blend',
  },

  {
    id: 9,
    name: '백 타이 롱슬리브',
    category: 'top',
    price: 56000,
    image: '/images/shop/product09.png',
    popularity: 91,
    featured: 1,

    colors: [
      { name: 'Sage Green', hex: '#89947f' },
      { name: 'Ivory', hex: '#ebe6dc' },
      { name: 'Brown', hex: '#80695c' },
      { name: 'Black', hex: '#242424' },
    ],

    sizes: ['S', 'M', 'L'],

    galleryImages: [
      '/images/shop/product09.png',
      '/images/shop/product09-sub01.png',
      '/images/shop/product09-sub02.png',
      '/images/shop/product09-sub03.png',
      '/images/shop/product09-sub04.png',
      '/images/shop/product09-sub05.png',
      '/images/shop/product09-sub06.png',
      '/images/shop/product09-sub07.png',
      '/images/shop/product09-sub08.png',
    ],

    detailImages: [
      '/images/shop/product09-detail01.png',
      '/images/shop/product09-detail02.png',
      '/images/shop/product09-detail03.png',
      '/images/shop/product09-detail04.png',
      '/images/shop/product09-detail05.png',
      '/images/shop/product09-detail06.png',
      '/images/shop/product09-detail07.png',
      '/images/shop/product09-detail08.png',
    ],

    description:
      '부드러운 스트레치 소재와 깊은 백 오픈 디자인이 돋보이는 슬림핏 롱슬리브입니다. 뒤 타이와 옆선 셔링 디테일로 실루엣을 섬세하게 조절할 수 있습니다.',

    material: 'Soft Stretch Jersey',
  },
]
