/*
  ==========================================
  MOODAY COMMUNITY MAIN DATA
  Community Main v0.2.1 - CONTENT DATA UPDATE
  ==========================================

  역할:
  - Community Main 카드 데이터
  - Community Detail과 동일한 post id 유지
  - Latest / Popular 기존 정렬 데이터 유지
  - 리뉴얼된 Main Excerpt / Product Count 반영
  - 카드에 표시되는 태그는 시각적 밀도를 줄이기 위해 2개씩 사용

  중요:
  1. post-01 ~ post-09 id는 변경하지 않습니다.
  2. 대표 이미지 경로는 변경하지 않습니다.
  3. createdAt / popularityScore는 이번 단계에서 유지합니다.
  4. 실제 Like / Comment Count / Popular 재설계는 후속 단계입니다.
*/


/* =========================================
   01. COMMUNITY POSTS
========================================= */

export const communityPosts = [
  {
    id: 'post-01',
    author: 'sumi.day',

    /*
      3-card group:
      #widelegpants → Card 01 / 07 / 08

      개인 태그:
      #mirrorselfie → Card 01
    */
    tags: [
      'widelegpants',
      'mirrorselfie',
    ],

    excerpt: '걷다가 찍은 사진이랑 거울 셀피까지 같이 남겨봤어요.',

    // Cotton Sleeveless Top + Wide Nylon Pants
    productCount: 2,

    image: '/images/community/community01.jpg',

    // Latest 정렬용 기존 데이터 유지
    createdAt: '2026-09-28T13:30:00+09:00',

    // Popular 임시 정렬값 유지
    popularityScore: 72,
  },

  {
    id: 'post-02',
    author: 'yejin.k',

    /*
      3-card group:
      #knitwear → Card 02 / 05 / 08

      개인 태그:
      #neutraloutfit → 현재 Main 노출 기준 Card 02
    */
    tags: [
      'knitwear',
      'neutraloutfit',
    ],

    excerpt: '햇빛 좋던 오후라 집에서 몇 장 남겨봤어요.',

    // Cable Knit Pullover
    productCount: 1,

    image: '/images/community/community02.jpg',

    createdAt: '2026-09-27T18:10:00+09:00',
    popularityScore: 91,
  },

  {
    id: 'post-03',
    author: 'seo.yun',

    /*
      2-card group:
      #layering → Card 03 / 04

      개인 태그:
      #blousonjacket → Card 03
    */
    tags: [
      'layering',
      'blousonjacket',
    ],

    excerpt: '외출 중 잠깐 쉬면서 몇 장 남겼어요.',

    // Loose-fit Cotton Blouson Jacket
    productCount: 1,

    image: '/images/community/community03.jpg',

    createdAt: '2026-09-26T15:40:00+09:00',
    popularityScore: 64,
  },

  {
    id: 'post-04',
    author: 'jiwoo.log',

    /*
      2-card groups:
      #layering → Card 03 / 04
      #hoodie   → Card 04 / 06
    */
    tags: [
      'layering',
      'hoodie',
    ],

    excerpt: '앞뒤 느낌이 달라서 사진마다 분위기가 조금씩 달라 보여요.',

    // Back-Open Hoodie
    productCount: 1,

    image: '/images/community/community04.jpg',

    createdAt: '2026-09-25T20:20:00+09:00',
    popularityScore: 83,
  },

  {
    id: 'post-05',
    author: 'eunseo.day',

    /*
      3-card groups:
      #knitwear   → Card 02 / 05 / 08
      #outfitcheck → Card 05 / 07 / 09
    */
    tags: [
      'knitwear',
      'outfitcheck',
    ],

    excerpt: '거울 보다가 마음에 들어서 몇 장 더 남겨봤어요.',

    // Bouclé Knit Cardigan
    productCount: 1,

    image: '/images/community/community05.jpg',

    createdAt: '2026-09-24T12:50:00+09:00',
    popularityScore: 97,
  },

  {
    id: 'post-06',
    author: 'hana.home',

    /*
      2-card group:
      #hoodie → Card 04 / 06

      개인 태그:
      #gettingready → Card 06
    */
    tags: [
      'hoodie',
      'gettingready',
    ],

    excerpt: '그냥 준비하다가 남긴 사진들인데 은근 마음에 들었어요.',

    // Soft Zip-up Hoodie
    productCount: 1,

    image: '/images/community/community06.jpg',

    createdAt: '2026-09-23T17:25:00+09:00',
    popularityScore: 58,
  },

  {
    id: 'post-07',

    /*
      현재 v0.2.1 Main author 유지.
      이번 Patch에서는 Card 01~07 author를 변경하지 않습니다.
    */
    author: 'narin.walk',

    /*
      3-card groups:
      #widelegpants → Card 01 / 07 / 08
      #outfitcheck  → Card 05 / 07 / 09
    */
    tags: [
      'widelegpants',
      'outfitcheck',
    ],

    excerpt: '같은 팬츠인데 자세가 달라지니까 실루엣도 꽤 다르게 보여요.',

    // Wide Nylon Pants
    productCount: 1,

    image: '/images/community/community07.jpg',

    createdAt: '2026-09-22T11:15:00+09:00',
    popularityScore: 88,
  },

  {
    id: 'post-08',

    // Main / Detail 공통 최신 Author
    author: 'mira.note',

    /*
      3-card groups:
      #knitwear     → Card 02 / 05 / 08
      #widelegpants → Card 01 / 07 / 08
    */
    tags: [
      'knitwear',
      'widelegpants',
    ],

    excerpt: '오늘은 보라색 하나만 포인트로 입어봤어요.',

    // Soft Bouclé Cardigan
    productCount: 1,

    image: '/images/community/community08.jpg',

    createdAt: '2026-09-21T16:05:00+09:00',
    popularityScore: 69,
  },

  {
    id: 'post-09',

    // Main / Detail 공통 최신 Author
    author: 'sohee.archive',

    /*
      3-card group:
      #outfitcheck → Card 05 / 07 / 09

      개인 태그:
      #backdetail → Card 09
    */
    tags: [
      'outfitcheck',
      'backdetail',
    ],

    excerpt: '이날은 이상하게 뒷모습 사진이 더 마음에 들더라고요.',

    // Back Tie Long Sleeve
    productCount: 1,

    image: '/images/community/community09.jpg',

    createdAt: '2026-09-20T14:35:00+09:00',
    popularityScore: 79,
  },
]


/* =========================================
   02. COMMUNITY MAIN TAGS
========================================= */

/*
  Main 상단 대표 태그입니다.

  카드별 태그를 2개로 줄였지만,
  필터 결과 규모가 한쪽으로 몰리지 않도록:

  - 3-card group
  - 2-card group
  - 1-card 특화 태그

  를 섞어서 노출합니다.


  3-card groups
  ----------------
  #knitwear
  → 02 / 05 / 08

  #widelegpants
  → 01 / 07 / 08

  #outfitcheck
  → 05 / 07 / 09


  2-card groups
  ----------------
  #layering
  → 03 / 04

  #hoodie
  → 04 / 06


  1-card groups
  ----------------
  #mirrorselfie
  → 01

  #gettingready
  → 06

  #backdetail
  → 09
*/

export const communityMainTags = [
  'All',

  // 3-card groups
  'knitwear',
  'widelegpants',
  'outfitcheck',

  // 2-card groups
  'layering',
  'hoodie',

  // 1-card / 특화 태그
  'mirrorselfie',
  'gettingready',
  'backdetail',
]