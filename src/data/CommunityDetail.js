function createGallery(number) {
  const id = String(number).padStart(2, '0')
  const base = `${import.meta.env.BASE_URL}images/community/`

  return [
    `${base}community${id}.jpg`,
    `${base}community${id}_sub01.jpg`,
    `${base}community${id}_sub02.jpg`,
    `${base}community${id}_sub03.jpg`,
  ]
}

const bodyByPost = {
  'post-01': [
    '오늘은 사진이 생각보다 여러 장 남아서 같이 올려봐요.',
    '걷다가 찍은 것도 있고, 잠깐 앉아 있을 때랑 거울 앞에서 찍은 사진도 섞였어요.',
    '같은 옷인데 장소나 자세가 달라지니까 느낌도 조금씩 달라 보여서 골라내기 아깝더라고요.',
  ],

  'post-02': [
    '집에서 천천히 보내던 날이에요.',
    '창가에 햇빛이 잘 들어와서 앉아 있다가 몇 장 찍고, 거울 앞에서도 한 장 남겼어요.',
    '특별히 꾸민 날은 아니었는데 이런 평범한 날 사진이 나중에 보면 더 마음에 남는 것 같아요.',
  ],

  'post-03': [
    '잠깐 쉬는 동안 찍은 사진들.',
    '첫 사진은 서 있을 때 찍고, 나중에는 그냥 바닥에 앉아서도 한 장 남겼어요. 가까이 찍은 컷은 생각보다 블루종이랑 스트라이프가 잘 보여서 같이 올려봅니다.',
    '이날은 그냥 외출 중에 가볍게 남긴 사진들이에요.',
  ],

  'post-04': [
    '앞에서는 그냥 무난한 후디처럼 보여서 뒤 디테일이 이렇게 눈에 띌 줄은 몰랐어요.',
    '실내에서 뒤돌아 찍은 사진이랑 밖에서 찍은 컷을 보니까 오픈 디테일이 생각보다 분위기를 많이 바꾸더라고요.',
    '앞뒤 느낌이 다른 옷이라 사진마다 조금씩 다르게 보여서 마음에 들었어요.',
  ],

  'post-05': [
    '거울 보다가 그냥 한 장 찍었는데 생각보다 잘 나와서 몇 장 더 남겼어요.',
    '가까이서 보면 가디건 질감이 꽤 잘 보이고, 밖에서 찍은 사진에서는 전체 색 조합이 더 자연스럽게 보여서 같이 올려봅니다.',
    '딱히 계획하고 입은 건 아닌데 사진으로 보니까 은근 마음에 들었어요.',
  ],

  'post-06': [
    '신발끈 묶다가 한 장, 방에서 쉬고 있을 때도 몇 장 남겼어요.',
    '밖에서 찍은 사진까지 같이 보니까 같은 옷인데 장소마다 분위기가 조금씩 달라 보여서 재밌더라고요.',
    '특별히 꾸민 느낌보다는 그냥 평소 준비하는 순간들이 그대로 남은 사진들이에요.',
  ],

  'post-07': [
    '오늘은 상의는 최대한 단순하게 입고 팬츠가 잘 보이는 사진들을 남겨봤어요.',
    '서 있을 때는 길게 떨어지는 실루엣이 잘 보이고, 앉아 있는 사진에서는 원단이 접히는 느낌이 또 다르게 보이더라고요.',
    '옷만 따로 찍은 컷도 같이 넣어봤는데 입었을 때랑 놓아뒀을 때 느낌 차이가 꽤 재밌었어요.',
  ],

  'post-08': [
    '오늘의 색은 보라색.',
    '크림 팬츠랑 같이 입으니까 생각보다 전체가 차분하게 정리되더라고요.',
    '공원에서 찍은 사진은 컬러가 또렷하고, 실내에서는 조금 더 부드럽게 보여서 두 분위기 다 마음에 들었어요.',
  ],

  'post-09': [
    '정면보다 뒤에서 봤을 때 더 마음에 들었던 옷.',
    '앞은 꽤 심플한데 뒤로 돌면 타이 디테일이 확 보여서 이날은 뒷모습 사진을 더 많이 남겼어요.',
    '크림 팬츠처럼 힘을 뺀 하의랑 같이 입으니까 상의 포인트도 너무 세게 느껴지지 않아서 좋았어요.',
  ],
}

const commentsByPost = {
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

const hashtagsByPost = {
  'post-01': [
    'ootd',
    'streetstyle',
    'tanktop',
    'widelegpants',
    'mirrorselfie',
  ],

  'post-02': [
    'knitwear',
    'cableknit',
    'neutraloutfit',
    'relaxedstyle',
    'windowlight',
  ],

  'post-03': [
    'outerwear',
    'blousonjacket',
    'stripedtop',
    'layering',
    'cottonjacket',
  ],

  'post-04': [
    'hoodie',
    'backdetail',
    'brownoutfit',
    'layering',
    'coffeebreak',
  ],

  'post-05': [
    'cardigan',
    'knitwear',
    'boucle',
    'sagegreen',
    'outfitcheck',
  ],

  'post-06': [
    'zipuphoodie',
    'hoodie',
    'gettingready',
    'comfyoutfit',
  ],

  'post-07': [
    'widelegpants',
    'nylonpants',
    'neutraloutfit',
    'outfitcheck',
    'pleatedpants',
  ],

  'post-08': [
    'knitwear',
    'boucle',
    'widelegpants',
    'purpleoutfit',
    'croppedcardigan',
  ],

  'post-09': [
    'outfitcheck',
    'backdetail',
    'sagegreen',
    'backtietop',
    'sideruching',
  ],
}

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

const productIdsByPost = {
  'post-01': [1, 9],
  'post-02': [6],
  'post-03': [5],
  'post-04': [7],
  'post-05': [3],
  'post-06': [4],
  'post-07': [9],
  'post-08': [8],
  'post-09': [9],
}

const commentCountByPost = {
  'post-01': 6,
  'post-02': 8,
  'post-03': 7,
  'post-04': 13,
  'post-05': 15,
  'post-06': 9,
  'post-07': 14,
  'post-08': 18,
  'post-09': 16,
}

function createDetail(number) {
  const id =
    `post-${String(number).padStart(2, '0')}`

  const timeData = timeByPost[id]

  return {
    id,

    gallery: createGallery(number),

    time: timeData.displayTime,

    postedMinutesAgo: timeData.postedMinutesAgo,

    commentCount: commentCountByPost[id],

    body: [
      ...bodyByPost[id],
    ],

    comments: commentsByPost[id].map(
        (comment) => ({
          ...comment,
        })
      ),

    hashtags: [
      ...hashtagsByPost[id],
    ],

    productIds: productIdsByPost[id],
}}

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
