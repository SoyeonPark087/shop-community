/*
  =========================================
  MOODAY COMMUNITY DETAIL DATA
  v0.2.1 - CONTENT DATA RENEWAL
  =========================================

  이번 단계의 목적:

  1. 기존 9개 게시글이 공유하던 sample Body 제거
  2. 기존 9개 게시글이 공유하던 sample Comments 제거
  3. Card 01~09별 리뉴얼 Body 적용
  4. Card 01~09별 초기 댓글 3개 적용
  5. Card 01~09별 전체 Detail Hashtags 적용
  6. Card 01~09별 실제 Styled Product 적용
  7. Card 01~09별 고정 상대시간 적용

  유지하는 것:

  - 기존 Gallery 이미지 경로
  - 기존 Product 이미지 경로 규칙
  - likes: 234
  - commentCount: 12
  - Product Detail url: null
  - Community Detail의 기존 인터랙션 구조

  아직 후속 단계로 남겨두는 것:

  - 게시글별 실제 Initial Like
  - 게시글별 실제 Comment Count
  - 실제 Like 기반 Popular 정렬
  - Product Detail route 연결
  - My Collection 연결
*/


/* =====================================
   01. COMMUNITY IMAGE GALLERY
===================================== */

/*
  기존 Gallery 경로 규칙을 그대로 유지합니다.

  각 게시글:

  Main 1장
  +
  Sub 3장

  실제 위치:

  public/images/community/

  예:
  community01.jpg
  community01_sub01.jpg
  community01_sub02.jpg
  community01_sub03.jpg
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
  기존 Product 이미지 경로 규칙을 유지합니다.

  실제 위치:

  public/images/community/products/

  예:
  community01_product01.jpg
  community01_product02.jpg
  community02_product01.jpg
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
   03. DETAIL BODY BY POST
===================================== */

/*
  기존 sampleBody 하나를 9개 게시글이 공유하던 방식을 제거합니다.

  이제 각각의 Community Post가
  서로 다른 실제 본문을 가집니다.

  Main의 짧은 Excerpt와
  Detail의 Body가 같은 게시물 맥락을 공유하도록 구성했습니다.
*/

