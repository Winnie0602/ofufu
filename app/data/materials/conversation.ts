import type { ConversationMaterial } from '~/types/conversation'

export const conversationMaterials: ConversationMaterial[] = [
  {
    id: 'C7Km3pQx92Ab',
    type: 'conversation',
    title: '電話で席を予約する',
    excerpt: 'レストランに電話をして、二人分の席を予約する会話です。',
    level: 'n4',
    categories: ['restaurant', 'reservation'],
    coverImage: '/images/covers/conversation-restaurant-reservation.jpg',
    sceneDescription:
      'レストランに電話をして、土曜日の夜の席を予約する場面です。',
    participants: [
      { id: 'CvCh1mP8qR4tN', name: 'ふふ', role: '客人', avatarKey: 'fufu' },
      { id: 'CvCh2xK6vD9sL', name: 'シロ', role: '店員', avatarKey: 'shiro' },
    ],
    lines: [
      {
        id: 'CvLn1qT7mN3pH',
        speakerId: 'CvCh2xK6vD9sL',
        text: 'お電話[でんわ]ありがとうございます。さくらレストランでございます。',
        translation: '感謝您的來電，這裡是櫻花餐廳。',
      },
      {
        id: 'CvLn2kV5pC8xM',
        speakerId: 'CvCh1mP8qR4tN',
        text: 'あの、今週[こんしゅう]の土曜日[どようび]の夜[よる]、二人[ふたり]で予約[よやく]したいんですが。',
        translation: '那個，我想預約這週六晚上兩位。',
        vocabularyNotes: [
          {
            id: 'CvVw5Lm9Qa2N',
            surface: '予約',
            surfaceReading: 'よやく',
            dictionaryForm: '予約',
            reading: 'よやく',
            partOfSpeech: 'noun',
            contextualMeaning: '預約、預訂',
            examples: [
              {
                id: 'CvVe3tH8mQ4pD',
                japanese: 'ホテルを予約しました。',
                translation: '預約了飯店。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'CvGr6Tw1Mk9C',
            grammarPointId: null,
            pattern: '〜たいんですが',
            shortMeaning: '想～（委婉開口）',
            explanation:
              '客氣地說出自己的希望，句尾停在「が」留白、等對方接話。常用在拜託或詢問，比直接說「〜たいです」更柔軟、好開口。',
            anchors: [{ surface: 'したいんですが' }],
            sourceExample: {
              id: 'CvGe3pD7mT2qN',
              japanese: '二人で予約したいんですが。',
              translation: '我想預約兩位。',
            },
            extraExample: {
              id: 'CvGe4xK5vF9nR',
              japanese: '時間を変更したいんですが。',
              translation: '我想更改時間。',
            },
          },
        ],
      },
      {
        id: 'CvLn3mH9qF2tR',
        speakerId: 'CvCh2xK6vD9sL',
        text: 'かしこまりました。土曜日[どようび]の夜[よる]は混[こ]み合[あ]っておりますが、七時[しちじ]ならご案内[あんない]できます。',
        translation: '好的。週六晚上比較擁擠，不過七點的話可以為您安排。',
        vocabularyNotes: [
          {
            id: 'CvVw8Rn2Lm5K',
            surface: '案内',
            surfaceReading: 'あんない',
            dictionaryForm: '案内',
            reading: 'あんない',
            partOfSpeech: 'noun',
            contextualMeaning: '帶位、引導；此處指安排並帶往座位',
            examples: [
              {
                id: 'CvVe5pK8mT2qL',
                japanese: '係の者が席までご案内します。',
                translation: '會由服務人員帶您到座位。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'CvGr9Tp3Mk1C',
            grammarPointId: null,
            pattern: '〜なら',
            shortMeaning: '如果是～的話',
            explanation:
              '針對對方剛提到的條件或話題，提出相應的建議或安排。這裡把話題限定在「七點」這個時段，回應「那個時間可以」。',
            anchors: [{ surface: '七時なら' }],
            sourceExample: {
              id: 'CvGe6pD1mT4qN',
              japanese: '七時ならご案内できます。',
              translation: '七點的話可以為您安排。',
            },
            extraExample: {
              id: 'CvGe7xK2vF6nR',
              japanese: '明日なら時間があります。',
              translation: '如果是明天的話我有時間。',
            },
          },
        ],
      },
      {
        id: 'CvLn4vK1mP7qD',
        speakerId: 'CvCh1mP8qR4tN',
        text: 'じゃあ、七時[しちじ]でお願[ねが]いします。窓側[まどがわ]の席[せき]はありますか。',
        translation: '那就麻煩七點。有靠窗的座位嗎？',
        vocabularyNotes: [
          {
            id: 'CvVw2Lm6Qa9N',
            surface: '窓側',
            surfaceReading: 'まどがわ',
            dictionaryForm: '窓側',
            reading: 'まどがわ',
            partOfSpeech: 'noun',
            contextualMeaning: '靠窗的位置',
            examples: [
              {
                id: 'CvVe8pK3mT7qL',
                japanese: '窓側の席をお願いします。',
                translation: '麻煩給我靠窗的座位。',
              },
            ],
          },
        ],
      },
      {
        id: 'CvLn5cN8wL2sT',
        speakerId: 'CvCh2xK6vD9sL',
        text: 'はい、ご用意[ようい]できます。お名前[なまえ]とお電話番号[でんわばんごう]を教[おし]えていただけますか。',
        translation: '有的，可以為您準備。方便告訴我您的姓名和電話號碼嗎？',
        vocabularyNotes: [
          {
            id: 'CvVw4Rn7Lm1K',
            surface: '用意',
            surfaceReading: 'ようい',
            dictionaryForm: '用意',
            reading: 'ようい',
            partOfSpeech: 'noun',
            contextualMeaning: '準備',
            examples: [
              {
                id: 'CvVe9pK4mT1qL',
                japanese: '飲み物を用意しておきます。',
                translation: '先把飲料準備好。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'CvGr2Tp7Mk5C',
            grammarPointId: null,
            pattern: '〜ていただけますか',
            shortMeaning: '能否請您～',
            explanation:
              '很客氣地拜託對方為自己做某件事，比「〜てください」更禮貌，常見於服務或商務場合。是「〜てもらえますか」的敬語版本。',
            anchors: [{ surface: '教えていただけますか' }],
            sourceExample: {
              id: 'CvGe1pD5mT8qN',
              japanese: 'お名前を教えていただけますか。',
              translation: '可以告訴我您的姓名嗎？',
            },
            extraExample: {
              id: 'CvGe3xK6vF2nR',
              japanese: 'もう一度説明していただけますか。',
              translation: '可以請您再說明一次嗎？',
            },
          },
        ],
      },
      {
        id: 'CvLn6pF3mT8vQ',
        speakerId: 'CvCh1mP8qR4tN',
        text: 'ふふと申[もう]します。電話番号[でんわばんごう]は〇九〇の一二三四の五六七八です。',
        translation: '我叫ふふ。電話號碼是090-1234-5678。',
      },
      {
        id: 'CvLn7kR2mV9sD',
        speakerId: 'CvCh2xK6vD9sL',
        text: 'ありがとうございます。では、今週[こんしゅう]土曜日[どようび]の七時[しちじ]、二名様[にめいさま]で承[うけたまわ]りました。',
        translation: '謝謝您。那麼，已為您登記本週六七點、兩位。',
        vocabularyNotes: [
          {
            id: 'CvVw6Lm2Qa8N',
            surface: '二名様',
            surfaceReading: 'にめいさま',
            dictionaryForm: '二名様',
            reading: 'にめいさま',
            partOfSpeech: 'noun',
            contextualMeaning: '兩位（客人）；服務業對人數的禮貌說法',
          },
        ],
      },
      {
        id: 'CvLn8mT4xQ2vp',
        speakerId: 'CvCh1mP8qR4tN',
        text: 'あの、当日[とうじつ]、少[すこ]し遅[おく]れるかもしれません。',
        translation: '那個，當天我可能會晚一點到。',
        vocabularyNotes: [
          {
            id: 'CvVw9Lm4Qa2N',
            surface: '当日',
            surfaceReading: 'とうじつ',
            dictionaryForm: '当日',
            reading: 'とうじつ',
            partOfSpeech: 'noun',
            contextualMeaning: '當天、當日',
            examples: [
              {
                id: 'CvVe2pK7mT4qL',
                japanese: '当日は少し早めに来てください。',
                translation: '當天請提早一點來。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'CvGr4Tp9Mk2C',
            grammarPointId: null,
            pattern: '〜かもしれない',
            shortMeaning: '也許～、可能～',
            explanation:
              '對不確定的事做推測，表示「有這個可能，但沒把握」。可能性通常沒有「〜でしょう」那麼高，語氣比較保留。',
            anchors: [{ surface: '遅れるかもしれません' }],
            sourceExample: {
              id: 'CvGe5pD8mT2qN',
              japanese: '当日、少し遅れるかもしれません。',
              translation: '當天可能會晚一點到。',
            },
            extraExample: {
              id: 'CvGe6xK3vF9nR',
              japanese: '午後から雨が降るかもしれません。',
              translation: '下午可能會下雨。',
            },
          },
        ],
      },
      {
        id: 'CvLn9cN2wL8sT',
        speakerId: 'CvCh2xK6vD9sL',
        text: 'かしこまりました。十五分[じゅうごふん]ほどでしたら、お席[せき]をお取[と]りしておきます。',
        translation: '好的。如果是15分鐘左右，我們會為您保留座位。',
        grammarNotes: [
          {
            id: 'CvGr7Tp2Mk9C',
            grammarPointId: null,
            pattern: '〜ておく',
            shortMeaning: '先～好（做準備）',
            explanation:
              '為了之後的需要，事先把某件事做好、並讓那個狀態保持著。這裡是店員先幫客人把座位保留下來。',
            anchors: [{ surface: 'お取りしておきます' }],
            sourceExample: {
              id: 'CvGe8pD2mT9qN',
              japanese: 'お席をお取りしておきます。',
              translation: '會先為您保留座位。',
            },
            extraExample: {
              id: 'CvGe9xK7vF2nR',
              japanese: '会議の前に資料を準備しておきます。',
              translation: '會議前先把資料準備好。',
            },
          },
        ],
      },
      {
        id: 'CvLnAqT6mN2pH',
        speakerId: 'CvCh1mP8qR4tN',
        text: 'ありがとうございます。よろしくお願[ねが]いします。',
        translation: '謝謝您，那就麻煩了。',
      },
    ],
  },
  {
    id: 'Dm4pR9xK2Vt',
    type: 'conversation',
    title: '引っ越しの相談をする',
    excerpt: '駅に近い部屋を探すため、友だちに相談する会話です。',
    level: 'n3',
    categories: ['life', 'friends'],
    coverImage: null,
    sceneDescription:
      'ふふが引っ越し先の部屋について、友だちのクロに相談する場面です。',
    participants: [
      { id: 'DvCh1kP7qR3tN', name: 'ふふ', role: '朋友', avatarKey: 'fufu' },
      { id: 'DvCh2xM5vD8sL', name: 'クロ', role: '朋友', avatarKey: 'kuro' },
    ],
    lines: [
      {
        id: 'DvLn1qT6mN2pH',
        speakerId: 'DvCh1kP7qR3tN',
        text: 'クロ、実[じつ]は来月[らいげつ]、引[ひ]っ越[こ]すことになったんだ。',
        translation: '小黑，其實我下個月要搬家了。',
        grammarNotes: [
          {
            id: 'DvGr3Np8Xq4L',
            grammarPointId: null,
            pattern: '〜ことになる',
            shortMeaning: '（非自己一手決定地）要～了',
            explanation:
              '某件事在自己的意志之外，因情況或別人的安排而定了下來。相較於「〜ことにする」（自己拿主意決定），這裡更像是被決定或自然演變成這樣的結果。',
            anchors: [{ surface: '引っ越すことになった' }],
            sourceExample: {
              id: 'DvGe1mQ5tP7xH',
              japanese: '来月、引っ越すことになった。',
              translation: '下個月要搬家了。',
            },
            extraExample: {
              id: 'DvGe2kV4nR9sL',
              japanese: '会議は来週に延びることになりました。',
              translation: '會議變成延到下週了。',
            },
          },
        ],
      },
      {
        id: 'DvLn2kV4pC7xM',
        speakerId: 'DvCh2xM5vD8sL',
        text: 'えっ、急[きゅう]だね。何[なに]か理由[りゆう]があるの？',
        translation: '咦，好突然。有什麼原因嗎？',
      },
      {
        id: 'DvLn3mH8qF1tR',
        speakerId: 'DvCh1kP7qR3tN',
        text: 'うん。今[いま]の部屋[へや]、駅[えき]から遠[とお]くて、通学[つうがく]に一時間[いちじかん]もかかるんだ。',
        translation: '嗯。現在的房間離車站很遠，通勤上學要花上一個小時。',
        vocabularyNotes: [
          {
            id: 'DvVw5Lm8Qa1N',
            surface: '通学',
            surfaceReading: 'つうがく',
            dictionaryForm: '通学',
            reading: 'つうがく',
            partOfSpeech: 'noun',
            contextualMeaning: '上下學、通勤到學校',
            examples: [
              {
                id: 'DvVe3tH7mQ2pD',
                japanese: '毎日、電車で通学しています。',
                translation: '每天搭電車上下學。',
              },
            ],
          },
        ],
      },
      {
        id: 'DvLn4vK9mP2qD',
        speakerId: 'DvCh1kP7qR3tN',
        text: 'せっかく引[ひ]っ越[こ]す以上[いじょう]は、もう少[すこ]し駅[えき]に近[ちか]い部屋[へや]を探[さが]そうと思[おも]って。',
        translation: '既然都要搬了，我想找個離車站再近一點的房間。',
        grammarNotes: [
          {
            id: 'DvGr6Tw2Mk8C',
            grammarPointId: null,
            pattern: '〜以上は',
            shortMeaning: '既然～，就',
            explanation:
              '前面既然已經成立，後面就理應採取相稱的行動或態度。帶有「都到這一步了，就好好做」的覺悟或決心語氣。',
            anchors: [{ surface: '引っ越す以上は' }],
            sourceExample: {
              id: 'DvGe3pD6mT1qN',
              japanese: '引っ越す以上は、いい部屋を探したい。',
              translation: '既然要搬家，就想找個好房間。',
            },
            extraExample: {
              id: 'DvGe4xK7vF3nR',
              japanese: '引き受けた以上は、最後まで責任を持ちます。',
              translation: '既然接下了，就會負責到最後。',
            },
          },
        ],
      },
      {
        id: 'DvLn5cN7wL8sT',
        speakerId: 'DvCh2xM5vD8sL',
        text: 'なるほどね。それなら、南口[みなみぐち]のあたりが便利[べんり]でおすすめだよ。',
        translation: '原來如此。這樣的話，我推薦南口一帶，很方便。',
      },
      {
        id: 'DvLn6pF2mT9vQ',
        speakerId: 'DvCh1kP7qR3tN',
        text: 'ただ、駅[えき]に近[ちか]い部屋[へや]は、その分[ぶん]家賃[やちん]も高[たか]くなりがちなんだよね。',
        translation: '只是，離車站近的房間，相對地房租也往往會比較高。',
        vocabularyNotes: [
          {
            id: 'DvVw7Lm3Qa2N',
            surface: '家賃',
            surfaceReading: 'やちん',
            dictionaryForm: '家賃',
            reading: 'やちん',
            partOfSpeech: 'noun',
            contextualMeaning: '房租',
            examples: [
              {
                id: 'DvVe5tH2mQ8pD',
                japanese: '毎月、家賃を払っています。',
                translation: '每個月都在付房租。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'DvGr8Tw3Mk1C',
            grammarPointId: null,
            pattern: '〜がち',
            shortMeaning: '容易～、往往～',
            explanation:
              '表示某種傾向、常常會變成那樣。多半用在不太理想的傾向上（如「病がち」「遅れがち」），帶點「一不小心就會這樣」的語感。',
            anchors: [{ surface: '高くなりがち' }],
            sourceExample: {
              id: 'DvGe5pD3mT9qN',
              japanese: '駅に近い部屋は家賃が高くなりがちだ。',
              translation: '離車站近的房間房租往往偏高。',
            },
            extraExample: {
              id: 'DvGe6xK8vF2nR',
              japanese: '忙しいと、食事が不規則になりがちです。',
              translation: '一忙起來，三餐就容易變得不規律。',
            },
          },
        ],
      },
      {
        id: 'DvLn7kV3pC2xM',
        speakerId: 'DvCh2xM5vD8sL',
        text: 'たしかにね。でも、通学時間[つうがくじかん]が短[みじか]くなる分[ぶん]、自由[じゆう]な時間[じかん]も増[ふ]えるよ。',
        translation: '的確。不過，通勤時間縮短了，相應地自由時間也會變多喔。',
        grammarNotes: [
          {
            id: 'DvGr9Tw4Mk2C',
            grammarPointId: null,
            pattern: '〜分（ぶん）',
            shortMeaning: '相應地、以相同的程度',
            explanation:
              '前面的變化有多少，後面就相應地增減多少，帶有「有失就有得、成正比」的語感。這裡是「時間少花多少，自由時間就多出多少」。',
            anchors: [{ surface: '短くなる分' }],
            sourceExample: {
              id: 'DvGe7pD4mT2qN',
              japanese: '通学時間が短くなる分、自由な時間も増える。',
              translation: '通勤時間縮短，相應地自由時間也變多。',
            },
            extraExample: {
              id: 'DvGe8xK9vF3nR',
              japanese: '働いた分だけ、給料がもらえます。',
              translation: '工作多少，就能領到相應的薪水。',
            },
          },
        ],
      },
      {
        id: 'DvLn8pF3mT2vQ',
        speakerId: 'DvCh1kP7qR3tN',
        text: 'ほんと？地元[じもと]の人[ひと]の意見[いけん]は助[たす]かるな。今度[こんど]、一緒[いっしょ]に見[み]に行[い]ってくれない？',
        translation:
          '真的嗎？當地人的意見真是幫大忙。下次能不能陪我一起去看看？',
        vocabularyNotes: [
          {
            id: 'DvVw2Lm5Qa8N',
            surface: '地元',
            surfaceReading: 'じもと',
            dictionaryForm: '地元',
            reading: 'じもと',
            partOfSpeech: 'noun',
            contextualMeaning: '當地、本地（自己居住或熟悉的地區）',
            examples: [
              {
                id: 'DvVe8pK2mT6qL',
                japanese: '地元の祭りに参加しました。',
                translation: '參加了當地的祭典。',
              },
            ],
          },
        ],
      },
      {
        id: 'DvLn9cN3wL5sT',
        speakerId: 'DvCh2xM5vD8sL',
        text: '次[つぎ]の休[やす]みは空[あ]いてるから、一緒[いっしょ]に探[さが]そう。',
        translation: '我下次休假有空，一起找吧。',
      },
      {
        id: 'DvLnAqT7mN2pH',
        speakerId: 'DvCh1kP7qR3tN',
        text: 'うん、ありがとう。いい部屋[へや]が見[み]つかるといいな。',
        translation: '嗯，謝謝你。希望能找到好房間。',
      },
    ],
  },
  {
    id: 'Q7mK2xV9pL4a',
    type: 'conversation',
    title: '空港でチェックイン',
    excerpt: '空港のチェックインカウンターでのやり取りを読んでみましょう。',
    level: 'n4',
    categories: ['airport', 'service'],
    coverImage: null,
    sceneDescription:
      '空港のチェックインカウンターで、旅客が地勤職員に搭乗手続きをしてもらう場面です。',
    participants: [
      {
        id: 'a9Tq3Lm7Xv2P',
        name: 'ふふ',
        role: '旅客',
        avatarKey: 'fufu',
      },
      {
        id: 'R4nW8cK2pY6d',
        name: 'シロ',
        role: '地勤人員',
        avatarKey: 'shiro',
      },
    ],
    lines: [
      {
        id: 'u3Jm9Qx5Lk8N',
        speakerId: 'R4nW8cK2pY6d',
        text: '本日[ほんじつ]はどちらまででしょうか。',
        translation: '今天請問是要前往哪裡呢？',
        grammarNotes: [
          {
            id: 'B7vP2sN9mQ4x',
            grammarPointId: null,
            pattern: '〜でしょうか',
            shortMeaning: '禮貌地詢問',
            explanation: '比「ですか」語氣更委婉，常用於服務業及正式場合。',
            anchors: [{ surface: 'でしょうか' }],
            sourceExample: {
              id: 'k5Dq8Xn3Vt7M',
              japanese: '本日はどちらまででしょうか。',
              translation: '今天請問是要前往哪裡呢？',
            },
            extraExample: {
              id: 'Z2pL6cR9wK4a',
              japanese: 'お名前を伺ってもよろしいでしょうか。',
              translation: '方便請教您的姓名嗎？',
            },
          },
        ],
      },
      {
        id: 'H8tM3qV6xP2n',
        speakerId: 'a9Tq3Lm7Xv2P',
        text: '台北[たいぺい]までです。チェックインをお願[ねが]いします。',
        translation: '我要去台北，麻煩辦理報到。',
      },
      {
        id: 'f2Qx7Nw4Kp9L',
        speakerId: 'R4nW8cK2pY6d',
        text: 'かしこまりました。パスポートをお預[あず]かりいたします。',
        translation: '好的。我先替您收下護照。',
        grammarNotes: [
          {
            id: 'M9rV3kT7qX2c',
            grammarPointId: null,
            pattern: 'お〜いたします',
            shortMeaning: '謙讓地表示自己要做某事',
            explanation:
              '「お＋動詞ます形＋いたします」是謙讓語，用來表示自己恭敬地為對方做某件事，常見於服務業。',
            anchors: [{ surface: 'お預かりいたします' }],
            sourceExample: {
              id: 'x6Lq2Pj8Nw4S',
              japanese: 'パスポートをお預かりいたします。',
              translation: '我先替您收下護照。',
            },
            extraExample: {
              id: 'C3mY7vR2kT9a',
              japanese: 'お荷物をお運びいたします。',
              translation: '我來替您搬運行李。',
            },
          },
        ],
      },
      {
        id: 'n4Kp8Xq2Vt6M',
        speakerId: 'a9Tq3Lm7Xv2P',
        text: 'お願[ねが]いします。それから、荷物[にもつ]を一[ひと]つ預[あず]けたいです。',
        translation: '麻煩您了。另外，我想托運一件行李。',
        vocabularyNotes: [
          {
            id: 'T7wQ3mL9xP5d',
            surface: '預けたい',
            surfaceReading: 'あずけたい',
            dictionaryForm: '預ける',
            reading: 'あずける',
            partOfSpeech: 'verb',
            contextualMeaning: '托運、寄放；此處表示「想要托運」',
            examples: [
              {
                id: 'p2Rk6Vn8Qx4M',
                japanese: '大きい荷物を空港で預けます。',
                translation: '我會在機場托運大型行李。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'W8cN4qL2vP7x',
            grammarPointId: null,
            pattern: '〜たい',
            shortMeaning: '想要……',
            explanation:
              '接在動詞ます形去掉「ます」後，表示說話者想做某件事的願望。',
            anchors: [{ surface: '預けたいです' }],
            sourceExample: {
              id: 'g5Xv9Mq3Kp2T',
              japanese: '荷物を一つ預けたいです。',
              translation: '我想托運一件行李。',
            },
            extraExample: {
              id: 'L2nQ7rV4xM8c',
              japanese: '窓側の席に座りたいです。',
              translation: '我想坐靠窗的座位。',
            },
          },
        ],
      },
      {
        id: 'Y6mP2kX9qT4v',
        speakerId: 'R4nW8cK2pY6d',
        text: '承知[しょうち]いたしました。スーツケースをこちらへお置[お]きください。',
        translation: '好的。請把行李箱放到這裡。',
        grammarNotes: [
          {
            id: 'q9Vt3M2xK7pL',
            grammarPointId: null,
            pattern: 'お〜ください',
            shortMeaning: '請您……',
            explanation:
              '「お＋動詞ます形＋ください」是尊敬語，用來禮貌地請對方做某個動作，常見於服務場合。',
            anchors: [{ surface: 'お置きください' }],
            sourceExample: {
              id: 'D4xN8pQ2mV6k',
              japanese: 'スーツケースをこちらへお置きください。',
              translation: '請把行李箱放到這裡。',
            },
            extraExample: {
              id: 's7Kq3Tn9Lx5P',
              japanese: 'こちらで少々お待ちください。',
              translation: '請在這裡稍候。',
            },
          },
        ],
      },
      {
        id: 'c8Rk4Vn2Qm7X',
        speakerId: 'a9Tq3Lm7Xv2P',
        text: 'この荷物[にもつ]で大丈夫[だいじょうぶ]でしょうか。',
        translation: '這件行李可以嗎？',
        grammarNotes: [
          {
            id: 'P3mX9qL5vT2k',
            grammarPointId: null,
            pattern: '〜でしょうか',
            shortMeaning: '禮貌地詢問',
            explanation: '比「ですか」語氣更委婉，常用於正式場合。',
            anchors: [{ surface: 'でしょうか' }],
            sourceExample: {
              id: 'v6Nq2Kp8Xr4M',
              japanese: 'この荷物で大丈夫でしょうか。',
              translation: '這件行李可以嗎？',
            },
            extraExample: {
              id: 'J9tL3cQ7mV2x',
              japanese: 'こちらの席でよろしいでしょうか。',
              translation: '這個座位可以嗎？',
            },
          },
        ],
      },
      {
        id: 'm5Qx8Tn3Kp7V',
        speakerId: 'R4nW8cK2pY6d',
        text: 'はい、重量[じゅうりょう]は二十[にじゅっ]キロですので、問題[もんだい]ございません。',
        translation: '好的，重量是二十公斤，所以沒有問題。',
        vocabularyNotes: [
          {
            id: 'X2pM7vQ4kN9r',
            surface: '重量',
            surfaceReading: 'じゅうりょう',
            dictionaryForm: '重量',
            reading: 'じゅうりょう',
            partOfSpeech: 'noun',
            contextualMeaning: '重量；此處指托運行李的重量',
            examples: [
              {
                id: 'r8Kq3Lx6Vn2P',
                japanese: '荷物の重量を確認します。',
                translation: '確認行李的重量。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'N4vT9mQ2xK7c',
            grammarPointId: null,
            pattern: '〜ので',
            shortMeaning: '因為……',
            explanation:
              '用來說明原因或理由，語氣通常比「から」柔和，適合用於禮貌或正式的對話。',
            anchors: [{ surface: 'ですので' }],
            sourceExample: {
              id: 'h7Pq2Xn5M9vK',
              japanese: '重量は二十キロですので、問題ございません。',
              translation: '因為重量是二十公斤，所以沒有問題。',
            },
            extraExample: {
              id: 'Q6mR3kV8xT2n',
              japanese: '時間がありますので、ゆっくり確認してください。',
              translation: '因為還有時間，請慢慢確認。',
            },
          },
        ],
      },
      {
        id: 'V7nK2qP9mX4t',
        speakerId: 'R4nW8cK2pY6d',
        text: '通路側[つうろがわ]と窓側[まどがわ]では、どちらのお席[せき]をご希望[きぼう]でしょうか。',
        translation: '靠走道和靠窗的座位，請問您希望哪一個呢？',
        vocabularyNotes: [
          {
            id: 'k3Tq8M2vP7xN',
            surface: '通路側',
            surfaceReading: 'つうろがわ',
            dictionaryForm: '通路側',
            reading: 'つうろがわ',
            partOfSpeech: 'noun',
            contextualMeaning: '靠走道的一側；此處指靠走道的座位',
            examples: [
              {
                id: 'Y9pL4nQ2xV6c',
                japanese: '通路側の席を予約しました。',
                translation: '我預約了靠走道的座位。',
              },
            ],
          },
          {
            id: 'b6Xq2Kp8Tn4M',
            surface: '窓側',
            surfaceReading: 'まどがわ',
            dictionaryForm: '窓側',
            reading: 'まどがわ',
            partOfSpeech: 'noun',
            contextualMeaning: '靠窗的一側；此處指靠窗的座位',
            examples: [
              {
                id: 'F2vM7qR9kX3p',
                japanese: '窓側から外の景色が見えます。',
                translation: '從靠窗的位置可以看見外面的景色。',
              },
            ],
          },
        ],
      },
      {
        id: 't9M3xQ7kV2pL',
        speakerId: 'a9Tq3Lm7Xv2P',
        text: '通路側[つうろがわ]をお願[ねが]いします。',
        translation: '我想要靠走道的座位。',
      },
      {
        id: 'K2qV8mP4xN7t',
        speakerId: 'R4nW8cK2pY6d',
        text: 'かしこまりました。こちらが搭乗券[とうじょうけん]でございます。搭乗開始時刻[とうじょうかいしじこく]までに搭乗口[とうじょうぐち]までお越[こ]しください。',
        translation: '好的。這是您的登機證。請於開始登機前抵達登機門。',
        vocabularyNotes: [
          {
            id: 'w4Nq9Xk2Vt7M',
            surface: '搭乗券',
            surfaceReading: 'とうじょうけん',
            dictionaryForm: '搭乗券',
            reading: 'とうじょうけん',
            partOfSpeech: 'noun',
            contextualMeaning: '登機證；辦理報到後取得的搭機憑證',
            examples: [
              {
                id: 'A7mP3qL8xV2k',
                japanese: '搭乗券を係員に見せてください。',
                translation: '請向工作人員出示登機證。',
              },
            ],
          },
          {
            id: 'R8xK2nQ5vM9p',
            surface: '搭乗口',
            surfaceReading: 'とうじょうぐち',
            dictionaryForm: '搭乗口',
            reading: 'とうじょうぐち',
            partOfSpeech: 'noun',
            contextualMeaning: '登機門；乘客搭乘飛機前集合並登機的入口',
            examples: [
              {
                id: 'n3Vq7Tk9P2xM',
                japanese: '搭乗口は二十番です。',
                translation: '登機門是二十號。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'M6pQ2xV8kT4n',
            grammarPointId: null,
            pattern: '〜までに',
            shortMeaning: '在……之前',
            explanation:
              '表示截止時間，說明某個動作必須在指定時間點到來之前完成。',
            anchors: [{ surface: '搭乗開始時刻までに' }],
            sourceExample: {
              id: 'x9Kq3N7mV2pL',
              japanese: '搭乗開始時刻までに搭乗口までお越しください。',
              translation: '請於開始登機前抵達登機門。',
            },
            extraExample: {
              id: 'T5vM8qP2xR6k',
              japanese: '九時までに空港に来てください。',
              translation: '請在九點以前抵達機場。',
            },
          },
          {
            id: 'p7Qn2Xk9V4mT',
            grammarPointId: null,
            pattern: 'お〜ください',
            shortMeaning: '請您……',
            explanation:
              '「お＋動詞ます形＋ください」是尊敬語，用來禮貌地請對方做某個動作。',
            anchors: [{ surface: 'お越しください' }],
            sourceExample: {
              id: 'G4xV8mQ2kN7p',
              japanese: '搭乗口までお越しください。',
              translation: '請前往登機門。',
            },
            extraExample: {
              id: 'c2Tq9P5vX7mK',
              japanese: '時間になりましたら、受付までお越しください。',
              translation: '時間到了之後，請前往櫃檯。',
            },
          },
        ],
      },
      {
        id: 'q3Lx7Vn2M9pK',
        speakerId: 'a9Tq3Lm7Xv2P',
        text: 'ありがとうございます。',
        translation: '謝謝您。',
      },
      {
        id: 'X8mQ4kT2vP7n',
        speakerId: 'R4nW8cK2pY6d',
        text: 'どうぞお気[き]をつけて、いってらっしゃいませ。',
        translation: '祝您旅途愉快，一路平安。',
      },
    ],
  },
  {
    id: 'b6Qx2Lm9T4v',
    type: 'conversation',
    title: '駅で電車を聞く',
    excerpt: '駅員に乗る電車や切符の買い方を聞く会話です。',
    level: 'n5',
    categories: ['travel', 'service'],
    coverImage: null,
    sceneDescription:
      'ふふが駅員に東京駅までの行き方と切符の買い方を聞く場面です。',
    participants: [
      { id: 'h3Vn8Qp2Lm5', name: 'ふふ', role: '旅客', avatarKey: 'fufu' },
      { id: 'T7kM2xR9p4W', name: 'シロ', role: '駅員', avatarKey: 'shiro' },
    ],
    lines: [
      {
        id: 'c8Pq4Vn2L7m',
        speakerId: 'h3Vn8Qp2Lm5',
        text: 'すみません。東京駅[とうきょうえき]へ行[い]きたいです。',
        translation: '不好意思，我想去東京車站。',
        grammarNotes: [
          {
            id: 'Y2mK7qV4p9L',
            grammarPointId: null,
            pattern: '〜たいです',
            shortMeaning: '想要做～',
            explanation:
              '接在動詞ます形去掉「ます」之後，用來禮貌地說明自己想做的事情。',
            anchors: [{ surface: '行きたいです' }],
            sourceExample: {
              id: 'u5Rk2Pq8N4x',
              japanese: '東京駅へ行きたいです。',
              translation: '我想去東京車站。',
            },
            extraExample: {
              id: 'M9vT3kQ6p2L',
              japanese: '日本で桜を見たいです。',
              translation: '我想在日本看櫻花。',
            },
          },
        ],
      },
      {
        id: 'N4xL8qP2v7K',
        speakerId: 'h3Vn8Qp2Lm5',
        text: 'この電車[でんしゃ]で行[い]けますか。',
        translation: '搭這班電車可以到嗎？',
      },
      {
        id: 'p7Kq3M9vT2x',
        speakerId: 'T7kM2xR9p4W',
        text: 'はい、行[い]けます。三番線[さんばんせん]の電車[でんしゃ]に乗[の]ってください。',
        translation: '可以，請搭三號月台的電車。',
        vocabularyNotes: [
          {
            id: 'A5nV2qL8m4P',
            surface: '三番線',
            surfaceReading: 'さんばんせん',
            dictionaryForm: '番線',
            reading: 'ばんせん',
            partOfSpeech: 'noun',
            contextualMeaning: '三號月台；「番線」是車站內標示月台線路的編號',
            examples: [
              {
                id: 'r2Tq7Kp4M8v',
                japanese: '大阪行きの電車は五番線です。',
                translation: '開往大阪的電車在五號月台。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'L8pQ2vN5k7M',
            grammarPointId: null,
            pattern: '〜てください',
            shortMeaning: '請做～',
            explanation:
              '用動詞て形加上「ください」，禮貌地請對方進行某個動作。',
            anchors: [{ surface: '乗ってください' }],
            sourceExample: {
              id: 'x4M9qT2V7pK',
              japanese: '三番線の電車に乗ってください。',
              translation: '請搭三號月台的電車。',
            },
            extraExample: {
              id: 'Q6nP3kL8v2R',
              japanese: 'ここに名前を書いてください。',
              translation: '請在這裡寫名字。',
            },
          },
        ],
      },
      {
        id: 'v9M2pK7qL4T',
        speakerId: 'h3Vn8Qp2Lm5',
        text: '三番線[さんばんせん]はどこですか。',
        translation: '三號月台在哪裡？',
      },
      {
        id: 'K2rV8mQ5p7N',
        speakerId: 'T7kM2xR9p4W',
        text: 'あの階段[かいだん]を上[あ]がって、右[みぎ]にあります。',
        translation: '走上那座樓梯後，就在右邊。',
        vocabularyNotes: [
          {
            id: 'm4Qp9T2kV7L',
            surface: '階段',
            surfaceReading: 'かいだん',
            dictionaryForm: '階段',
            reading: 'かいだん',
            partOfSpeech: 'noun',
            contextualMeaning: '樓梯；此處指通往月台的樓梯',
            examples: [
              {
                id: 'P7xL3qN8m2K',
                japanese: '階段の上に出口があります。',
                translation: '樓梯上方有出口。',
              },
            ],
          },
        ],
      },
      {
        id: 'R5kN2vM8q4P',
        speakerId: 'h3Vn8Qp2Lm5',
        text: '切符[きっぷ]はどこで買[か]えますか。',
        translation: '車票可以在哪裡買？',
        vocabularyNotes: [
          {
            id: 't8Vq3P7mK2L',
            surface: '切符',
            surfaceReading: 'きっぷ',
            dictionaryForm: '切符',
            reading: 'きっぷ',
            partOfSpeech: 'noun',
            contextualMeaning: '車票；搭乘電車時使用的票券',
            examples: [
              {
                id: 'n2Lk8Q4vP7M',
                japanese: '駅で切符を買いました。',
                translation: '我在車站買了車票。',
              },
            ],
          },
        ],
      },
      {
        id: 'q3P9mV2K7xL',
        speakerId: 'T7kM2xR9p4W',
        text: 'あそこの券売機[けんばいき]で買[か]えます。',
        translation: '可以在那邊的售票機購買。',
      },
      {
        id: 'M7vK4qN2p8T',
        speakerId: 'h3Vn8Qp2Lm5',
        text: '東京駅[とうきょうえき]までいくらですか。',
        translation: '到東京車站多少錢？',
      },
      {
        id: 'x2Qm8P5kL7V',
        speakerId: 'T7kM2xR9p4W',
        text: '二百円[にひゃくえん]です。電車[でんしゃ]はあと五分[ごふん]で来[き]ます。',
        translation: '兩百日圓。電車再過五分鐘就會來。',
      },
      {
        id: 'V4pT7kM2q9N',
        speakerId: 'h3Vn8Qp2Lm5',
        text: '分[わ]かりました。ありがとうございます。',
        translation: '我知道了，謝謝您。',
      },
      {
        id: 'k9Nq2L6vP4M',
        speakerId: 'T7kM2xR9p4W',
        text: 'どういたしまして。気[き]をつけて行[い]ってください。',
        translation: '不客氣，路上請小心。',
      },
    ],
  },
  {
    id: 'Z4mQ8pL2v7K',
    type: 'conversation',
    title: '公開スケジュールを見直す',
    excerpt: '品質を守るために、プロジェクトの公開時期を相談する会話です。',
    level: 'n2',
    categories: ['work', 'schedule'],
    coverImage: null,
    sceneDescription:
      'プロジェクトの責任者と開発担当者が、テスト結果を踏まえて公開時期を相談する場面です。',
    participants: [
      {
        id: 'f8Tq3M2vK7P',
        name: 'ふふ',
        role: '專案負責人',
        avatarKey: 'fufu',
      },
      {
        id: 'W2nL9pQ4x6V',
        name: 'シロ',
        role: '開發人員',
        avatarKey: 'shiro',
      },
    ],
    lines: [
      {
        id: 'd7Pq2V9mK4L',
        speakerId: 'f8Tq3M2vK7P',
        text: '来月[らいげつ]の公開[こうかい]に向[む]けて、現在[げんざい]の進捗[しんちょく]を確認[かくにん]させてください。',
        translation: '為了下個月上線，請讓我確認目前的進度。',
        vocabularyNotes: [
          {
            id: 'Q3vK8mP2n7L',
            surface: '進捗',
            surfaceReading: 'しんちょく',
            dictionaryForm: '進捗',
            reading: 'しんちょく',
            partOfSpeech: 'noun',
            contextualMeaning: '進度；工作或計畫目前推進到什麼程度',
            examples: [
              {
                id: 'L5pN2qV8m4T',
                japanese: '会議で作業の進捗を報告します。',
                translation: '在會議中報告工作進度。',
              },
            ],
          },
        ],
      },
      {
        id: 'n6M2xQ8pT4V',
        speakerId: 'W2nL9pQ4x6V',
        text: '主要[しゅよう]な機能[きのう]は完成[かんせい]していますが、最終[さいしゅう]テストで重大[じゅうだい]な不具合[ふぐあい]が見[み]つかりました。',
        translation: '主要功能已經完成，但最終測試發現了嚴重的異常。',
        vocabularyNotes: [
          {
            id: 'p8Vq4K2mN7L',
            surface: '不具合',
            surfaceReading: 'ふぐあい',
            dictionaryForm: '不具合',
            reading: 'ふぐあい',
            partOfSpeech: 'noun',
            contextualMeaning: '異常、故障；此處指軟體功能沒有按照預期運作',
            examples: [
              {
                id: 'T2mL7qP4V9k',
                japanese: '新しい機能に不具合が見つかりました。',
                translation: '新功能發現了異常。',
              },
            ],
          },
        ],
      },
      {
        id: 'K4qP9vM2x7N',
        speakerId: 'f8Tq3M2vK7P',
        text: 'テスト結果[けっか]を踏[ふ]まえると、予定[よてい]どおりの公開[こうかい]は難[むずか]しいでしょうか。',
        translation: '考量測試結果，是否很難按照原定計畫上線？',
        grammarNotes: [
          {
            id: 'v7N2mQ9pL4K',
            grammarPointId: null,
            pattern: '〜を踏まえると',
            shortMeaning: '考量～之後',
            explanation:
              '把前面的資訊、結果或經驗當作判斷基礎，再提出後續的看法或結論。',
            anchors: [{ surface: 'テスト結果を踏まえると' }],
            sourceExample: {
              id: 'P4xK8qN2m7V',
              japanese: 'テスト結果を踏まえると、予定どおりの公開は難しいでしょうか。',
              translation: '考量測試結果，是否很難按照原定計畫上線？',
            },
            extraExample: {
              id: 'm9T2vL6qP4K',
              japanese: '利用者の意見を踏まえて、画面を改善しました。',
              translation: '參考使用者意見後，改善了畫面。',
            },
          },
        ],
      },
      {
        id: 'R2pV8mK5q7L',
        speakerId: 'W2nL9pQ4x6V',
        text: 'はい。品質[ひんしつ]を優先[ゆうせん]するなら、公開[こうかい]を延期[えんき]せざるを得[え]ません。',
        translation: '是的。如果以品質為優先，就不得不延後上線。',
        vocabularyNotes: [
          {
            id: 'x6Qm3P9vK2N',
            surface: '延期',
            surfaceReading: 'えんき',
            dictionaryForm: '延期',
            reading: 'えんき',
            partOfSpeech: 'noun',
            contextualMeaning: '延期；將原定的日期往後移',
            examples: [
              {
                id: 'N8kL2qV5m4P',
                japanese: '台風のため、イベントは延期になりました。',
                translation: '因為颱風，活動延期了。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'q5M2vP8kL7T',
            grammarPointId: null,
            pattern: '〜ざるを得ない',
            shortMeaning: '不得不～',
            explanation:
              '雖然不一定願意，但受到現實條件限制，沒有其他選擇，只能採取該行動。',
            anchors: [{ surface: '延期せざるを得ません' }],
            sourceExample: {
              id: 'V7pK3mQ9x2L',
              japanese: '品質を優先するなら、公開を延期せざるを得ません。',
              translation: '如果以品質為優先，就不得不延後上線。',
            },
            extraExample: {
              id: 'k2Qv8N4pM7L',
              japanese: '電車が止まったので、会議を欠席せざるを得なかった。',
              translation: '因為電車停駛，不得不缺席會議。',
            },
          },
        ],
      },
      {
        id: 'T9mK2qL7v4P',
        speakerId: 'f8Tq3M2vK7P',
        text: '延期[えんき]によって、利用者[りようしゃ]や取引先[とりひきさき]にどの程度[ていど]の影響[えいきょう]が出[で]ますか。',
        translation: '延期會對使用者和合作公司造成多大程度的影響？',
      },
      {
        id: 'L3vP8qN2m7K',
        speakerId: 'W2nL9pQ4x6V',
        text: '一週間[いっしゅうかん]程度[ていど]であれば、大[おお]きな支障[ししょう]はありません。ただ、事前[じぜん]の説明[せつめい]は必要[ひつよう]です。',
        translation: '如果是一週左右，不會造成太大的妨礙。不過需要事先說明。',
        vocabularyNotes: [
          {
            id: 'M8qT2kV7p4N',
            surface: '支障',
            surfaceReading: 'ししょう',
            dictionaryForm: '支障',
            reading: 'ししょう',
            partOfSpeech: 'noun',
            contextualMeaning: '妨礙、影響；此處指延期是否會阻礙相關工作',
            examples: [
              {
                id: 'r4Kp9V2mQ7L',
                japanese: '業務に支障が出ないように対応します。',
                translation: '會設法處理，避免妨礙業務。',
              },
            ],
          },
        ],
      },
      {
        id: 'P2xN7mQ4v9K',
        speakerId: 'f8Tq3M2vK7P',
        text: 'では、影響範囲[えいきょうはんい]と修正[しゅうせい]に必要[ひつよう]な日数[にっすう]を整理[せいり]してください。',
        translation: '那麼，請整理影響範圍以及修正所需的天數。',
      },
      {
        id: 'm7QK3pV9L2T',
        speakerId: 'W2nL9pQ4x6V',
        text: '承知[しょうち]しました。代替案[だいたいあん]として、安定[あんてい]している機能[きのう]だけを先[さき]に公開[こうかい]する方法[ほうほう]も検討[けんとう]します。',
        translation: '了解。作為替代方案，我也會研究先上線穩定功能的方法。',
        vocabularyNotes: [
          {
            id: 'Q9n2V5pK8mL',
            surface: '代替案',
            surfaceReading: 'だいたいあん',
            dictionaryForm: '代替案',
            reading: 'だいたいあん',
            partOfSpeech: 'noun',
            contextualMeaning: '替代方案；原計畫無法執行時可以採用的另一種做法',
            examples: [
              {
                id: 't3Lq7M2vP9K',
                japanese: '問題が起きた場合の代替案を用意します。',
                translation: '準備發生問題時的替代方案。',
              },
            ],
          },
        ],
      },
      {
        id: 'V5kP2mN8q4L',
        speakerId: 'f8Tq3M2vK7P',
        text: '段階的[だんかいてき]に公開[こうかい]すれば、利用者[りようしゃ]への影響[えいきょう]を抑[おさ]えられるかもしれませんね。',
        translation: '如果分階段上線，或許能降低對使用者的影響。',
        vocabularyNotes: [
          {
            id: 'p4M8qK2V7nL',
            surface: '段階的',
            surfaceReading: 'だんかいてき',
            dictionaryForm: '段階的',
            reading: 'だんかいてき',
            partOfSpeech: 'na_adjective',
            contextualMeaning: '分階段的；依照幾個步驟逐步進行',
            examples: [
              {
                id: 'K7vN3pQ9m2L',
                japanese: '新しい制度を段階的に導入します。',
                translation: '將分階段導入新制度。',
              },
            ],
          },
        ],
      },
      {
        id: 'q8L2mV5P9kN',
        speakerId: 'W2nL9pQ4x6V',
        text: 'はい。明日[あした]までに二[ふた]つの案[あん]を比較[ひかく]できる資料[しりょう]を作成[さくせい]します。',
        translation: '好的。我會在明天以前製作能比較兩個方案的資料。',
      },
      {
        id: 'N2pT7qK4v8M',
        speakerId: 'f8Tq3M2vK7P',
        text: 'それを基[もと]に、明日[あした]の会議[かいぎ]で最終判断[さいしゅうはんだん]をしましょう。',
        translation: '那就以那份資料為基礎，在明天的會議做最後決定吧。',
      },
    ],
  },
  {
    id: 'R6mQ2vK9xL4n',
    type: 'conversation',
    title: '誕生日のコースを予約する',
    excerpt: 'レストランに電話をして、誕生日の食事とコースを予約する会話です。',
    level: 'n4',
    categories: ['restaurant', 'reservation'],
    coverImage: null,
    sceneDescription:
      'ふふがレストランに電話をして、家族三人の誕生日の食事を予約する場面です。',
    participants: [
      { id: 'A7qM2xV9kL4n', name: 'ふふ', role: '客人', avatarKey: 'fufu' },
      { id: 'B3vK8mQ2nR7x', name: 'シロ', role: '店員', avatarKey: 'shiro' },
    ],
    lines: [
      {
        id: 'L9nQ4mX2vK7r',
        speakerId: 'B3vK8mQ2nR7x',
        text: 'お電話[でんわ]ありがとうございます。レストランみどりでございます。',
        translation: '感謝您的來電，這裡是綠意餐廳。',
      },
      {
        id: 'L2mV8qK5xN3r',
        speakerId: 'A7qM2xV9kL4n',
        text: '来週[らいしゅう]の日曜日[にちようび]、三人[さんにん]で夕食[ゆうしょく]を予約[よやく]したいんですが、六時[ろくじ]は空[あ]いていますか。',
        translation: '我想預約下週日三個人的晚餐，請問六點有空位嗎？',
        grammarNotes: [
          {
            id: 'G5xR2mL8qV4n',
            grammarPointId: null,
            pattern: '〜たいんですが',
            shortMeaning: '想～（委婉開口）',
            explanation:
              '先委婉說明自己的希望，再讓對方接著回應，常用於預約、詢問或提出請求。',
            anchors: [{ surface: '予約したいんですが' }],
            sourceExample: {
              id: 'E8qN3vK6mX2r',
              japanese: '三人で夕食を予約したいんですが。',
              translation: '我想預約三個人的晚餐。',
            },
            extraExample: {
              id: 'E4mL9xQ2vK7n',
              japanese: '来週の予定を確認したいんですが。',
              translation: '我想確認下週的行程。',
            },
          },
        ],
      },
      {
        id: 'L7qX3nM9vK2r',
        speakerId: 'B3vK8mQ2nR7x',
        text: '申[もう]し訳[わけ]ございません。六時[ろくじ]は満席[まんせき]ですが、六時半[ろくじはん]でしたらご案内[あんない]できます。',
        translation: '非常抱歉，六點已經客滿，不過六點半可以為您安排座位。',
        vocabularyNotes: [
          {
            id: 'V6mK2qR9xN4v',
            surface: '満席',
            surfaceReading: 'まんせき',
            dictionaryForm: '満席',
            reading: 'まんせき',
            partOfSpeech: 'noun',
            contextualMeaning: '所有座位都已有人或被預約，沒有空位',
            examples: [
              {
                id: 'E2vQ7mL4xK9n',
                japanese: '今日は予約で満席です。',
                translation: '今天座位已經全被預約了。',
              },
            ],
          },
        ],
      },
      {
        id: 'L4vN9qK2mX7r',
        speakerId: 'A7qM2xV9kL4n',
        text: 'では、六時半[ろくじはん]でお願[ねが]いします。母[はは]の誕生日[たんじょうび]なので、コース料理[りょうり]にしたいです。',
        translation: '那就麻煩安排六點半。因為是我媽媽的生日，我想選套餐。',
        vocabularyNotes: [
          {
            id: 'V8xL3mQ7nK2r',
            surface: '誕生日',
            surfaceReading: 'たんじょうび',
            dictionaryForm: '誕生日',
            reading: 'たんじょうび',
            partOfSpeech: 'noun',
            contextualMeaning: '出生的日期；此處指為媽媽慶祝生日',
            examples: [
              {
                id: 'E5nR2vK8qM4x',
                japanese: '明日は父の誕生日です。',
                translation: '明天是爸爸的生日。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'G3mX8qV5nK2r',
            grammarPointId: null,
            pattern: '〜ので',
            shortMeaning: '因為～',
            explanation:
              '用來說明原因或理由，語氣比「〜から」柔和，適合在服務場合向對方補充情況。',
            anchors: [{ surface: '誕生日なので' }],
            sourceExample: {
              id: 'E7qK2mN9vX4r',
              japanese: '母の誕生日なので、コース料理にしたいです。',
              translation: '因為是媽媽的生日，所以我想選套餐。',
            },
            extraExample: {
              id: 'E9vM4xL2qK7n',
              japanese: '雨なので、電車で行きます。',
              translation: '因為下雨，所以搭電車去。',
            },
          },
        ],
      },
      {
        id: 'L8mK2xR6qV4n',
        speakerId: 'B3vK8mQ2nR7x',
        text: '三千円[さんぜんえん]と五千円[ごせんえん]のコースがございます。どちらになさいますか。',
        translation: '我們有三千日圓和五千日圓的套餐，請問您要選哪一種？',
      },
      {
        id: 'L3qV7nK9mX2r',
        speakerId: 'A7qM2xV9kL4n',
        text: '三千円[さんぜんえん]のコースをお願[ねが]いします。一人[ひとり]、生魚[なまざかな]が食[た]べられないので、別[べつ]の料理[りょうり]に変[か]えてもらえますか。',
        translation: '麻煩安排三千日圓的套餐。其中一位不能吃生魚，可以幫忙換成別的料理嗎？',
        vocabularyNotes: [
          {
            id: 'V2nQ8mL5xK7r',
            surface: '生魚',
            surfaceReading: 'なまざかな',
            dictionaryForm: '生魚',
            reading: 'なまざかな',
            partOfSpeech: 'noun',
            contextualMeaning: '未經加熱烹調的魚肉',
            examples: [
              {
                id: 'E6xK3vQ9mN2r',
                japanese: '私は生魚を食べません。',
                translation: '我不吃生魚。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'G7vN2mK8qX4r',
            grammarPointId: null,
            pattern: '〜てもらえますか',
            shortMeaning: '可以請你幫我～嗎',
            explanation:
              '請對方為自己做某件事時使用的客氣問法，比直接要求「〜てください」更柔和。',
            anchors: [{ surface: '変えてもらえますか' }],
            sourceExample: {
              id: 'E3mQ8xL5vK2n',
              japanese: '別の料理に変えてもらえますか。',
              translation: '可以幫我換成別的料理嗎？',
            },
            extraExample: {
              id: 'E4rK9nV2mQ7x',
              japanese: '窓側の席に変えてもらえますか。',
              translation: '可以幫我換成靠窗的座位嗎？',
            },
          },
        ],
      },
      {
        id: 'L5xM2qK8vN7r',
        speakerId: 'B3vK8mQ2nR7x',
        text: 'かしこまりました。生魚[なまざかな]は焼[や]き魚[ざかな]に変更[へんこう]いたします。お名前[なまえ]とお電話番号[でんわばんごう]をお願[ねが]いいたします。',
        translation: '好的，我們會把生魚改成烤魚。再請您提供姓名和電話號碼。',
        vocabularyNotes: [
          {
            id: 'V9mR4xK2qN7v',
            surface: '変更',
            surfaceReading: 'へんこう',
            dictionaryForm: '変更',
            reading: 'へんこう',
            partOfSpeech: 'noun',
            contextualMeaning: '把原本預定的內容改成其他內容',
            examples: [
              {
                id: 'E8qL2mX6vK4n',
                japanese: '予約の時間を変更しました。',
                translation: '更改了預約時間。',
              },
            ],
          },
        ],
      },
      {
        id: 'L2rK9mV4xQ7n',
        speakerId: 'A7qM2xV9kL4n',
        text: 'ふふです。電話番号[でんわばんごう]は〇九〇の二四六八の一三五七です。',
        translation: '我叫ふふ，電話號碼是090-2468-1357。',
      },
      {
        id: 'L6nQ3vX8mK2r',
        speakerId: 'B3vK8mQ2nR7x',
        text: '確認[かくにん]いたします。来週[らいしゅう]の日曜日[にちようび]、六時半[ろくじはん]から三名様[さんめいさま]、三千円[さんぜんえん]のコースで承[うけたまわ]りました。',
        translation: '和您確認一下：下週日六點半開始，三位，預約三千日圓的套餐。',
      },
      {
        id: 'L4qX7mN2vK9r',
        speakerId: 'A7qM2xV9kL4n',
        text: 'ありがとうございます。当日[とうじつ]、よろしくお願[ねが]いします。',
        translation: '謝謝您，當天就麻煩了。',
      },
    ],
  },
  {
    id: 'T8qL3mV6xN2k',
    type: 'conversation',
    title: 'コンビニでお弁当を買う',
    excerpt: 'コンビニでお弁当とお茶を買う会話です。',
    level: 'n5',
    categories: ['shopping', 'service'],
    coverImage: null,
    sceneDescription:
      'ふふがコンビニでお弁当とお茶を買い、レジで会計をする場面です。',
    participants: [
      { id: 'U4mK9qX2vN7r', name: 'ふふ', role: '客人', avatarKey: 'fufu' },
      { id: 'W7nR2mL8qK4x', name: 'シロ', role: '店員', avatarKey: 'shiro' },
    ],
    lines: [
      {
        id: 'Y2qV8mK5xN3r',
        speakerId: 'W7nR2mL8qK4x',
        text: 'いらっしゃいませ。',
        translation: '歡迎光臨。',
      },
      {
        id: 'Y6mX3qL9vK2n',
        speakerId: 'U4mK9qX2vN7r',
        text: 'このお弁当[べんとう]をください。',
        translation: '請給我這個便當。',
        vocabularyNotes: [
          {
            id: 'Z3vN8qK2mR5x',
            surface: 'お弁当',
            surfaceReading: 'おべんとう',
            dictionaryForm: '弁当',
            reading: 'べんとう',
            partOfSpeech: 'noun',
            contextualMeaning: '裝在盒子裡、可以直接帶走食用的餐點',
            examples: [
              {
                id: 'a7mQ2xL9vK4n',
                japanese: '昼ご飯に弁当を買います。',
                translation: '午餐要買便當。',
              },
            ],
          },
        ],
      },
      {
        id: 'Y9xK4mV2qN7r',
        speakerId: 'W7nR2mL8qK4x',
        text: 'お弁当[べんとう]は温[あたた]めますか。',
        translation: '便當需要加熱嗎？',
      },
      {
        id: 'Y5nL2vQ8mK3x',
        speakerId: 'U4mK9qX2vN7r',
        text: 'はい、お願[ねが]いします。それから、このお茶[ちゃ]もください。',
        translation: '好的，麻煩你。另外也請給我這瓶茶。',
      },
      {
        id: 'Y8qM3xK7vN2r',
        speakerId: 'W7nR2mL8qK4x',
        text: 'レジ袋[ぶくろ]はご利用[りよう]ですか。',
        translation: '需要購物袋嗎？',
      },
      {
        id: 'Y4vK9nQ2mX7r',
        speakerId: 'U4mK9qX2vN7r',
        text: 'いいえ、袋[ふくろ]を持[も]っています。',
        translation: '不用，我有帶袋子。',
        grammarNotes: [
          {
            id: 'b2mR8qL5xV3n',
            grammarPointId: null,
            pattern: '〜ています',
            shortMeaning: '正處於～的狀態',
            explanation:
              '這裡不是強調正在拿袋子的動作，而是說自己現在處於「有帶著袋子」的狀態。',
            anchors: [{ surface: '持っています' }],
            sourceExample: {
              id: 'b7qN2vK9mX4r',
              japanese: '袋を持っています。',
              translation: '我有帶袋子。',
            },
            extraExample: {
              id: 'b5mL8xQ3vK2n',
              japanese: '日本の地図を持っています。',
              translation: '我有帶日本地圖。',
            },
          },
        ],
      },
      {
        id: 'Y3mV7qN9xK2r',
        speakerId: 'W7nR2mL8qK4x',
        text: '五百八十円[ごひゃくはちじゅうえん]です。',
        translation: '一共是580日圓。',
      },
      {
        id: 'Y7xQ2mK8vN4r',
        speakerId: 'U4mK9qX2vN7r',
        text: '千円[せんえん]でお願[ねが]いします。',
        translation: '用一千日圓付款。',
      },
      {
        id: 'Y2nK9vM4qX7r',
        speakerId: 'W7nR2mL8qK4x',
        text: '四百二十円[よんひゃくにじゅうえん]のお釣[つ]りとレシートです。',
        translation: '這是找您的420日圓和收據。',
        vocabularyNotes: [
          {
            id: 'Z8qK3mX6vN2r',
            surface: 'お釣り',
            surfaceReading: 'おつり',
            dictionaryForm: 'お釣り',
            reading: 'おつり',
            partOfSpeech: 'noun',
            contextualMeaning: '付款金額超過商品價格時找回的錢',
            examples: [
              {
                id: 'a4vM9qL2xK7n',
                japanese: 'お釣りは百円です。',
                translation: '找您一百日圓。',
              },
            ],
          },
        ],
      },
      {
        id: 'Y6qN3mL8vK2x',
        speakerId: 'U4mK9qX2vN7r',
        text: 'ありがとうございます。',
        translation: '謝謝。',
      },
    ],
  },
  {
    id: 'c9mQ4vL2xK7n',
    type: 'conversation',
    title: 'ホテルに忘れ物を聞く',
    excerpt: '泊まったホテルに電話をして、忘れ物を確認する会話です。',
    level: 'n3',
    categories: ['hotel', 'service'],
    coverImage: null,
    sceneDescription:
      'ふふが宿泊したホテルに電話をして、部屋に忘れたポーチについて問い合わせる場面です。',
    participants: [
      { id: 'd3qN8mK5vX2r', name: 'ふふ', role: '住宿旅客', avatarKey: 'fufu' },
      { id: 'd7mL2xQ9vK4n', name: 'シロ', role: '飯店人員', avatarKey: 'shiro' },
    ],
    lines: [
      {
        id: 'f2vK8qM5xN3r',
        speakerId: 'd7mL2xQ9vK4n',
        text: 'お電話[でんわ]ありがとうございます。ホテルあおばでございます。',
        translation: '感謝您的來電，這裡是青葉飯店。',
      },
      {
        id: 'f6mX3qL9vK2n',
        speakerId: 'd3qN8mK5vX2r',
        text: '昨日[きのう]まで五〇三号室[ごひゃくさんごうしつ]に泊[と]まっていたふふと申[もう]します。部屋[へや]に青[あお]いポーチを忘[わす]れたかもしれません。',
        translation: '我是住在503號房、昨天退房的ふふ。我可能把一個藍色小包忘在房間裡了。',
        vocabularyNotes: [
          {
            id: 'g4nQ9xK2mV7r',
            surface: '泊まっていた',
            surfaceReading: 'とまっていた',
            dictionaryForm: '泊まる',
            reading: 'とまる',
            partOfSpeech: 'verb',
            contextualMeaning: '先前曾經住宿，現在已經退房',
            examples: [
              {
                id: 'g8mL3vQ6xK2n',
                japanese: '先週、このホテルに泊まりました。',
                translation: '上週住過這間飯店。',
              },
            ],
          },
        ],
      },
      {
        id: 'f9qK4mV2xN7r',
        speakerId: 'd7mL2xQ9vK4n',
        text: '承知[しょうち]いたしました。お部屋[へや]を確認[かくにん]いたしますので、少々[しょうしょう]お待[ま]ちいただけますでしょうか。',
        translation: '了解，我們會確認房間，能否請您稍候一下？',
      },
      {
        id: 'f5nL2vQ8mK3x',
        speakerId: 'd3qN8mK5vX2r',
        text: 'はい、お願[ねが]いします。',
        translation: '好的，麻煩您。',
      },
      {
        id: 'f8qM3xK7vN2r',
        speakerId: 'd7mL2xQ9vK4n',
        text: 'お待[ま]たせいたしました。清掃[せいそう]の担当者[たんとうしゃ]に確認[かくにん]したところ、青[あお]いポーチをお預[あず]かりしておりました。',
        translation: '讓您久等了。向清潔人員確認後，確實有保管一個藍色小包。',
        vocabularyNotes: [
          {
            id: 'g7vN2mK9qX4r',
            surface: '清掃',
            surfaceReading: 'せいそう',
            dictionaryForm: '清掃',
            reading: 'せいそう',
            partOfSpeech: 'noun',
            contextualMeaning: '飯店人員進行房間清潔與整理的工作',
            examples: [
              {
                id: 'g3mQ8xL5vK2n',
                japanese: '午前中に部屋を清掃します。',
                translation: '上午會清掃房間。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'h6xK3vQ9mN2r',
            grammarPointId: null,
            pattern: '〜たところ',
            shortMeaning: '做了～之後，結果～',
            explanation:
              '實際完成某個動作後得到了新的結果或資訊；這裡是詢問清潔人員後確認找到了物品。',
            anchors: [{ surface: '確認したところ' }],
            sourceExample: {
              id: 'h2vM7qL4xN9k',
              japanese: '担当者に確認したところ、忘れ物が見つかりました。',
              translation: '向負責人確認後，找到了遺失物。',
            },
            extraExample: {
              id: 'h8qL2mX6vK4n',
              japanese: '店に電話したところ、今日は休みでした。',
              translation: '打電話到店裡詢問後，才知道今天休息。',
            },
          },
        ],
      },
      {
        id: 'f4vK9nQ2mX7r',
        speakerId: 'd3qN8mK5vX2r',
        text: 'よかったです。自宅[じたく]まで送[おく]っていただくことはできますか。',
        translation: '太好了。可以幫我寄到家裡嗎？',
      },
      {
        id: 'f3mV7qN9xK2r',
        speakerId: 'd7mL2xQ9vK4n',
        text: 'はい、着払[ちゃくばら]いでしたら発送[はっそう]できます。お届[とど]け先[さき]のご住所[じゅうしょ]をお願[ねが]いいたします。',
        translation: '可以，如果採收到貨後付款，我們可以寄送。請提供收件地址。',
        vocabularyNotes: [
          {
            id: 'g9mR4xK2qN7v',
            surface: '着払い',
            surfaceReading: 'ちゃくばらい',
            dictionaryForm: '着払い',
            reading: 'ちゃくばらい',
            partOfSpeech: 'noun',
            contextualMeaning: '包裹送達時，由收件人支付運費的寄送方式',
            examples: [
              {
                id: 'g5nR2vK8qM4x',
                japanese: '荷物を着払いで送りました。',
                translation: '用貨到付運費的方式寄出了包裹。',
              },
            ],
          },
        ],
      },
      {
        id: 'f7xQ2mK8vN4r',
        speakerId: 'd3qN8mK5vX2r',
        text: '東京都[とうきょうと]中野区[なかのく]一丁目[いっちょうめ]二番[にばん]です。',
        translation: '地址是東京都中野區一丁目二號。',
      },
      {
        id: 'f2nK9vM4qX7r',
        speakerId: 'd7mL2xQ9vK4n',
        text: 'かしこまりました。本日中[ほんじつちゅう]に発送[はっそう]し、伝票番号[でんぴょうばんごう]をメールでお知[し]らせいたします。',
        translation: '好的，我們會在今天內寄出，並以電子郵件通知您包裹查詢號碼。',
      },
      {
        id: 'f6qN3mL8vK2x',
        speakerId: 'd3qN8mK5vX2r',
        text: '助[たす]かります。よろしくお願[ねが]いします。',
        translation: '幫大忙了，麻煩您。',
      },
    ],
  },
  {
    id: 'j8mQ3vL6xN2k',
    type: 'conversation',
    title: '出社ルールを見直す',
    excerpt: '働き方に合わせて、出社ルールの見直しを話し合う会話です。',
    level: 'n1',
    categories: ['work', 'schedule'],
    coverImage: null,
    sceneDescription:
      'チームの責任者、人事担当者、社員が、試験中の出社ルールについて意見を交わす場面です。',
    participants: [
      { id: 'k4mK9qX2vN7r', name: 'ふふ', role: '團隊主管', avatarKey: 'fufu' },
      { id: 'k7nR2mL8qK4x', name: 'シロ', role: '人資人員', avatarKey: 'shiro' },
      { id: 'k3vN8qK2mR5x', name: 'クロ', role: '團隊成員', avatarKey: 'kuro' },
    ],
    lines: [
      {
        id: 'm2qV8mK5xN3r',
        speakerId: 'k4mK9qX2vN7r',
        text: '試験導入[しけんどうにゅう]から三[さん]か月[げつ]たったので、週三日[しゅうみっか]の出社[しゅっしゃ]ルールを見直[みなお]したいと思[おも]います。',
        translation: '試行導入已經三個月了，我想重新檢討每週進辦公室三天的規則。',
      },
      {
        id: 'm6mX3qL9vK2n',
        speakerId: 'k7nR2mL8qK4x',
        text: '人事[じんじ]の調査[ちょうさ]では、生産性[せいさんせい]は維持[いじ]できていますが、部署[ぶしょ]を越[こ]えた相談[そうだん]が減[へ]ったという声[こえ]が出[で]ています。',
        translation: '根據人資調查，生產力維持住了，但也有人反映跨部門討論變少。',
        vocabularyNotes: [
          {
            id: 'n7mQ2xL9vK4r',
            surface: '生産性',
            surfaceReading: 'せいさんせい',
            dictionaryForm: '生産性',
            reading: 'せいさんせい',
            partOfSpeech: 'noun',
            contextualMeaning: '投入時間與資源後能產出多少成果的效率指標',
            examples: [
              {
                id: 'n4vM9qL2xK7r',
                japanese: '作業を自動化して生産性を高めます。',
                translation: '將工作自動化以提升生產力。',
              },
            ],
          },
        ],
      },
      {
        id: 'm9xK4mV2qN7r',
        speakerId: 'k3vN8qK2mR5x',
        text: '一律[いちりつ]に三日[みっか]と決[き]めると、集中作業[しゅうちゅうさぎょう]が多[おお]い職種[しょくしゅ]には、かえって負担[ふたん]になるのではないでしょうか。',
        translation: '如果一律規定三天，對需要大量專注工作的職務來說，反而可能成為負擔。',
        vocabularyNotes: [
          {
            id: 'n3vN8qK2mR5x',
            surface: '一律',
            surfaceReading: 'いちりつ',
            dictionaryForm: '一律',
            reading: 'いちりつ',
            partOfSpeech: 'adverb',
            contextualMeaning: '不考慮個別差異，全部套用同一標準',
            examples: [
              {
                id: 'n8mL3vQ6xK2r',
                japanese: '全員に一律の基準を適用する。',
                translation: '對所有人一律套用相同標準。',
              },
            ],
          },
        ],
      },
      {
        id: 'm5nL2vQ8mK3x',
        speakerId: 'k4mK9qX2vN7r',
        text: '確[たし]かに、出社日数[しゅっしゃにっすう]だけを基準[きじゅん]にすると、制度[せいど]が形骸化[けいがいか]しかねません。',
        translation: '確實，如果只把進辦公室的天數當作標準，制度可能會流於形式。',
        vocabularyNotes: [
          {
            id: 'n9mR4xK2qN7v',
            surface: '形骸化',
            surfaceReading: 'けいがいか',
            dictionaryForm: '形骸化',
            reading: 'けいがいか',
            partOfSpeech: 'noun',
            contextualMeaning: '只剩下形式，原本的目的與實質作用已經消失',
            examples: [
              {
                id: 'n5nR2vK8qM4x',
                japanese: '会議が形骸化しないよう、目的を明確にする。',
                translation: '為避免會議流於形式，要明確訂出目的。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'p6xK3vQ9mN2r',
            grammarPointId: null,
            pattern: '〜かねない',
            shortMeaning: '恐怕會～',
            explanation:
              '用來指出某個負面結果有發生的可能，帶有說話者的警戒或擔憂。',
            anchors: [{ surface: '形骸化しかねません' }],
            sourceExample: {
              id: 'p2vM7qL4xN9k',
              japanese: '制度が形骸化しかねません。',
              translation: '制度恐怕會流於形式。',
            },
            extraExample: {
              id: 'p8qL2mX6vK4n',
              japanese: '説明が不足すると、誤解を招きかねない。',
              translation: '說明不足恐怕會引發誤解。',
            },
          },
        ],
      },
      {
        id: 'm8qM3xK7vN2r',
        speakerId: 'k7nR2mL8qK4x',
        text: '一方[いっぽう]で、完全[かんぜん]に各部署[かくぶしょ]の裁量[さいりょう]に委[ゆだ]ねると、運用[うんよう]にばらつきが出[で]る懸念[けねん]もあります。',
        translation: '另一方面，如果完全交由各部門自行裁量，也可能出現執行方式不一致的問題。',
        vocabularyNotes: [
          {
            id: 'n6xK3vQ9mN2r',
            surface: '裁量',
            surfaceReading: 'さいりょう',
            dictionaryForm: '裁量',
            reading: 'さいりょう',
            partOfSpeech: 'noun',
            contextualMeaning: '在一定權限內自行判斷並決定做法的空間',
            examples: [
              {
                id: 'n2vM7qL4xN9r',
                japanese: '勤務時間は各自の裁量に任されています。',
                translation: '工作時間交由每個人自行決定。',
              },
            ],
          },
        ],
      },
      {
        id: 'm4vK9nQ2mX7r',
        speakerId: 'k3vN8qK2mR5x',
        text: 'では、対面[たいめん]で行[おこな]う目的[もくてき]を先[さき]に定[さだ]め、その目的[もくてき]に即[そく]して出社日[しゅっしゃび]を決[き]めるのはどうでしょう。',
        translation: '那麼，是否可以先定義需要面對面進行的目的，再依據那些目的決定進辦公室的日期？',
        grammarNotes: [
          {
            id: 'p7vN2mK9qX4r',
            grammarPointId: null,
            pattern: '〜に即して',
            shortMeaning: '依照～、符合～',
            explanation:
              '以規則、目的或實際情況為依據採取相符的做法，常用於正式討論與書面表達。',
            anchors: [{ surface: '目的に即して' }],
            sourceExample: {
              id: 'p3mQ8xL5vK2n',
              japanese: '目的に即して出社日を決めます。',
              translation: '依據目的決定進辦公室的日期。',
            },
            extraExample: {
              id: 'p4rK9nV2mQ7x',
              japanese: '現場の実情に即して制度を見直す。',
              translation: '依照現場實際情況重新檢討制度。',
            },
          },
        ],
      },
      {
        id: 'm3mV7qN9xK2r',
        speakerId: 'k4mK9qX2vN7r',
        text: '共同作業[きょうどうさぎょう]や育成[いくせい]が必要[ひつよう]な日[ひ]をチームで共有[きょうゆう]し、それ以外[いがい]は在宅勤務[ざいたくきんむ]を選[えら]べる形[かたち]ですね。',
        translation: '也就是由團隊共享需要協作或培訓的日期，其餘時間則可選擇居家辦公。',
      },
      {
        id: 'm7xQ2mK8vN4r',
        speakerId: 'k7nR2mL8qK4x',
        text: 'それなら、会社全体[かいしゃぜんたい]の原則[げんそく]を保[たも]ちつつ、職種[しょくしゅ]ごとの事情[じじょう]も反映[はんえい]できます。',
        translation: '這樣既能維持全公司的原則，也能反映各職務的不同情況。',
      },
      {
        id: 'm2nK9vM4qX7r',
        speakerId: 'k3vN8qK2mR5x',
        text: '通勤[つうきん]が難[むずか]しい事情[じじょう]がある場合[ばあい]の例外[れいがい]も、あらかじめ明確[めいかく]にしてほしいです。',
        translation: '如果有人因特殊情況難以通勤，也希望能事先明確訂出例外處理方式。',
      },
      {
        id: 'm6qN3mL8vK2x',
        speakerId: 'k7nR2mL8qK4x',
        text: '今日[きょう]の意見[いけん]を踏[ふ]まえ、対象業務[たいしょうぎょうむ]と例外条件[れいがいじょうけん]を整理[せいり]した案[あん]を作成[さくせい]します。',
        translation: '我會根據今天的意見，擬定一份整理適用工作與例外條件的方案。',
        grammarNotes: [
          {
            id: 'p9mR4xK2qN7v',
            grammarPointId: null,
            pattern: '〜を踏まえ',
            shortMeaning: '根據～、考量～',
            explanation:
              '把前述意見、結果或情況納入判斷，再進行後續行動，常見於會議與正式報告。',
            anchors: [{ surface: '意見を踏まえ' }],
            sourceExample: {
              id: 'p5nR2vK8qM4x',
              japanese: '今日の意見を踏まえ、案を作成します。',
              translation: '根據今天的意見擬定方案。',
            },
            extraExample: {
              id: 'p8mL3vQ6xK2n',
              japanese: '調査結果を踏まえ、計画を修正した。',
              translation: '根據調查結果修正了計畫。',
            },
          },
        ],
      },
      {
        id: 'm5qV8nK2xR4r',
        speakerId: 'k4mK9qX2vN7r',
        text: '次回[じかい]はその案[あん]を基[もと]に、現場[げんば]で無理[むり]なく運用[うんよう]できるか検討[けんとう]しましょう。',
        translation: '下次就以那份方案為基礎，檢討能否在現場順利執行。',
      },
    ],
  },
]
