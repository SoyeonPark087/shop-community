/*
  ==========================================
  MOODAY COMMUNITY MAIN DATA
  Community Main v0.2 - GROUP 1
  ==========================================

  역할:
  - Community Main 카드의 단일 데이터 출처
  - Community Detail과 동일한 post id 사용
  - Latest / Popular 정렬을 위한 메타데이터 준비

  중요:
  1. 기존 post-01 ~ post-09 id는 변경하지 않습니다.
  2. 기존 카드 내용 / 이미지 / 태그 / 상품 수는 변경하지 않습니다.
  3. createdAt / popularityScore는
     Community Main v0.2 정렬 기능 준비용 데이터입니다.
  4. 아직 이 파일만 수정해도 실제 정렬 UI는 작동하지 않습니다.
     실제 Latest / Popular 정렬은 GROUP 2에서 Community.jsx에 연결합니다.
*/


/* =========================================
   01. COMMUNITY POSTS
========================================= */

/*
  createdAt
  ----------
  Latest 정렬을 위한 게시글 생성 시각입니다.

  현재 실제 게시 날짜 자료가 별도로 존재하지 않으므로
  프론트엔드 시연용 샘플 날짜를 사용합니다.

  기존 Main의 카드 순서를 유지하기 위해:

  post-01 → 가장 최근
  post-02 → 그다음
  ...
  post-09 → 가장 오래된 게시글

  순으로 설정했습니다.

  추후 Write → Main 연동 시
  Write의 createdAt과 동일한 형식으로 사용할 수 있도록
  ISO 8601 문자열 형태를 사용합니다.


  popularityScore
  ----------------
  Popular 정렬 기능을 먼저 시연하기 위한 임시 수치입니다.

  현재 Community Detail의 실제 Like state와
  연결된 값이 아닙니다.

  추후 게시글별 초기 Like 수를 서로 다르게 설정하고
  Main / Detail 데이터 계약을 통합할 경우:

  popularityScore
  → 실제 likes 값

  으로 교체할 수 있습니다.

  화면에는 popularityScore 자체를 표시하지 않습니다.
*/

export const communityPosts = [
  {
    id: 'post-01',
    author: 'sumi.day',
    tags: ['daily', 'outside'],
    excerpt: '오늘도 좋은 하루 :)',
    productCount: 2,
    image: '/images/community/community01.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-28T13:30:00+09:00',
    popularityScore: 72,
  },

  {
    id: 'post-02',
    author: 'yejin.k',
    tags: ['minimal', 'homewear'],
    excerpt: '집에서 보내는 느긋한 오후',
    productCount: 1,
    image: '/images/community/community02.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-27T18:10:00+09:00',
    popularityScore: 91,
  },

  {
    id: 'post-03',
    author: 'seo.yun',
    tags: ['outer', 'weekend'],
    excerpt: '가볍게 걸치기 좋은 오늘 아우터',
    productCount: 3,
    image: '/images/community/community03.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-26T15:40:00+09:00',
    popularityScore: 64,
  },

  {
    id: 'post-04',
    author: 'jiwoo.log',
    tags: ['layered', 'backdetail'],
    excerpt: '심플한데 한 끗이 다른 느낌',
    productCount: 2,
    image: '/images/community/community04.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-25T20:20:00+09:00',
    popularityScore: 83,
  },

  {
    id: 'post-05',
    author: 'eunseo.day',
    tags: ['knit', 'minimal'],
    excerpt: '거울 앞에서 마음에 든 오늘 룩',
    productCount: 2,
    image: '/images/community/community05.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-24T12:50:00+09:00',
    popularityScore: 97,
  },

  {
    id: 'post-06',
    author: 'hana.home',
    tags: ['homewear', 'daily'],
    excerpt: '편하게 입고 싶은 날의 이 조합',
    productCount: 1,
    image: '/images/community/community06.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-23T17:25:00+09:00',
    popularityScore: 58,
  },

  {
    id: 'post-07',
    author: 'narin.walk',
    tags: ['widepants', 'minimal'],
    excerpt: '핏이 예뻐서 자꾸 입게 되는 팬츠',
    productCount: 2,
    image: '/images/community/community07.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-22T11:15:00+09:00',
    popularityScore: 88,
  },

  {
    id: 'post-08',
    author: 'mira.note',
    tags: ['cardigan', 'colorpoint'],
    excerpt: '오늘은 조금 색을 더해봤어요',
    productCount: 1,
    image: '/images/community/community08.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-21T16:05:00+09:00',
    popularityScore: 69,
  },

  {
    id: 'post-09',
    author: 'sohee.archive',
    tags: ['sage', 'backdetail'],
    excerpt: '작은 디테일 하나로 분위기가 달라져요',
    productCount: 3,
    image: '/images/community/community09.jpg',

    // Main v0.2 정렬 메타데이터
    createdAt: '2026-09-20T14:35:00+09:00',
    popularityScore: 79,
  },
]


/* =========================================
   02. COMMUNITY MAIN TAGS
========================================= */

/*
  Main 상단에 표시하는 기존 해시태그입니다.

  GROUP 1에서는 변경하지 않습니다.

  현재 All만 선택 상태이며,
  실제 태그 필터 기능은 별도 후속 범위입니다.
*/

export const communityMainTags = [
  'All',
  'daily',
  'minimal',
  'weekend',
  'homewear',
  'layered',
  'neutral',
  'outside',
  'simple',
]