const bodyByPost = {


  /* =================================
     POST 01
     Photo-dump / Day-log
  ================================= */

  'post-01': [

    '오늘은 사진이 생각보다 여러 장 남아서 같이 올려봐요.',

    '걷다가 찍은 것도 있고, 잠깐 앉아 있을 때랑 거울 앞에서 찍은 사진도 섞였어요.',

    '같은 옷인데 장소나 자세가 달라지니까 느낌도 조금씩 달라 보여서 골라내기 아깝더라고요.',

  ],


  /* =================================
     POST 02
     Slow-day / Indoor-moment
  ================================= */

  'post-02': [

    '집에서 천천히 보내던 날이에요.',

    '창가에 햇빛이 잘 들어와서 앉아 있다가 몇 장 찍고, 거울 앞에서도 한 장 남겼어요.',

    '특별히 꾸민 날은 아니었는데 이런 평범한 날 사진이 나중에 보면 더 마음에 남는 것 같아요.',

  ],


  /* =================================
     POST 03
     City stop / Outerwear casual
  ================================= */

  'post-03': [

    '잠깐 쉬는 동안 찍은 사진들.',

    '첫 사진은 서 있을 때 찍고, 나중에는 그냥 바닥에 앉아서도 한 장 남겼어요. 가까이 찍은 컷은 생각보다 블루종이랑 스트라이프가 잘 보여서 같이 올려봅니다.',

    '이날은 그냥 외출 중에 가볍게 남긴 사진들이에요.',

  ],


  /* =================================
     POST 04
     Small Discovery / Detail-focused
  ================================= */

  'post-04': [

    '앞에서는 그냥 무난한 후디처럼 보여서 뒤 디테일이 이렇게 눈에 띌 줄은 몰랐어요.',

    '실내에서 뒤돌아 찍은 사진이랑 밖에서 찍은 컷을 보니까 오픈 디테일이 생각보다 분위기를 많이 바꾸더라고요.',

    '앞뒤 느낌이 다른 옷이라 사진마다 조금씩 다르게 보여서 마음에 들었어요.',

  ],


  /* =================================
     POST 05
     Outfit check / Personal selfie
  ================================= */

  'post-05': [

    '거울 보다가 그냥 한 장 찍었는데 생각보다 잘 나와서 몇 장 더 남겼어요.',

    '가까이서 보면 가디건 질감이 꽤 잘 보이고, 밖에서 찍은 사진에서는 전체 색 조합이 더 자연스럽게 보여서 같이 올려봅니다.',

    '딱히 계획하고 입은 건 아닌데 사진으로 보니까 은근 마음에 들었어요.',

  ],


  /* =================================
     POST 06
     Getting ready / Easy everyday layer
  ================================= */

  'post-06': [

    '신발끈 묶다가 한 장, 방에서 쉬고 있을 때도 몇 장 남겼어요.',

    '밖에서 찍은 사진까지 같이 보니까 같은 옷인데 장소마다 분위기가 조금씩 달라 보여서 재밌더라고요.',

    '특별히 꾸민 느낌보다는 그냥 평소 준비하는 순간들이 그대로 남은 사진들이에요.',

  ],


  /* =================================
     POST 07
     Fit check / One-item focus
  ================================= */

  'post-07': [

    '오늘은 상의는 최대한 단순하게 입고 팬츠가 잘 보이는 사진들을 남겨봤어요.',

    '서 있을 때는 길게 떨어지는 실루엣이 잘 보이고, 앉아 있는 사진에서는 원단이 접히는 느낌이 또 다르게 보이더라고요.',

    /*
      기존 문서의:
      "마지막에는 옷만 따로 찍어봤는데..."

      문장은 실제 Gallery에서 flat-lay가 Main 첫 이미지이므로
      순서를 특정하지 않는 표현으로 보정했습니다.
    */
    '옷만 따로 찍은 컷도 같이 넣어봤는데 입었을 때랑 놓아뒀을 때 느낌 차이가 꽤 재밌었어요.',

  ],


  /* =================================
     POST 08
     Color-led outfit / Soft color contrast
  ================================= */

  'post-08': [

    '오늘의 색은 보라색.',

    '크림 팬츠랑 같이 입으니까 생각보다 전체가 차분하게 정리되더라고요.',

    '공원에서 찍은 사진은 컬러가 또렷하고, 실내에서는 조금 더 부드럽게 보여서 두 분위기 다 마음에 들었어요.',

  ],


  /* =================================
     POST 09
     Back-view styling / Quiet statement
  ================================= */

  'post-09': [

    '정면보다 뒤에서 봤을 때 더 마음에 들었던 옷.',

    '앞은 꽤 심플한데 뒤로 돌면 타이 디테일이 확 보여서 이날은 뒷모습 사진을 더 많이 남겼어요.',

    '크림 팬츠처럼 힘을 뺀 하의랑 같이 입으니까 상의 포인트도 너무 세게 느껴지지 않아서 좋았어요.',

  ],

}


/* =====================================
   04. COMMENTS BY POST
===================================== */

/*
  기존에는:

  jiyin.k
  sujeong
  min.i

  세 사용자의 동일한 Sample Comment가
  모든 게시글에 반복되었습니다.

  이제 Card 01~09별로
  각각 다른 초기 댓글 3개를 사용합니다.


  데이터 구조:

  id
  author
  text
  minutesAgo
  time


  minutesAgo:
    시간 선후관계 QA용 고정 숫자

  time:
    실제 UI에 그대로 표시할 고정 문자열

  중요:
  minutesAgo를 기준으로 time을
  런타임에서 다시 계산하지 않습니다.
*/


