import type { ReadingMaterial } from '~/types/reading'

export const readingMaterials: ReadingMaterial[] = [
  {
    id: 'V1StGXR8Z5jd',
    type: 'reading',
    title: '日本の四季を楽しもう',
    excerpt:
      '桜、夏祭り、紅葉、雪景色から、日本の季節ごとの楽しみ方を読みます。',
    level: 'n5',
    categories: ['culture', 'travel'],
    coverImage: '/reading-japanese-seasons.png',
    paragraphs: [
      {
        id: 'RdP8kM2xQ5aN',
        sentences: [
          {
            id: 'RdS1wF7cL3pT',
            text: '日本[にほん]には四[よっ]つの季節[きせつ]があり、それぞれの景色[けしき]や食[た]べ物[もの]を楽[たの]しめるようになります。',
            translation: '日本有四個季節，每個季節都能欣賞不同的景色與食物。',
            vocabularyNotes: [
              {
                // 動詞活用形示範：表層形「楽しめる」，辭書形「楽しむ」(たのしむ, verb) → 命中單字表
                id: 'RdVw8Tn3Lm2K',
                surface: '楽しめる',
                surfaceReading: 'たのしめる',
                dictionaryForm: '楽しむ',
                reading: 'たのしむ',
                partOfSpeech: 'verb',
                contextualMeaning: '享受；此處為可能形，意為「能夠享受」',
                featured: true,
                examples: [
                  {
                    id: 'RdVe5tK8mP2qL',
                    japanese: '春には桜を楽しめる。',
                    translation: '春天能享受櫻花。',
                  },
                  {
                    id: 'RdVe6nQ3vH9xC',
                    japanese: '四季それぞれの景色を楽しめる。',
                    translation: '能享受四季各自的景色。',
                  },
                ],
              },
            ],
            grammarNotes: [
              {
                id: 'RdGr7Yp2Lm9Q',
                grammarPointId: 'GpN5cT8vK3mR',
                pattern: '〜ようになる',
                shortExplanation:
                  '表示能力、狀態或習慣產生變化，相當於中文的「變得會……／開始變成……」。',
                anchors: [{ surface: 'ようになります' }],
                sourceExample: {
                  id: 'RdGe1qM6xP4nH',
                  japanese: 'それぞれの景色や食べ物を楽しめるようになります。',
                  translation: '變得能享受各個季節的景色與食物。',
                },
                extraExample: {
                  id: 'RdGe2kV9tC5sL',
                  japanese: '日本語が話せるようになりました。',
                  translation: '變得會說日文了。',
                },
              },
            ],
          },
          {
            id: 'RdS2mQ9vB4xK',
            text: '春[はる]になると桜[さくら]が咲き、公園[こうえん]には多くの人が集まります。',
            translation: '春天一到櫻花盛開，許多人會聚集在公園裡。',
            vocabularyNotes: [
              {
                // 名詞：辭書形＝表層形，(桜, さくら, noun) 命中單字表 → 已連結
                id: 'RdVw4Kp8Nx2M',
                surface: '桜',
                surfaceReading: 'さくら',
                dictionaryForm: '桜',
                reading: 'さくら',
                partOfSpeech: 'noun',
                contextualMeaning: '櫻花',
                featured: true,
                examples: [
                  {
                    id: 'RdVe1mT6qN9xP',
                    japanese: '公園の桜が満開です。',
                    translation: '公園裡的櫻花盛開了。',
                  },
                  {
                    id: 'RdVe2cK4vH7sR',
                    japanese: '家族と桜を見に行きます。',
                    translation: '要和家人一起去賞櫻。',
                  },
                ],
              },
            ],
          },
          {
            id: 'RdS3pT6nH8cQ',
            text: '夏[なつ]には各地で夏祭[なつまつ]りが開かれ、浴衣[ゆかた]を着た人々が屋台の食べ物や夜空の花火[はなび]を楽しみます。',
            translation:
              '夏天日本各地會舉辦夏季祭典，穿著浴衣的人們會享受攤販美食與夜空中的煙火。',
            vocabularyNotes: [
              {
                // 刻意未收錄於單字表：(夏祭り, なつまつり, noun) → 未連結，改用本註解自帶例句
                id: 'RdVw6Ts3Qa7L',
                surface: '夏祭り',
                surfaceReading: 'なつまつり',
                dictionaryForm: '夏祭り',
                reading: 'なつまつり',
                partOfSpeech: 'noun',
                contextualMeaning: '夏季祭典（有攤販與煙火的日本夏季節慶）',
                featured: true,
                examples: [
                  {
                    id: 'RdVe3pF8mQ1tV',
                    japanese: '夏祭りで花火を見ました。',
                    translation: '在夏季祭典看了煙火。',
                  },
                  {
                    id: 'RdVe4wL2nC6kA',
                    japanese: '浴衣で夏祭りへ行きます。',
                    translation: '穿浴衣去參加夏季祭典。',
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'RdP3cT9mK6xV',
        sentences: [
          {
            id: 'RdS4qN1wL7pF',
            text: '秋[あき]になると山や寺の木々が赤や黄色に変わり、美しい紅葉[こうよう]を見に出かける人が増えます。',
            translation:
              '秋天山林與寺院周圍的樹木轉為紅色和黃色，出門欣賞美麗紅葉的人也會增加。',
          },
          {
            id: 'RdS5rD8kM2vA',
            text: '冬[ふゆ]の雪が多い地域では、静かな雪景色[ゆきげしき]を眺めたり、温泉で冷えた体を温めたりできます。',
            translation:
              '冬季積雪較多的地區能欣賞寧靜的雪景，也能泡溫泉暖和冰冷的身體。',
            grammarNotes: [
              {
                id: 'RdGr5Cv8Rt1X',
                grammarPointId: 'GpN4mW2qF7pA',
                pattern: '〜たり、〜たりする',
                shortExplanation:
                  '列舉數個代表性的動作或狀態，表示「做做……、做做……之類的事情」。',
                // 不連續文法：只框關鍵字，中間的「、温泉で冷えた体を」不畫線
                anchors: [{ surface: '眺めたり' }, { surface: '温めたり' }],
                sourceExample: {
                  id: 'RdGe3nD7xQ1mB',
                  japanese: '雪景色を眺めたり、温泉で体を温めたりできます。',
                  translation: '可以欣賞雪景、泡溫泉暖身等。',
                },
                extraExample: {
                  id: 'RdGe4pL3vK8tS',
                  japanese: '休みの日は本を読んだり、音楽を聞いたりします。',
                  translation: '休假時會看看書、聽聽音樂。',
                },
              },
            ],
          },
          {
            id: 'RdS6xJ4pT9nC',
            text: '季節[きせつ]の変化を知ることは、日本[にほん]の文化を理解するきっかけにもなります。',
            translation: '了解季節的變化，也會成為理解日本文化的契機。',
          },
        ],
      },
    ],
    translation: [
      '日本有春、夏、秋、冬四個季節，每個季節都能欣賞不同的景色與食物。春天一到櫻花盛開，許多人會聚集在公園裡賞花。',
      '夏天日本各地會舉辦夏季祭典。穿著浴衣的人們可以品嚐攤販美食，並欣賞點亮夜空的煙火。',
      '秋天可以欣賞紅葉，冬天則能看見寧靜的雪景並享受溫泉。了解季節的變化，也是認識日本文化的好機會。',
    ],
  },
  {
    id: 'T7mQ3xK9Vp',
    type: 'reading',
    title: 'タイ旅行で知っておきたいこと',
    excerpt: 'タイの観光地、食事、交通、旅行中の注意点について読みます。',
    level: 'n3',
    categories: ['travel', 'culture', 'food'],
    coverImage: null,
    paragraphs: [
      {
        id: 'P4kN8pT2Lx',
        sentences: [
          {
            id: 'S9mQ3vR6Ka',
            text: 'タイは東南[とうなん]アジアにある国[くに]で、美[うつく]しい寺院[じいん]や南国[なんごく]らしい自然[しぜん]を楽[たの]しめる人気[にんき]の旅行先[りょこうさき]です。',
            translation:
              '泰國是位於東南亞的國家，是一個能欣賞美麗寺廟與熱帶自然風光的熱門旅遊目的地。',
            vocabularyNotes: [
              {
                id: 'V5xP8nM2Wt',
                surface: '東南アジア',
                surfaceReading: 'とうなんあじあ',
                dictionaryForm: '東南アジア',
                reading: 'とうなんあじあ',
                partOfSpeech: 'noun',
                contextualMeaning: '東南亞',
                featured: false,
              },
              {
                id: 'V3qK7mL9Vc',
                surface: '寺院',
                surfaceReading: 'じいん',
                dictionaryForm: '寺院',
                reading: 'じいん',
                partOfSpeech: 'noun',
                contextualMeaning: '寺院、寺廟',
                featured: true,
              },
              {
                id: 'V8pR2xN5Md',
                surface: '旅行先',
                surfaceReading: 'りょこうさき',
                dictionaryForm: '旅行先',
                reading: 'りょこうさき',
                partOfSpeech: 'noun',
                contextualMeaning: '旅遊目的地、旅行前往的地方',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G2nX7pK5Ls',
                grammarPointId: null,
                pattern: '〜らしい',
                shortExplanation:
                  '表示具有某種典型特徵，中文可譯為「很有～特色、很像～」。',
                anchors: [{ surface: '南国らしい' }],
                sourceExample: {
                  id: 'E6mQ3tR9Vb',
                  japanese: '南国らしい自然を楽しめます。',
                  translation: '可以享受充滿熱帶風情的自然景色。',
                },
                extraExample: {
                  id: 'E7xM2qT8Pc',
                  japanese: '京都らしい町並みを見ることができます。',
                  translation: '可以看到很有京都特色的街景。',
                },
              },
            ],
          },
          {
            id: 'S4kV9nL3Ra',
            text: '首都[しゅと]のバンコクには、有名[ゆうめい]な寺院[じいん]や大[おお]きなショッピングモールが多[おお]く、観光[かんこう]と買[か]い物[もの]の両方[りょうほう]を楽[たの]しむことができます。',
            translation:
              '首都曼谷有許多知名寺廟和大型購物中心，可以同時享受觀光與購物。',
            vocabularyNotes: [
              {
                id: 'V9nP4xM2Lc',
                surface: '首都',
                surfaceReading: 'しゅと',
                dictionaryForm: '首都',
                reading: 'しゅと',
                partOfSpeech: 'noun',
                contextualMeaning: '首都',
                featured: false,
              },
              {
                id: 'V5rK8qT3Vd',
                surface: '観光',
                surfaceReading: 'かんこう',
                dictionaryForm: '観光',
                reading: 'かんこう',
                partOfSpeech: 'noun',
                contextualMeaning: '觀光',
                featured: true,
              },
              {
                id: 'V2qT6xN8Kb',
                surface: '両方',
                surfaceReading: 'りょうほう',
                dictionaryForm: '両方',
                reading: 'りょうほう',
                partOfSpeech: 'noun',
                contextualMeaning: '兩者、雙方',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G7mL3pV9Rc',
                grammarPointId: null,
                pattern: '〜ことができる',
                shortExplanation:
                  '表示能力、可能性或條件上可以做某件事，意思是「能夠～」。',
                anchors: [{ surface: '楽しむことができます' }],
                sourceExample: {
                  id: 'E4pN7rK9Mc',
                  japanese: '観光と買い物の両方を楽しむことができます。',
                  translation: '可以同時享受觀光與購物。',
                },
                extraExample: {
                  id: 'E8xT3mL5Qd',
                  japanese:
                    'この町では温泉と自然の両方を楽しむことができます。',
                  translation: '在這座城鎮可以同時享受溫泉與自然景色。',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'P7qP4nV2Ks',
        sentences: [
          {
            id: 'S3mR9xK6Tb',
            text: 'タイを旅行[りょこう]するなら、ぜひ食[た]べてみたいのが本場[ほんば]のタイ料理[りょうり]です。',
            translation: '如果去泰國旅行，很值得品嚐的就是道地的泰國料理。',
            vocabularyNotes: [
              {
                id: 'V6qK2tN9Ra',
                surface: '本場',
                surfaceReading: 'ほんば',
                dictionaryForm: '本場',
                reading: 'ほんば',
                partOfSpeech: 'noun',
                contextualMeaning: '發源地、正宗所在地；此處指道地的',
                featured: true,
              },
              {
                id: 'V9vM4xP7Lc',
                surface: 'タイ料理',
                surfaceReading: 'たいりょうり',
                dictionaryForm: 'タイ料理',
                reading: 'たいりょうり',
                partOfSpeech: 'noun',
                contextualMeaning: '泰國料理',
                featured: false,
              },
            ],
            grammarNotes: [
              {
                id: 'G5xN2pL8Vd',
                grammarPointId: null,
                pattern: '〜なら',
                shortExplanation:
                  '表示以某種情況為前提提出建議、判斷或話題，意思是「如果要～的話」。',
                anchors: [{ surface: '旅行するなら' }],
                sourceExample: {
                  id: 'E7tM9qK3Rb',
                  japanese:
                    'タイを旅行するなら、ぜひ本場のタイ料理を食べてみたいです。',
                  translation: '如果去泰國旅行，很想品嚐看看道地的泰國料理。',
                },
                extraExample: {
                  id: 'E8mQ4xR2Lc',
                  japanese: '京都へ行くなら、秋がおすすめです。',
                  translation: '如果要去京都的話，推薦秋天。',
                },
              },
              {
                id: 'G2pK6nV9Td',
                grammarPointId: null,
                pattern: '〜てみる',
                shortExplanation:
                  '表示嘗試做某件事，中文常譯為「試著～看看」。',
                anchors: [{ surface: '食べてみたい' }],
                sourceExample: {
                  id: 'E4qV7mK3Ta',
                  japanese: '本場のタイ料理を食べてみたいです。',
                  translation: '想試著吃看看道地的泰國料理。',
                },
                extraExample: {
                  id: 'E9kP2xN6Rb',
                  japanese: 'タイの果物を食べてみたいです。',
                  translation: '想試著吃看看泰國的水果。',
                },
              },
            ],
          },
          {
            id: 'S5mR8xK2Vc',
            text: 'パッタイやトムヤムクンなどは有名[ゆうめい]ですが、料理[りょうり]によっては辛[から]さが強[つよ]いものもあります。',
            translation:
              '打拋？不是，是像泰式炒河粉和冬蔭功等料理很有名，不過依料理不同，有些辣度也相當高。',
            vocabularyNotes: [
              {
                id: 'V3pT7nQ9La',
                surface: '有名',
                surfaceReading: 'ゆうめい',
                dictionaryForm: '有名',
                reading: 'ゆうめい',
                partOfSpeech: 'na_adjective',
                contextualMeaning: '有名的、知名的',
                featured: false,
              },
              {
                id: 'V8qK4mV2Rd',
                surface: '辛さ',
                surfaceReading: 'からさ',
                dictionaryForm: '辛い',
                reading: 'からい',
                partOfSpeech: 'i_adjective',
                contextualMeaning: '辣度、辣的程度',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G9nL3pT6Xb',
                grammarPointId: null,
                pattern: '〜によって',
                shortExplanation:
                  '表示因對象、條件或情況不同而有差異，中文為「根據～、因～而異」。',
                anchors: [{ surface: '料理によって' }],
                sourceExample: {
                  id: 'E4mP8xR2Kc',
                  japanese: '料理によっては辛さが強いものもあります。',
                  translation: '依料理不同，有些辣度也比較高。',
                },
                extraExample: {
                  id: 'E7vN5qL9Ta',
                  japanese: '店によって値段が違います。',
                  translation: '價格會依店家不同而有所差異。',
                },
              },
            ],
          },
          {
            id: 'S6xT3pN9Kb',
            text: '辛[から]い物[もの]が苦手[にがて]な人[ひと]は、注文[ちゅうもん]するときに「辛[から]くしないでください」と伝[つた]えると安心[あんしん]です。',
            translation:
              '不擅長吃辣的人，在點餐時告訴店員「請不要做辣」會比較安心。',
            vocabularyNotes: [
              {
                id: 'V3rM7qK5Va',
                surface: '苦手',
                surfaceReading: 'にがて',
                dictionaryForm: '苦手',
                reading: 'にがて',
                partOfSpeech: 'na_adjective',
                contextualMeaning: '不擅長、對某事不拿手；此處指不太能吃辣',
                featured: true,
              },
              {
                id: 'V8nQ2xL6Pc',
                surface: '注文',
                surfaceReading: 'ちゅうもん',
                dictionaryForm: '注文',
                reading: 'ちゅうもん',
                partOfSpeech: 'noun',
                contextualMeaning: '點餐、訂購',
                featured: false,
              },
              {
                id: 'V6pK3xT8Md',
                surface: '伝える',
                surfaceReading: 'つたえる',
                dictionaryForm: '伝える',
                reading: 'つたえる',
                partOfSpeech: 'verb',
                contextualMeaning: '傳達、告知',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G2mR9qV4La',
                grammarPointId: null,
                pattern: '〜とき',
                shortExplanation:
                  '表示某件事情發生的時間或情境，意思是「在～的時候」。',
                anchors: [{ surface: '注文するとき' }],
                sourceExample: {
                  id: 'E8mQ4xR2Ld',
                  japanese: '注文するときに辛くしないでくださいと伝えます。',
                  translation: '點餐時告訴對方請不要做辣。',
                },
                extraExample: {
                  id: 'E2pK6nV9Te',
                  japanese: 'ホテルを予約するときに場所を確認してください。',
                  translation: '預約飯店時請確認地點。',
                },
              },
              {
                id: 'G4qV7mK3Tb',
                grammarPointId: null,
                pattern: '〜と',
                shortExplanation:
                  '表示一做前項就自然產生後項結果，此處可理解為「這樣做的話就會～」。',
                anchors: [{ surface: '伝えると安心です' }],
                sourceExample: {
                  id: 'E9kP2xN6Rc',
                  japanese: '辛くしないでくださいと伝えると安心です。',
                  translation: '告知對方不要做辣會比較安心。',
                },
                extraExample: {
                  id: 'E5mR8xK2Vd',
                  japanese: '地図を見ると場所がすぐ分かります。',
                  translation: '看地圖的話馬上就知道地點。',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'P3pT7nQ9Lc',
        sentences: [
          {
            id: 'S8qK4mV2Re',
            text: 'バンコク市内[しない]の移動[いどう]には、電車[でんしゃ]や地下鉄[ちかてつ]が便利[べんり]です。',
            translation: '在曼谷市區移動時，電車和地鐵很方便。',
            vocabularyNotes: [
              {
                id: 'V6rT3pK9Vb',
                surface: '市内',
                surfaceReading: 'しない',
                dictionaryForm: '市内',
                reading: 'しない',
                partOfSpeech: 'noun',
                contextualMeaning: '市區、市內',
                featured: false,
              },
              {
                id: 'V9xM5nQ2Lc',
                surface: '移動',
                surfaceReading: 'いどう',
                dictionaryForm: '移動',
                reading: 'いどう',
                partOfSpeech: 'noun',
                contextualMeaning: '移動、交通往來',
                featured: true,
              },
              {
                id: 'V4nL8qM2Xa',
                surface: '便利',
                surfaceReading: 'べんり',
                dictionaryForm: '便利',
                reading: 'べんり',
                partOfSpeech: 'na_adjective',
                contextualMeaning: '方便的',
                featured: false,
              },
            ],
          },
          {
            id: 'S6rT3pK9Vc',
            text: 'タクシーも多[おお]いですが、時間帯[じかんたい]によっては道路[どうろ]がとても混[こ]むため、予定[よてい]より時間[じかん]がかかることがあります。',
            translation:
              '計程車也很多，但依時段不同道路可能非常壅塞，有時會比預定花更多時間。',
            vocabularyNotes: [
              {
                id: 'V9xM5nQ2Ld',
                surface: '時間帯',
                surfaceReading: 'じかんたい',
                dictionaryForm: '時間帯',
                reading: 'じかんたい',
                partOfSpeech: 'noun',
                contextualMeaning: '時段、時間帶',
                featured: true,
              },
              {
                id: 'V4nL8qM2Xb',
                surface: '道路',
                surfaceReading: 'どうろ',
                dictionaryForm: '道路',
                reading: 'どうろ',
                partOfSpeech: 'noun',
                contextualMeaning: '道路',
                featured: false,
              },
              {
                id: 'V6rT3pK9Vd',
                surface: '混む',
                surfaceReading: 'こむ',
                dictionaryForm: '混む',
                reading: 'こむ',
                partOfSpeech: 'verb',
                contextualMeaning: '擁擠、壅塞',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G9xM5nQ2Le',
                grammarPointId: null,
                pattern: '〜ため',
                shortExplanation:
                  '表示原因或理由，語氣比「から」較正式，意思是「因為～」。',
                anchors: [{ surface: '混むため' }],
                sourceExample: {
                  id: 'E4nL8qM2Xc',
                  japanese:
                    '道路がとても混むため、時間がかかることがあります。',
                  translation: '因為道路很壅塞，有時會花較多時間。',
                },
                extraExample: {
                  id: 'E6rT3pK9Ve',
                  japanese: '雨が強いため、電車が遅れています。',
                  translation: '因為雨勢很大，電車誤點了。',
                },
              },
              {
                id: 'G9xM5nQ2Lf',
                grammarPointId: null,
                pattern: '〜ことがある',
                shortExplanation:
                  '表示有時會發生某種情況，意思是「有時會～」。',
                anchors: [{ surface: '時間がかかることがあります' }],
                sourceExample: {
                  id: 'E4nL8qM2Xd',
                  japanese: '予定より時間がかかることがあります。',
                  translation: '有時會比預定花更多時間。',
                },
                extraExample: {
                  id: 'E6rT3pK9Vf',
                  japanese: '週末は店が混んでいることがあります。',
                  translation: '週末店裡有時會很擁擠。',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'P9xM5nQ2Lg',
        sentences: [
          {
            id: 'S4nL8qM2Xe',
            text: 'また、寺院[じいん]を見学[けんがく]するときは、服装[ふくそう]にも注意[ちゅうい]が必要[ひつよう]です。',
            translation: '另外，參觀寺廟時，也需要注意服裝。',
            vocabularyNotes: [
              {
                id: 'V6rT3pK9Vg',
                surface: '見学',
                surfaceReading: 'けんがく',
                dictionaryForm: '見学',
                reading: 'けんがく',
                partOfSpeech: 'noun',
                contextualMeaning: '參觀、見習',
                featured: false,
              },
              {
                id: 'V9xM5nQ2Lh',
                surface: '服装',
                surfaceReading: 'ふくそう',
                dictionaryForm: '服装',
                reading: 'ふくそう',
                partOfSpeech: 'noun',
                contextualMeaning: '服裝、穿著',
                featured: true,
              },
              {
                id: 'V4nL8qM2Xf',
                surface: '注意',
                surfaceReading: 'ちゅうい',
                dictionaryForm: '注意',
                reading: 'ちゅうい',
                partOfSpeech: 'noun',
                contextualMeaning: '注意、留意',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G6rT3pK9Vh',
                grammarPointId: null,
                pattern: '〜にも',
                shortExplanation:
                  '「も」加在助詞「に」後，表示除了其他事項之外，「也」要注意某一點。',
                anchors: [{ surface: '服装にも注意' }],
                sourceExample: {
                  id: 'E9xM5nQ2Li',
                  japanese: '服装にも注意が必要です。',
                  translation: '也需要注意服裝。',
                },
                extraExample: {
                  id: 'E4nL8qM2Xg',
                  japanese:
                    '旅行では天気だけでなく、服装にも注意してください。',
                  translation: '旅行時不只天氣，也請注意服裝。',
                },
              },
            ],
          },
          {
            id: 'S6rT3pK9Vi',
            text: '肩[かた]や膝[ひざ]が大[おお]きく出[で]る服[ふく]では入[はい]れない場合[ばあい]もあるので、寺院[じいん]へ行[い]く前[まえ]に確認[かくにん]しておくといいでしょう。',
            translation:
              '如果穿著大幅露出肩膀或膝蓋的衣服，有些寺廟可能無法進入，因此最好在前往寺廟前先確認。',
            vocabularyNotes: [
              {
                id: 'V9xM5nQ2Lj',
                surface: '場合',
                surfaceReading: 'ばあい',
                dictionaryForm: '場合',
                reading: 'ばあい',
                partOfSpeech: 'noun',
                contextualMeaning: '情況、場合',
                featured: true,
              },
              {
                id: 'V4nL8qM2Xh',
                surface: '確認',
                surfaceReading: 'かくにん',
                dictionaryForm: '確認',
                reading: 'かくにん',
                partOfSpeech: 'noun',
                contextualMeaning: '確認、事先查清楚',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G6rT3pK9Vj',
                grammarPointId: null,
                pattern: '〜場合もある',
                shortExplanation:
                  '表示某種情況有時可能發生，意思是「也有～的情況」。',
                anchors: [{ surface: '入れない場合もある' }],
                sourceExample: {
                  id: 'E9xM5nQ2Lk',
                  japanese: '服装によっては入れない場合もあります。',
                  translation: '依服裝不同，也可能有無法進入的情況。',
                },
                extraExample: {
                  id: 'E4nL8qM2Xi',
                  japanese: '天気によってはツアーが中止になる場合もあります。',
                  translation: '依天氣情況，旅遊行程也可能會取消。',
                },
              },
              {
                id: 'G6rT3pK9Vk',
                grammarPointId: null,
                pattern: '〜ておく',
                shortExplanation:
                  '表示為了之後而事先做好某件事，意思是「先～好」。',
                anchors: [{ surface: '確認しておく' }],
                sourceExample: {
                  id: 'E9xM5nQ2Ll',
                  japanese: '寺院へ行く前に確認しておくといいでしょう。',
                  translation: '最好在去寺廟之前先確認好。',
                },
                extraExample: {
                  id: 'E4nL8qM2Xj',
                  japanese: '旅行の前にホテルの場所を調べておきます。',
                  translation: '旅行前先查好飯店的位置。',
                },
              },
              {
                id: 'G6rT3pK9Vl',
                grammarPointId: null,
                pattern: '〜といいでしょう',
                shortExplanation:
                  '用來委婉提出建議，意思是「最好～、～會比較好」。',
                anchors: [{ surface: '確認しておくといいでしょう' }],
                sourceExample: {
                  id: 'E9xM5nQ2Lm',
                  japanese: '寺院へ行く前に確認しておくといいでしょう。',
                  translation: '最好在去寺廟之前先確認。',
                },
                extraExample: {
                  id: 'E4nL8qM2Xk',
                  japanese: '暑いので、水を持って行くといいでしょう。',
                  translation: '因為天氣炎熱，最好帶水去。',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'P6rT3pK9Vm',
        sentences: [
          {
            id: 'S9xM5nQ2Ln',
            text: 'タイは一年[いちねん]を通[とお]して暑[あつ]い日[ひ]が多[おお]いため、暑[あつ]さ対策[たいさく]も大切[たいせつ]です。',
            translation: '泰國全年炎熱的日子很多，因此防暑措施也很重要。',
            vocabularyNotes: [
              {
                id: 'V4nL8qM2Xl',
                surface: '一年を通して',
                surfaceReading: 'いちねんをとおして',
                dictionaryForm: '一年を通して',
                reading: 'いちねんをとおして',
                partOfSpeech: 'adverb',
                contextualMeaning: '全年、一整年期間',
                featured: true,
              },
              {
                id: 'V6rT3pK9Vn',
                surface: '暑さ対策',
                surfaceReading: 'あつさたいさく',
                dictionaryForm: '暑さ対策',
                reading: 'あつさたいさく',
                partOfSpeech: 'noun',
                contextualMeaning: '防暑措施、應對高溫的方法',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G9xM5nQ2Lo',
                grammarPointId: null,
                pattern: '〜を通して',
                shortExplanation:
                  '表示某段期間從頭到尾持續如此，此處「一年を通して」表示「全年」。',
                anchors: [{ surface: '一年を通して' }],
                sourceExample: {
                  id: 'E4nL8qM2Xm',
                  japanese: 'タイは一年を通して暑い日が多いです。',
                  translation: '泰國全年炎熱的日子很多。',
                },
                extraExample: {
                  id: 'E6rT3pK9Vo',
                  japanese: 'この町は一年を通して観光客が多いです。',
                  translation: '這座城市全年都有很多觀光客。',
                },
              },
            ],
          },
          {
            id: 'S9xM5nQ2Lp',
            text: '水分[すいぶん]を十分[じゅうぶん]に取[と]り、無理[むり]をせずに休[やす]みながら観光[かんこう]することをおすすめします。',
            translation: '建議充分補充水分，不要勉強自己，一邊休息一邊觀光。',
            vocabularyNotes: [
              {
                id: 'V4nL8qM2Xn',
                surface: '水分',
                surfaceReading: 'すいぶん',
                dictionaryForm: '水分',
                reading: 'すいぶん',
                partOfSpeech: 'noun',
                contextualMeaning: '水分',
                featured: false,
              },
              {
                id: 'V6rT3pK9Vp',
                surface: '十分',
                surfaceReading: 'じゅうぶん',
                dictionaryForm: '十分',
                reading: 'じゅうぶん',
                partOfSpeech: 'na_adjective',
                contextualMeaning: '充分、足夠',
                featured: true,
              },
              {
                id: 'V9xM5nQ2Lq',
                surface: '無理',
                surfaceReading: 'むり',
                dictionaryForm: '無理',
                reading: 'むり',
                partOfSpeech: 'na_adjective',
                contextualMeaning:
                  '勉強、超出能力範圍；「無理をしない」指不要勉強自己',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G4nL8qM2Xo',
                grammarPointId: null,
                pattern: '〜ながら',
                shortExplanation:
                  '表示同一主體同時進行兩個動作，意思是「一邊～一邊～」。',
                anchors: [{ surface: '休みながら' }],
                sourceExample: {
                  id: 'E6rT3pK9Vq',
                  japanese: '休みながら観光することをおすすめします。',
                  translation: '建議一邊休息一邊觀光。',
                },
                extraExample: {
                  id: 'E9xM5nQ2Lr',
                  japanese: '景色を見ながらゆっくり歩きました。',
                  translation: '一邊看風景一邊慢慢走。',
                },
              },
            ],
          },
          {
            id: 'S4nL8qM2Xp',
            text: '事前[じぜん]に気候[きこう]や交通[こうつう]、現地[げんち]のマナーを調[しら]べておけば、より安心[あんしん]してタイ旅行[りょこう]を楽[たの]しめるでしょう。',
            translation:
              '如果事先查好氣候、交通以及當地禮儀，就能更安心地享受泰國旅行。',
            vocabularyNotes: [
              {
                id: 'V6rT3pK9Vr',
                surface: '事前',
                surfaceReading: 'じぜん',
                dictionaryForm: '事前',
                reading: 'じぜん',
                partOfSpeech: 'noun',
                contextualMeaning: '事前、事先',
                featured: true,
              },
              {
                id: 'V9xM5nQ2Ls',
                surface: '気候',
                surfaceReading: 'きこう',
                dictionaryForm: '気候',
                reading: 'きこう',
                partOfSpeech: 'noun',
                contextualMeaning: '氣候',
                featured: false,
              },
              {
                id: 'V4nL8qM2Xq',
                surface: '現地',
                surfaceReading: 'げんち',
                dictionaryForm: '現地',
                reading: 'げんち',
                partOfSpeech: 'noun',
                contextualMeaning: '當地、現場所在地',
                featured: true,
              },
            ],
            grammarNotes: [
              {
                id: 'G6rT3pK9Vs',
                grammarPointId: null,
                pattern: '〜ておけば',
                shortExplanation:
                  '「〜ておく」的假定形，表示如果事先做好某事，就會對之後有幫助。',
                anchors: [{ surface: '調べておけば' }],
                sourceExample: {
                  id: 'E9xM5nQ2Lt',
                  japanese:
                    '事前に気候や交通を調べておけば、安心して旅行できます。',
                  translation: '如果事先查好氣候和交通，就能安心旅行。',
                },
                extraExample: {
                  id: 'E4nL8qM2Xr',
                  japanese: 'ホテルを予約しておけば安心です。',
                  translation: '如果事先訂好飯店就比較安心。',
                },
              },
              {
                id: 'G6rT3pK9Vt',
                grammarPointId: null,
                pattern: '〜でしょう',
                shortExplanation:
                  '表示說話者較有把握的推測，此處可譯為「應該能～吧」。',
                anchors: [{ surface: '楽しめるでしょう' }],
                sourceExample: {
                  id: 'E9xM5nQ2Lu',
                  japanese: 'より安心してタイ旅行を楽しめるでしょう。',
                  translation: '應該就能更安心地享受泰國旅行。',
                },
                extraExample: {
                  id: 'E4nL8qM2Xs',
                  japanese: '春に行けば、美しい桜を楽しめるでしょう。',
                  translation: '如果春天去，應該能欣賞到美麗的櫻花。',
                },
              },
            ],
          },
        ],
      },
    ],
    translation: [
      '泰國是位於東南亞的國家，也是能欣賞美麗寺廟與熱帶自然風光的熱門旅遊目的地。首都曼谷有許多知名寺廟和大型購物中心，可以同時享受觀光與購物。',
      '如果去泰國旅行，很值得品嚐的就是道地的泰國料理。泰式炒河粉、冬蔭功等料理都很有名，不過依料理不同，有些辣度也相當高。不擅長吃辣的人，可以在點餐時告訴店員「請不要做辣」，會比較安心。',
      '在曼谷市區移動時，電車和地鐵很方便。計程車也很多，但依時段不同，道路可能非常壅塞，因此有時會比原本預定花更多時間。',
      '另外，參觀寺廟時也需要注意服裝。如果穿著大幅露出肩膀或膝蓋的衣服，有些寺廟可能無法進入，因此最好在前往寺廟前先確認相關規定。',
      '泰國全年炎熱的日子很多，因此防暑措施也很重要。建議充分補充水分，不要勉強自己，一邊休息一邊觀光。如果事先查好氣候、交通與當地禮儀，就能更安心地享受泰國旅行。',
    ],
  },
]
