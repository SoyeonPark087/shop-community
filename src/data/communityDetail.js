
/*
  =========================================
  MOODAY COMMUNITY DETAIL DATA
  Version 1.1 - Product Slots & Images
  =========================================

  변경 사항:

  1. post-01:
     상품 2개 유지

  2. post-02 ~ post-09:
     상품 1개만 출력
     두 번째 상품 객체는 주석으로 보존

  3. 상품 이미지 경로 추가

  4. 기존 갤러리, 본문, 댓글 데이터 유지

  =========================================
*/


/* =====================================
   01. COMMUNITY IMAGE GALLERY
===================================== */

/*
  기존 갤러리 규칙 유지.

  Main 이미지 1장 + 서브이미지 3장.

  위치:
  public/images/community/
*/

function createGallery(number) {

  const id = String(number).padStart(2, '0')

  const base = '/images/community/'

  return [

    `${base}community${id}.jpg`,

    `${base}community${id}_sub01.jpg`,

    `${base}community${id}_sub02.jpg`,

    `${base}community${id}_sub03.jpg`,

  ]

}


/* =====================================
   02. PRODUCT IMAGE PATH
===================================== */

/*
  상품 이미지를 위한 신규 경로 규칙.

  실제 파일 위치:

  public/images/community/products/

  예:

  community01_product01.jpg
  community01_product02.jpg
  community02_product01.jpg

  파일 이름과 확장자는 정확히 일치해야 합니다.
*/

function createProductImage(number, productNumber) {

  const postId = String(number).padStart(2, '0')

  const productId =
    String(productNumber).padStart(2, '0')

  return (
    '/images/community/products/'
    + `community${postId}_product${productId}.jpg`
  )

}


/* =====================================
   03. INITIAL SAMPLE BODY
===================================== */

/*
  기존 Detail 시안의 샘플 본문 유지.

  게시글별 실제 내용은 후속 작업에서 변경합니다.
*/

const sampleBody = [

  '오늘은 가볍게 입고 나가고 싶어서\n차콜 슬리브리스에 크림 와이드 팬츠로 맞춰봤어요.',

  '상의는 최대한 심플하게 두고\n팬츠 실루엣으로 조금 여유 있는 느낌을 줬어요.',

  '햇빛 좋은 날에는 이런 담백한 조합이\n제일 손이 자주 가는 것 같아요 :)',

]


/* =====================================
   04. INITIAL SAMPLE COMMENTS
===================================== */

/*
  기존 댓글 샘플 유지.

  댓글 등록 기능은 아직 구현하지 않습니다.
*/

function createSampleComments(postId) {

  return [

    {
      id: `${postId}-comment-01`,

      author: 'jiyin.k',

      text: '차콜이랑 크림 조합 너무 깔끔해요.',

      time: '1시간 전',
    },

    {
      id: `${postId}-comment-02`,

      author: 'sujeong',

      text: '팬츠 떨어지는 핏이 진짜 예뻐요!',

      time: '50분 전',
    },

    {
      id: `${postId}-comment-03`,

      author: 'min.i',

      text: '가볍게 입었는데도 분위기 너무 좋아요.',

      time: '30분 전',
    },

  ]

}


/* =====================================
   05. PRODUCT DATA FACTORY
===================================== */

/*
  상품 데이터를 만드는 공통 함수입니다.

  number:
    게시글 번호

  productNumber:
    상품 슬롯 번호

  실제 Shop 상품 ID가 아직 없기 때문에
  현재 id는 커뮤니티 내부의 임시 ID입니다.

  상품 URL 역시 아직 확정되지 않았으므로
  null로 유지합니다.
*/

function createProduct(
  number,
  productNumber,
  name,
  price
) {

  const postId = String(number).padStart(2, '0')

  const productId =
    String(productNumber).padStart(2, '0')

  return {

    id: `post-${postId}-product-${productId}`,

    brand: 'mooday',

    name,

    price,

    image: createProductImage(
      number,
      productNumber
    ),

    url: null,

  }

}


/* =====================================
   06. PRODUCT SLOTS BY POST
===================================== */

/*
  핵심 변경 영역입니다.

  post-01:
    상품 2개 출력

  post-02 ~ post-09:
    상품 1개 출력

  두 번째 상품은 객체 전체를 주석 처리했습니다.

  추후 복원할 때에는 해당 주석을 해제하면 됩니다.

  주의:
  현재 상품명과 가격은 기존 시안의 샘플입니다.
  게시글별 실제 상품 매칭은 아직 확정되지 않았습니다.
*/


const productsByPost = {


  /* =================================
     POST 01
     상품 2개 유지
  ================================= */

  'post-01': [

    createProduct(
      1,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    createProduct(
      1,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),

  ],


  /* =================================
     POST 02
     두 번째 상품 주석 처리
  ================================= */

  'post-02': [

    createProduct(
      2,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      2,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],


  /* =================================
     POST 03
     두 번째 상품 주석 처리
  ================================= */

  'post-03': [

    createProduct(
      3,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      3,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],


  /* =================================
     POST 04
     두 번째 상품 주석 처리
  ================================= */

  'post-04': [

    createProduct(
      4,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      4,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],


  /* =================================
     POST 05
     두 번째 상품 주석 처리
  ================================= */

  'post-05': [

    createProduct(
      5,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      5,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],


  /* =================================
     POST 06
     두 번째 상품 주석 처리
  ================================= */

  'post-06': [

    createProduct(
      6,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      6,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],


  /* =================================
     POST 07
     두 번째 상품 주석 처리
  ================================= */

  'post-07': [

    createProduct(
      7,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      7,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],


  /* =================================
     POST 08
     두 번째 상품 주석 처리
  ================================= */

  'post-08': [

    createProduct(
      8,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      8,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],


  /* =================================
     POST 09
     두 번째 상품 주석 처리
  ================================= */

  'post-09': [

    createProduct(
      9,
      1,
      'Cotton Sleeveless Top',
      '₩49,000'
    ),

    /*
    createProduct(
      9,
      2,
      'Wide Nylon Pants',
      '₩89,000'
    ),
    */

  ],

}


/* =====================================
   07. DETAIL DATA FACTORY
===================================== */

/*
  게시글 번호를 받아 Detail 데이터를 구성합니다.

  기존 데이터 구조를 유지하면서
  products만 게시글별 배열로 연결합니다.
*/

function createDetail(number) {

  const id =
    `post-${String(number).padStart(2, '0')}`

  return {

    id,

    gallery: createGallery(number),

    time: '2시간 전',

    likes: 234,

    commentCount: 12,

    body: [...sampleBody],

    comments: createSampleComments(id),

    hashtags: [
      'daily',
      'minimal',
      'knit',
      'widepants',
      'spring',
      'neutral',
    ],

    /*
      변경된 상품 배열 연결.

      post-01은 2개.
      post-02~09는 1개.
    */

    products: productsByPost[id],

  }

}


/* =====================================
   08. NINE DETAIL POSTS
===================================== */

/*
  게시글 ID는 기존 Main과 동일합니다.

  Main 데이터는 수정하지 않습니다.
*/

export const communityDetailData = {

  'post-01': createDetail(1),

  'post-02': createDetail(2),

  'post-03': createDetail(3),

  'post-04': createDetail(4),

  'post-05': createDetail(5),

  'post-06': createDetail(6),

  'post-07': createDetail(7),

  'post-08': createDetail(8),

  'post-09': createDetail(9),

}