const commentsByPost = {


  /* =================================
     POST 01 COMMENTS
  ================================= */

  'post-01': [

    {
      id: 'post-01-comment-01',

      author: 'chaewon',

      text: '첫 사진 걷는 순간이 제일 자연스럽게 나온 것 같아요.',

      minutesAgo: 29,

      time: '29분 전',
    },

    {
      id: 'post-01-comment-02',

      author: 'sua.k',

      text: '거울 사진 보니까 팬츠 핏이 더 잘 보이네요',

      minutesAgo: 17,

      time: '17분 전',
    },

    {
      id: 'post-01-comment-03',

      author: 'heejin22',

      text: '밖에서 찍은 컷들이랑 실내 셀피가 같이 있으니까 실제 하루 기록 보는 느낌이에요 ㅎㅎ',

      minutesAgo: 6,

      time: '6분 전',
    },

  ],


  /* =================================
     POST 02 COMMENTS
  ================================= */

  'post-02': [

    {
      id: 'post-02-comment-01',

      author: 'minji__',

      text: '창가 사진이 제일 좋아요. 니트 색이 빛 받으니까 더 부드럽게 보이네요',

      minutesAgo: 52,

      time: '52분 전',
    },

    {
      id: 'post-02-comment-02',

      author: 'yewon.k',

      text: '거울 사진 보니까 팬츠까지 같이 봤을 때 조합이 되게 편안해 보여요',

      minutesAgo: 31,

      time: '31분 전',
    },

    {
      id: 'post-02-comment-03',

      author: 'soyoung93',

      text: '세 번째 사진 진짜 일상 중간에 찍은 느낌이라 좋다 ㅎㅎ',

      minutesAgo: 12,

      time: '12분 전',
    },

  ],


  /* =================================
     POST 03 COMMENTS
  ================================= */

  'post-03': [

    {
      id: 'post-03-comment-01',

      author: 'dahyeon_',

      text: '두 번째 사진이 제일 자연스럽게 나온 것 같아요. 앉아 있는 컷 분위기 좋다',

      minutesAgo: 187,

      time: '3시간 전',
    },

    {
      id: 'post-03-comment-02',

      author: 'jina88',

      text: '가까이 찍은 사진 보니까 스트라이프 티랑 블루종 조합이 더 잘 보이네요',

      minutesAgo: 82,

      time: '1시간 전',
    },

    {
      id: 'post-03-comment-03',

      author: 'arin__',

      text: '첫 사진은 그냥 지나가다 찍은 느낌이라 제일 좋아요 ㅎㅎ',

      minutesAgo: 24,

      time: '24분 전',
    },

  ],


  /* =================================
     POST 04 COMMENTS
  ================================= */

  'post-04': [

    {
      id: 'post-04-comment-01',

      author: 'seulgi_',

      text: '카페 사진은 그냥 편한 후디 느낌인데 뒤돌아 찍은 컷 보니까 완전 다르게 보여요',

      minutesAgo: 432,

      time: '7시간 전',
    },

    {
      id: 'post-04-comment-02',

      author: 'mijin04',

      text: '공원 사진 분위기 진짜 좋다. 책 들고 있는 컷이 제일 자연스러운 것 같아요',

      minutesAgo: 246,

      time: '4시간 전',
    },

    {
      id: 'post-04-comment-03',

      author: 'nayeon__',

      text: '브라운 톤으로 맞춘 것도 잘 어울리네요. 뒤쪽 포인트 때문에 너무 심심하지도 않고',

      minutesAgo: 71,

      time: '1시간 전',
    },

  ],


  /* =================================
     POST 05 COMMENTS
  ================================= */

  'post-05': [

    {
      id: 'post-05-comment-01',

      author: 'eunchae',

      text: '첫 사진 각도 진짜 잘 나왔네요. 가디건 질감도 되게 잘 보여요',

      minutesAgo: 735,

      time: '12시간 전',
    },

    {
      id: 'post-05-comment-02',

      author: 'somi_02',

      text: '거울샷보다 마지막 야외 사진이 더 분위기 있는 것 같아요',

      minutesAgo: 418,

      time: '7시간 전',
    },

    {
      id: 'post-05-comment-03',

      author: 'yuri.zip',

      text: '사진마다 세이지 컬러가 조금씩 다르게 보여서 그것도 재밌네요',

      minutesAgo: 129,

      time: '2시간 전',
    },

  ],


  /* =================================
     POST 06 COMMENTS
  ================================= */

  'post-06': [

    {
      id: 'post-06-comment-01',

      author: 'soobin',

      text: '첫 사진 신발끈 묶는 장면이 제일 자연스럽게 나온 것 같아요',

      minutesAgo: 1320,

      time: '22시간 전',
    },

    {
      id: 'post-06-comment-02',

      author: 'mira_7',

      text: '밖에서 찍은 사진 보니까 아이보리 집업이 생각보다 더 깔끔하게 보이네요',

      minutesAgo: 840,

      time: '14시간 전',
    },

    {
      id: 'post-06-comment-03',

      author: 'haeun.jpg',

      text: '브라운 팬츠랑 같이 입으니까 전체 톤이 차분해서 좋다',

      minutesAgo: 300,

      time: '5시간 전',
    },

  ],


  /* =================================
     POST 07 COMMENTS
  ================================= */

  'post-07': [

    {
      id: 'post-07-comment-01',

      author: 'seoyeon',

      text: '두 번째 사진 보고 생각보다 팬츠 폭이 진짜 넓다는 걸 알았어요',

      minutesAgo: 2250,

      time: '1일 전',
    },

    {
      id: 'post-07-comment-02',

      author: 'jiyu88',

      text: '저는 거울샷이 제일 좋아요. 실제로 입으면 어느 정도까지 내려오는지 확 보이네요',

      minutesAgo: 1090,

      time: '18시간 전',
    },

    {
      id: 'post-07-comment-03',

      author: 'miso',

      text: '이런 크림 팬츠는 흰 상의랑 같이 입어도 괜찮네요 생각보다 안 심심하다',

      minutesAgo: 365,

      time: '6시간 전',
    },

  ],


  /* =================================
     POST 08 COMMENTS
  ================================= */

  'post-08': [

    {
      id: 'post-08-comment-01',

      author: 'yerim',

      text: '첫 사진에서 보라색이 제일 예쁘게 보이는 것 같아요. 배경 초록이랑도 잘 어울리네요',

      minutesAgo: 4320,

      time: '3일 전',
    },

    {
      id: 'post-08-comment-02',

      author: 'dawon19',

      text: '계단에 앉은 사진이 제일 자연스럽다. 크림 팬츠랑 같이 보니까 컬러가 생각보다 차분해요',

      minutesAgo: 1440,

      time: '1일 전',
    },

    {
      id: 'post-08-comment-03',

      author: 'suah',

      text: '실내 가까이 찍은 사진은 가디건 질감이 진짜 잘 보이네요',

      minutesAgo: 660,

      time: '11시간 전',
    },

  ],


  /* =================================
     POST 09 COMMENTS
  ================================= */

  'post-09': [

    {
      id: 'post-09-comment-01',

      author: 'jiwon',

      text: '첫 사진 포즈가 제일 좋아요. 거울샷인데 뒤쪽 포인트까지 다 보여서 좋다',

      minutesAgo: 7200,

      time: '5일 전',
    },

    {
      id: 'post-09-comment-02',

      author: 'arin24',

      text: '창가에서 찍은 컷 보니까 타이 위치가 생각보다 위쪽이네요. 등 라인 깔끔해 보여요',

      minutesAgo: 4320,

      time: '3일 전',
    },

    {
      id: 'post-09-comment-03',

      author: 'minseo',

      text: '야외 사진은 앞모습이라 그런지 같은 옷인데 훨씬 담백하게 느껴져요',

      minutesAgo: 1440,

      time: '1일 전',
    },

  ],

}


/* =====================================
   05. DETAIL HASHTAGS BY POST
===================================== */

/*
  중요:

  Community Main에서는 시각적 밀도를 줄이기 위해
  카드당 2개의 대표 Tag만 보여줍니다.

  하지만 Community Detail에서는
  각 게시물에 설계된 전체 Tag를 그대로 보여줍니다.

  따라서:

  Main tags
  ≠
  Detail hashtags

  이것은 의도된 구조입니다.
*/

const hashtagsByPost = {


  /* POST 01 */
  'post-01': [
    'ootd',
    'streetstyle',
    'tanktop',
    'widelegpants',
    'mirrorselfie',
  ],


  /* POST 02 */
  'post-02': [
    'knitwear',
    'cableknit',
    'neutraloutfit',
    'relaxedstyle',
    'windowlight',
  ],


  /* POST 03 */
  'post-03': [
    'outerwear',
    'blousonjacket',
    'stripedtop',
    'layering',
    'cottonjacket',
  ],


  /* POST 04 */
  'post-04': [
    'hoodie',
    'backdetail',
    'brownoutfit',
    'layering',
    'coffeebreak',
  ],


  /* POST 05 */
  'post-05': [
    'cardigan',
    'knitwear',
    'boucle',
    'sagegreen',
    'outfitcheck',
  ],


  /* POST 06 */
  'post-06': [
    'zipuphoodie',
    'hoodie',
    'gettingready',
    'comfyoutfit',
  ],


  /* POST 07 */
  'post-07': [
    'widelegpants',
    'nylonpants',
    'neutraloutfit',
    'outfitcheck',
    'pleatedpants',
  ],


  /* POST 08 */
  'post-08': [
    'knitwear',
    'boucle',
    'widelegpants',
    'purpleoutfit',
    'croppedcardigan',
  ],


  /* POST 09 */
  'post-09': [
    'outfitcheck',
    'backdetail',
    'sagegreen',
    'backtietop',
    'sideruching',
  ],

}


/* =====================================
   06. FIXED TIME DATA BY POST
===================================== */

/*
  실제 현재 시각과의 차이를 계산하지 않습니다.

  예:
  Date.now() - createdAt

  같은 동적 방식은 사용하지 않습니다.

  이유:
  시간이 지나면 모든 게시물이
  몇 주 전 / 몇 달 전으로 뭉치는 것을 방지하기 위함입니다.


  postedMinutesAgo:
    시간 순서 QA용 고정 숫자

  displayTime:
    UI에 그대로 출력하는 고정 문자열

  중요:
  displayTime은 postedMinutesAgo에서
  런타임 계산하지 않습니다.
*/

const timeByPost = {

  'post-01': {
    postedMinutesAgo: 38,
    displayTime: '38분 전',
  },

  'post-02': {
    postedMinutesAgo: 96,
    displayTime: '1시간 전',
  },

  'post-03': {
    postedMinutesAgo: 245,
    displayTime: '4시간 전',
  },

  'post-04': {
    postedMinutesAgo: 515,
    displayTime: '8시간 전',
  },

  'post-05': {
    postedMinutesAgo: 910,
    displayTime: '15시간 전',
  },

  'post-06': {
    postedMinutesAgo: 1690,
    displayTime: '1일 전',
  },

  'post-07': {
    postedMinutesAgo: 3180,
    displayTime: '2일 전',
  },

  'post-08': {
    postedMinutesAgo: 5940,
    displayTime: '4일 전',
  },

  'post-09': {
    postedMinutesAgo: 9870,
    displayTime: '6일 전',
  },

}


/* =====================================
   07. PRODUCT DATA FACTORY
===================================== */

/*
  기존 Product Factory 구조를 유지합니다.

  number:
    게시글 번호

  productNumber:
    상품 슬롯 번호

  name:
    상품명

  price:
    상품 가격


  아직 실제 Shop Product ID가 없기 때문에:

  id:
    Community 내부 임시 ID 유지

  url:
    null 유지


  이번 Step에서는 StyledProducts.jsx가 실제로 사용하는:

  brand
  name
  price
  image
  url

  값만 유지합니다.

  color / details는 Patch 문서에 보존되어 있으며,
  현재 UI에서 출력하지 않기 때문에
  이번 단계에서는 데이터 객체에 추가하지 않습니다.
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
   08. PRODUCTS BY POST
===================================== */

/*
  기존 Sample Product를 실제 Card별 Styled Product로 교체합니다.

  최종 수량:

  Card 01
  → 2 products

  Card 02~09
  → 각 1 product
*/

const productsByPost = {


  /* =================================
     POST 01
     2 PRODUCTS
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
     Cable Knit Pullover
  ================================= */

  'post-02': [

    createProduct(
      2,
      1,
      'Cable Knit Pullover',
      '₩85,000'
    ),

  ],


  /* =================================
     POST 03
     Loose-fit Cotton Blouson Jacket
  ================================= */

  'post-03': [

    createProduct(
      3,
      1,
      'Loose-fit Cotton Blouson Jacket',
      '₩149,000'
    ),

  ],


  /* =================================
     POST 04
     Back-Open Hoodie
  ================================= */

  'post-04': [

    createProduct(
      4,
      1,
      'Back-Open Hoodie',
      '₩95,000'
    ),

  ],


  /* =================================
     POST 05
     Bouclé Knit Cardigan
  ================================= */

  'post-05': [

    createProduct(
      5,
      1,
      'Bouclé Knit Cardigan',
      '₩89,000'
    ),

  ],


  /* =================================
     POST 06
     Soft Zip-up Hoodie
  ================================= */

  'post-06': [

    createProduct(
      6,
      1,
      'Soft Zip-up Hoodie',
      '₩79,000'
    ),

  ],


  /* =================================
     POST 07
     Wide Nylon Pants
  ================================= */

  'post-07': [

    createProduct(
      7,
      1,
      'Wide Nylon Pants',
      '₩89,000'
    ),

  ],


  /* =================================
     POST 08
     Soft Bouclé Cardigan
  ================================= */

  'post-08': [

    createProduct(
      8,
      1,
      'Soft Bouclé Cardigan',
      '₩125,000'
    ),

  ],


  /* =================================
     POST 09
     Back Tie Long Sleeve
  ================================= */

  'post-09': [

    createProduct(
      9,
      1,
      'Back Tie Long Sleeve',
      '₩56,000'
    ),

  ],

}


/* =====================================
   09. DETAIL DATA FACTORY
===================================== */

/*
  기존 createDetail(number) 구조를 유지합니다.

  하지만 더 이상:

  sampleBody
  createSampleComments()
  공통 hashtag
  공통 2시간 전

  을 사용하지 않습니다.

  대신 post id를 기준으로:

  bodyByPost
  commentsByPost
  hashtagsByPost
  timeByPost
  productsByPost

  를 각각 가져옵니다.


  likes / commentCount는
  아직 최종 수치가 확정되지 않았으므로
  기존 v0.2.1 Sample 값을 유지합니다.
*/

function createDetail(number) {

  const id =
    `post-${String(number).padStart(2, '0')}`

  const timeData = timeByPost[id]

  return {

    id,

    /* 기존 Gallery 그대로 유지 */
    gallery: createGallery(number),


    /*
      고정 상대시간.

      실제 현재 시각과 비교해
      다시 계산하지 않습니다.
    */
    time: timeData.displayTime,

    postedMinutesAgo:
      timeData.postedMinutesAgo,


    /*
      아직 후속 단계.

      현재 v0.2.1 기존 기능 유지를 위해
      Sample 값을 유지합니다.
    */
    likes: 234,

    commentCount: 12,


    /* Card별 실제 Detail Body */
    body: [...bodyByPost[id]],


    /*
      Card별 실제 초기 댓글.

      각 댓글은 현재 세션에서 작성한 댓글이 아니라
      기존 읽기 전용 초기 댓글 데이터입니다.
    */
    comments: commentsByPost[id].map(
      (comment) => ({ ...comment })
    ),


    /*
      Detail에서는 전체 hashtag를 유지합니다.

      Main에서는 카드당 대표 Tag 2개만 노출합니다.
    */
    hashtags: [...hashtagsByPost[id]],


    /* Card별 실제 Styled Products */
    products: productsByPost[id],

  }

}


/* =====================================
   10. NINE DETAIL POSTS
===================================== */

/*
  Main과 동일한 Post ID를 유지합니다.

  post-01
  ↓
  post-09

  CommunityDetail.jsx는 이 ID를 기준으로
  각각의 Detail 데이터를 찾습니다.
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