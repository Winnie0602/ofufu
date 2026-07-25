import type { ConversationMaterial } from '~/types/conversation'

export const conversationMaterials: ConversationMaterial[] = [
  {
    id: 'C7Km3pQx92Ab',
    type: 'conversation',
    title: '電話で席を予約する',
    excerpt: 'レストランに電話をして、二人分の席を予約する会話です。',
    level: 'n4',
    categories: ['restaurant', 'reservation'],
    coverImage: null,
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
    id: 'X8mQa4L2vP',
    type: 'conversation',
    title: '空港でチェックイン',
    excerpt: '空港でチェックインをする会話です。',
    level: 'n4',
    categories: ['airport', 'travel'],
    coverImage: null,
    sceneDescription:
      '旅行に行く前に、空港のチェックインカウンターで手続きをする場面です。',
    participants: [
      {
        id: 'h2LpN8xQ5A',
        name: 'シロ',
        role: '地勤人員',
        avatarKey: 'shiro',
      },
      {
        id: 'v7KtM3bY9R',
        name: 'ふふ',
        role: '旅客',
        avatarKey: 'fufu',
      },
    ],
    lines: [
      {
        id: 'a6YpR4mT8J',
        speakerId: 'h2LpN8xQ5A',
        text: 'こんにちは。パスポートと航空券[こうくうけん]をお願[ねが]いします。',
        translation: '您好，請出示護照和機票。',
        vocabularyNotes: [
          {
            id: 'e3QwL9nF7S',
            surface: '航空券',
            surfaceReading: 'こうくうけん',
            dictionaryForm: '航空券',
            reading: 'こうくうけん',
            partOfSpeech: 'noun',
            contextualMeaning: '機票',
            examples: [
              {
                id: 'd5MxK2vP1C',
                japanese: '航空券をインターネットで予約しました。',
                translation: '我在網路上預訂了機票。',
              },
            ],
          },
        ],
      },
      {
        id: 'j4NzV7qL2D',
        speakerId: 'v7KtM3bY9R',
        text: 'はい、お願[ねが]いします。',
        translation: '好的，麻煩您了。',
      },
      {
        id: 'k8TaH6cR5M',
        speakerId: 'h2LpN8xQ5A',
        text: 'お荷物[にもつ]はお預[あず]けになりますか。',
        translation: '請問有需要托運行李嗎？',
        vocabularyNotes: [
          {
            id: 'm5QxW8uB2N',
            surface: 'お預け',
            surfaceReading: 'おあずけ',
            dictionaryForm: '預ける',
            reading: 'あずける',
            partOfSpeech: 'verb',
            contextualMeaning: '寄放、托運（此處指托運行李）',
            examples: [
              {
                id: 'r9LpC3vE6K',
                japanese: '荷物をホテルに預けました。',
                translation: '我把行李寄放在飯店。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 't7GwM4kY1J',
            grammarPointId: null,
            pattern: '〜になりますか',
            shortMeaning: '是否要～',
            explanation: '服務業常用的禮貌說法，用來確認顧客是否需要某項服務。',
            anchors: [
              {
                surface: 'お預けになりますか',
              },
            ],
            sourceExample: {
              id: 'u2PeL8rQ4A',
              japanese: 'お荷物はお預けになりますか。',
              translation: '請問要托運行李嗎？',
            },
            extraExample: {
              id: 'w6HtB5xN9F',
              japanese: 'お支払いは現金になりますか。',
              translation: '請問您要用現金付款嗎？',
            },
          },
        ],
      },
      {
        id: 'p3FsK7mQ8X',
        speakerId: 'v7KtM3bY9R',
        text: 'はい、このスーツケースを一[ひと]つお願[ねが]いします。',
        translation: '是的，這個行李箱要托運一件。',
      },
      {
        id: 'g9WdL2tH5P',
        speakerId: 'h2LpN8xQ5A',
        text: 'ありがとうございます。重量[じゅうりょう]を確認[かくにん]しますので、こちらへお願[ねが]いします。',
        translation: '好的，謝謝。我們要確認重量，請放到這邊。',
        vocabularyNotes: [
          {
            id: 'b4RaY6mU8E',
            surface: '重量',
            surfaceReading: 'じゅうりょう',
            dictionaryForm: '重量',
            reading: 'じゅうりょう',
            partOfSpeech: 'noun',
            contextualMeaning: '重量',
            examples: [
              {
                id: 'n1TvK7pL5R',
                japanese: '荷物の重量を測ります。',
                translation: '測量行李的重量。',
              },
            ],
          },
        ],
      },
      {
        id: 'c8QmF5xZ2T',
        speakerId: 'h2LpN8xQ5A',
        text: '問題[もんだい]ありません。窓側[まどがわ]のお席[せき]をご希望[きぼう]でしたね。',
        translation: '沒有問題。您希望坐靠窗的位置，對吧？',
        vocabularyNotes: [
          {
            id: 'f7LnR3kM9B',
            surface: '希望',
            surfaceReading: 'きぼう',
            dictionaryForm: '希望',
            reading: 'きぼう',
            partOfSpeech: 'noun',
            contextualMeaning: '希望、需求',
            examples: [
              {
                id: 'q2HaV8sD6W',
                japanese: 'ご希望を教えてください。',
                translation: '請告訴我您的需求。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 's5KeJ1yP4G',
            grammarPointId: null,
            pattern: '〜でしたね',
            shortMeaning: '我記得是～吧',
            explanation:
              '說話者確認自己記得的資訊是否正確，帶有再次確認的語氣。',
            anchors: [
              {
                surface: 'ご希望でしたね',
              },
            ],
            sourceExample: {
              id: 'v8MuD4qC1L',
              japanese: '窓側のお席をご希望でしたね。',
              translation: '您是希望靠窗座位，對吧。',
            },
            extraExample: {
              id: 'x4PnA7hR5Y',
              japanese: '今日は休みでしたね。',
              translation: '今天是休假，對吧。',
            },
          },
        ],
      },
      {
        id: 'z3LvQ6bM8N',
        speakerId: 'v7KtM3bY9R',
        text: 'はい、できれば窓側[まどがわ]がいいです。',
        translation: '是的，如果可以的話，希望是靠窗。',
        grammarNotes: [
          {
            id: 'y7TkF2nJ5P',
            grammarPointId: null,
            pattern: '〜できれば',
            shortMeaning: '如果可以的話',
            explanation: '用來委婉表達自己的希望或要求，比直接要求更客氣。',
            anchors: [
              {
                surface: 'できれば',
              },
            ],
            sourceExample: {
              id: 'p5WvL9dQ2X',
              japanese: 'できれば窓側がいいです。',
              translation: '如果可以，希望是靠窗。',
            },
            extraExample: {
              id: 'h6QnB3mR8C',
              japanese: 'できれば早めに来てください。',
              translation: '如果可以的話，請早一點來。',
            },
          },
        ],
      },
      {
        id: 'l4ErY8cT1K',
        speakerId: 'h2LpN8xQ5A',
        text: '承知[しょうち]しました。こちらがお客様[きゃくさま]の搭乗券[とうじょうけん]です。',
        translation: '好的。這是您的登機證。',
        vocabularyNotes: [
          {
            id: 'o9PdX5jL7M',
            surface: '搭乗券',
            surfaceReading: 'とうじょうけん',
            dictionaryForm: '搭乗券',
            reading: 'とうじょうけん',
            partOfSpeech: 'noun',
            contextualMeaning: '登機證',
            examples: [
              {
                id: 'i3FaK2vN8Q',
                japanese: '搭乗券をなくさないでください。',
                translation: '請不要弄丟登機證。',
              },
            ],
          },
        ],
      },
      {
        id: 'u8CbM6qR3H',
        speakerId: 'h2LpN8xQ5A',
        text: '搭乗[とうじょう]は出発[しゅっぱつ]の三十分前[さんじゅっぷんまえ]から始[はじ]まりますので、時間[じかん]までお待[ま]ちください。',
        translation: '登機將於起飛前三十分鐘開始，請等候至登機時間。',
        vocabularyNotes: [
          {
            id: 'k1XeP9wL4V',
            surface: '搭乗',
            surfaceReading: 'とうじょう',
            dictionaryForm: '搭乗',
            reading: 'とうじょう',
            partOfSpeech: 'noun',
            contextualMeaning: '登機',
            examples: [
              {
                id: 'm6RyQ2dT8J',
                japanese: 'まもなく搭乗が始まります。',
                translation: '即將開始登機。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'n4BwH7kP5S',
            grammarPointId: null,
            pattern: '〜ので',
            shortMeaning: '因為～所以',
            explanation:
              '用來說明原因，語氣比「から」更客觀，也常用於服務場合。',
            anchors: [
              {
                surface: '始まりますので',
              },
            ],
            sourceExample: {
              id: 'q7LvF3rM2E',
              japanese:
                '搭乗は三十分前から始まりますので、時間までお待ちください。',
              translation: '因為登機會在三十分鐘前開始，所以請等候。',
            },
            extraExample: {
              id: 'r2XaC8nV6P',
              japanese: '雨ですので、気をつけてください。',
              translation: '因為下雨，請小心。',
            },
          },
        ],
      },
      {
        id: 'w5NpJ1yK7D',
        speakerId: 'v7KtM3bY9R',
        text: 'ありがとうございます。行[い]ってきます。',
        translation: '謝謝您，我要出發了。',
      },
    ],
  },
  {
    id: 'K8xLm2Qa9P',
    type: 'conversation',
    title: '空港でチェックインする',
    excerpt: '空港で搭乗手続きをする会話です。',
    level: 'n4',
    categories: ['airport', 'travel'],
    coverImage: null,
    sceneDescription:
      '日本の空港でチェックインカウンターへ行き、搭乗手続きをする場面です。',
    participants: [
      {
        id: 'A7mQk3Ls8R',
        name: 'ふふ',
        role: '旅客',
        avatarKey: 'fufu',
      },
      {
        id: 'Y2vNp8Dx5T',
        name: 'シロ',
        role: '地勤人員',
        avatarKey: 'shiro',
      },
    ],
    lines: [
      {
        id: 'r5Hn2Qa7Lp',
        speakerId: 'Y2vNp8Dx5T',
        text: 'お客様[きゃくさま]、こんにちは。本日[ほんじつ]はどちらまでご出発[しゅっぱつ]でしょうか。',
        translation: '您好。請問今天要飛往哪裡呢？',
        vocabularyNotes: [
          {
            id: 'V6kTp9Wa2E',
            surface: '出発',
            surfaceReading: 'しゅっぱつ',
            dictionaryForm: '出発',
            reading: 'しゅっぱつ',
            partOfSpeech: 'noun',
            contextualMeaning: '出發；此處指搭乘班機出發。',
            examples: [
              {
                id: 'e4Kx8Pm1Rt',
                japanese: '飛行機は午後三時に出発します。',
                translation: '飛機下午三點出發。',
              },
            ],
          },
        ],
      },
      {
        id: 't8Lm3Qv6Po',
        speakerId: 'A7mQk3Ls8R',
        text: '台北[たいぺい]までです。チェックインをお願[ねが]いします。',
        translation: '我要去台北，麻煩幫我辦理報到。',
      },
      {
        id: 'u3Px7Mn9Qa',
        speakerId: 'Y2vNp8Dx5T',
        text: 'かしこまりました。パスポートをお預[あず]かりいたします。',
        translation: '好的，我為您辦理。請讓我為您收取護照。',
        vocabularyNotes: [
          {
            id: 'W2nLa6Pf8D',
            surface: 'お預かりいたします',
            surfaceReading: 'おあずかりいたします',
            dictionaryForm: '預かる',
            reading: 'あずかる',
            partOfSpeech: 'verb',
            contextualMeaning: '服務業敬語，表示「先替您保管／收取」。',
            examples: [
              {
                id: 'g5Rt1Xm8Nc',
                japanese: 'お荷物をお預かりいたします。',
                translation: '我先替您保管行李。',
              },
            ],
          },
        ],
      },
      {
        id: 'p9Qs5Lv2Mz',
        speakerId: 'A7mQk3Ls8R',
        text: 'はい、どうぞ。',
        translation: '好的，請。',
      },
      {
        id: 'm7Qa1Tp8Xv',
        speakerId: 'Y2vNp8Dx5T',
        text: 'お荷物[にもつ]はお預[あず]けになりますか。',
        translation: '請問您有需要托運行李嗎？',
        vocabularyNotes: [
          {
            id: 'L8xQv3Mp6T',
            surface: 'お預け',
            surfaceReading: 'おあずけ',
            dictionaryForm: '預け',
            reading: 'あずけ',
            partOfSpeech: 'noun',
            contextualMeaning: '托運（行李）的意思。',
            examples: [
              {
                id: 'q6Nz2Lp5Ra',
                japanese: '荷物を預けます。',
                translation: '我要托運行李。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'G5pLm7Qa2X',
            grammarPointId: null,
            pattern: '〜になりますか',
            shortMeaning: '是否要～',
            explanation:
              '服務業常用的禮貌說法，用來委婉詢問顧客的需求，比直接說「預けますか」更自然。',
            anchors: [
              {
                surface: 'お預けになりますか',
              },
            ],
            sourceExample: {
              id: 'S2mPv8Qk4L',
              japanese: 'お荷物はお預けになりますか。',
              translation: '請問您需要托運行李嗎？',
            },
            extraExample: {
              id: 'E9xLa3Rn7P',
              japanese: 'お飲み物はいかがになさいますか。',
              translation: '請問您想喝點什麼呢？',
            },
          },
        ],
      },
      {
        id: 'x4Mv8Qa2Lp',
        speakerId: 'A7mQk3Ls8R',
        text: 'スーツケースを一[ひと]つお願[ねが]いします。',
        translation: '我要托運一個行李箱。',
      },
      {
        id: 'd8Qa6Lm3Xt',
        speakerId: 'Y2vNp8Dx5T',
        text: 'ありがとうございます。重量[じゅうりょう]は問題[もんだい]ございません。',
        translation: '謝謝您。重量沒有問題。',
        vocabularyNotes: [
          {
            id: 'C4mQa7Lv9R',
            surface: '重量',
            surfaceReading: 'じゅうりょう',
            dictionaryForm: '重量',
            reading: 'じゅうりょう',
            partOfSpeech: 'noun',
            contextualMeaning: '重量。',
            examples: [
              {
                id: 'N6pRt2Xa5Q',
                japanese: '荷物の重量を量ります。',
                translation: '測量行李重量。',
              },
            ],
          },
        ],
      },
      {
        id: 'w6Tp1Qa8Lm',
        speakerId: 'Y2vNp8Dx5T',
        text: 'こちらが搭乗券[とうじょうけん]でございます。搭乗口[とうじょうぐち]は十五番[じゅうごばん]です。',
        translation: '這是您的登機證。登機門是15號。',
        vocabularyNotes: [
          {
            id: 'P7kLm3Qa9T',
            surface: '搭乗券',
            surfaceReading: 'とうじょうけん',
            dictionaryForm: '搭乗券',
            reading: 'とうじょうけん',
            partOfSpeech: 'noun',
            contextualMeaning: '登機證。',
            examples: [
              {
                id: 'B8vQa5Lp2R',
                japanese: '搭乗券を見せてください。',
                translation: '請出示登機證。',
              },
            ],
          },
          {
            id: 'F2xMp6Qa8L',
            surface: '搭乗口',
            surfaceReading: 'とうじょうぐち',
            dictionaryForm: '搭乗口',
            reading: 'とうじょうぐち',
            partOfSpeech: 'noun',
            contextualMeaning: '登機門。',
            examples: [
              {
                id: 'R3nQa9Xt5P',
                japanese: '搭乗口は三番です。',
                translation: '登機門是3號。',
              },
            ],
          },
        ],
      },
      {
        id: 'j2Lm8Qa5Pv',
        speakerId: 'A7mQk3Ls8R',
        text: '出発[しゅっぱつ]は何時[なんじ]ですか。',
        translation: '請問幾點起飛呢？',
      },
      {
        id: 'h7Qa4Mp1Ls',
        speakerId: 'Y2vNp8Dx5T',
        text: '午後[ごご]二時[にじ]の予定[よてい]でございます。ご搭乗[とうじょう]は三十分前[さんじゅっぷんまえ]までにお願[ねが]いいたします。',
        translation: '預計下午兩點起飛，請於起飛前三十分鐘前完成登機。',
        vocabularyNotes: [
          {
            id: 'T5mQa8Lp3V',
            surface: '予定',
            surfaceReading: 'よてい',
            dictionaryForm: '予定',
            reading: 'よてい',
            partOfSpeech: 'noun',
            contextualMeaning: '預定、預計。',
            examples: [
              {
                id: 'X2pRt6Qa1L',
                japanese: '予定より早く着きました。',
                translation: '比預定更早抵達。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'U9vQa3Lm8P',
            grammarPointId: null,
            pattern: '〜までに',
            shortMeaning: '在～之前',
            explanation:
              '表示期限，在某個時間點以前完成某件事情，日常生活與通知都很常使用。',
            anchors: [
              {
                surface: '三十分前までに',
              },
            ],
            sourceExample: {
              id: 'Z8mQa2Lp6R',
              japanese: 'ご搭乗は三十分前までにお願いいたします。',
              translation: '請於三十分鐘前完成登機。',
            },
            extraExample: {
              id: 'Q4xLm9Pa2N',
              japanese: '九時までに来てください。',
              translation: '請在九點以前到。',
            },
          },
        ],
      },
      {
        id: 'n5Qa7Lm4Xt',
        speakerId: 'A7mQk3Ls8R',
        text: 'ありがとうございます。',
        translation: '謝謝您。',
      },
    ],
  },
  {
    id: 'K8vQ2mT7xLp',
    type: 'conversation',
    title: '空港でチェックインする',
    excerpt: '空港のカウンターで荷物を預け、飛行機に乗る準備をする会話です。',
    level: 'n4',
    categories: ['airport', 'travel'],
    coverImage: null,
    sceneDescription:
      '空港の航空会社カウンターで、地上係員にパスポートを見せてチェックインする場面です。',
    participants: [
      {
        id: 'pR4nX8cL2Vz',
        name: 'ふふ',
        role: '客人',
        avatarKey: 'fufu',
      },
      {
        id: 'Y6tM3qW9bKs',
        name: 'シロ',
        role: '地勤人員',
        avatarKey: 'shiro',
      },
    ],
    lines: [
      {
        id: 'aT7kP2vN8Qm',
        speakerId: 'Y6tM3qW9bKs',
        text: 'お待[ま]たせいたしました。本日[ほんじつ]はどちらまででしょうか。',
        translation: '讓您久等了。請問您今天要前往哪裡？',
        vocabularyNotes: [
          {
            id: 'uC5xR9mL3Wp',
            surface: '本日',
            surfaceReading: 'ほんじつ',
            dictionaryForm: '本日',
            reading: 'ほんじつ',
            partOfSpeech: 'noun',
            contextualMeaning: '今日；較正式的說法，常用於服務業或商務場合',
            examples: [
              {
                id: 'dN8qV2tK6Ms',
                japanese: '本日は午後六時まで営業しております。',
                translation: '今天營業至下午六點。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'gL4pX7cQ9Vr',
            grammarPointId: null,
            pattern: '〜まででしょうか',
            shortMeaning: '請問要到哪裡？',
            explanation:
              '用「でしょうか」柔和而有禮貌地詢問目的地。航空公司櫃檯常以「どちらまででしょうか」確認旅客要前往的城市。',
            anchors: [{ surface: 'どちらまででしょうか' }],
            sourceExample: {
              id: 'eM3wT8nR5Kb',
              japanese: '本日はどちらまででしょうか。',
              translation: '請問您今天要前往哪裡？',
            },
            extraExample: {
              id: 'fQ9vC2xP7Ls',
              japanese: 'タクシーでどちらまででしょうか。',
              translation: '請問搭計程車要到哪裡？',
            },
          },
        ],
      },
      {
        id: 'zW2mK8rT5Nc',
        speakerId: 'pR4nX8cL2Vz',
        text: '台北[たいぺい]までです。こちらがパスポートです。',
        translation: '我要去台北。這是我的護照。',
      },
      {
        id: 'hP6vQ3nM9Xt',
        speakerId: 'Y6tM3qW9bKs',
        text: 'パスポートをお預[あず]かりいたします。お荷物[にもつ]はお預[あず]けになりますか。',
        translation: '我先保管您的護照。請問您有行李要託運嗎？',
        vocabularyNotes: [
          {
            id: 'sK8tL4xV2Qn',
            surface: '預かり',
            surfaceReading: 'あずかり',
            dictionaryForm: '預かる',
            reading: 'あずかる',
            partOfSpeech: 'verb',
            contextualMeaning:
              '代為保管；此處用於「お預かりいたします」的謙讓表達',
            examples: [
              {
                id: 'jR5mW9pC3Vk',
                japanese: 'フロントで荷物を預かります。',
                translation: '櫃檯會代為保管行李。',
              },
            ],
          },
          {
            id: 'bX7qN2tM6Lp',
            surface: '荷物',
            surfaceReading: 'にもつ',
            dictionaryForm: '荷物',
            reading: 'にもつ',
            partOfSpeech: 'noun',
            contextualMeaning: '行李；旅行時攜帶或託運的物品',
            examples: [
              {
                id: 'nV4cP8xQ2Ts',
                japanese: '荷物をホテルに置いてきました。',
                translation: '我把行李放在飯店了。',
              },
            ],
          },
        ],
      },
      {
        id: 'cM9rT5kX2Vq',
        speakerId: 'pR4nX8cL2Vz',
        text: 'はい、このスーツケースを一[ひと]つお願[ねが]いします。機内[きない]には小[ちい]さいバッグを持[も]っていきます。',
        translation: '好的，麻煩託運這一個行李箱。我會把小包包帶進機艙。',
        vocabularyNotes: [
          {
            id: 'qT3xL7mP9Wc',
            surface: '機内',
            surfaceReading: 'きない',
            dictionaryForm: '機内',
            reading: 'きない',
            partOfSpeech: 'noun',
            contextualMeaning: '飛機內部、機艙內',
            examples: [
              {
                id: 'vN8kR2qM5Xs',
                japanese: '機内では携帯電話を機内モードにしてください。',
                translation: '在機艙內請將手機設為飛航模式。',
              },
            ],
          },
        ],
      },
      {
        id: 'rQ5nV8cT3Km',
        speakerId: 'Y6tM3qW9bKs',
        text: 'かしこまりました。スーツケースをこちらに載[の]せていただけますか。',
        translation: '好的。可以請您把行李箱放到這裡嗎？',
        vocabularyNotes: [
          {
            id: 'mC2pX9tL6Vr',
            surface: '載せて',
            surfaceReading: 'のせて',
            dictionaryForm: '載せる',
            reading: 'のせる',
            partOfSpeech: 'verb',
            contextualMeaning:
              '放到某個平面或設備上；此處指把行李放上磅秤或輸送帶',
            examples: [
              {
                id: 'wK7vN3qR8Pt',
                japanese: '箱を台の上に載せてください。',
                translation: '請把箱子放在台子上。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'xV8mQ4pT2Ln',
            grammarPointId: null,
            pattern: '〜ていただけますか',
            shortMeaning: '可以請您～嗎？',
            explanation:
              '用來禮貌地請對方做某件事，比「〜てください」更加客氣，常見於服務業與正式場合。',
            anchors: [{ surface: '載せていただけますか' }],
            sourceExample: {
              id: 'kP3tW7cM9Xq',
              japanese: 'スーツケースをこちらに載せていただけますか。',
              translation: '可以請您把行李箱放到這裡嗎？',
            },
            extraExample: {
              id: 'tL6qR2vN8Cs',
              japanese: 'こちらにお名前を書いていただけますか。',
              translation: '可以請您在這裡寫下姓名嗎？',
            },
          },
        ],
      },
      {
        id: 'nX4kP7mV9Qt',
        speakerId: 'pR4nX8cL2Vz',
        text: 'はい。重[おも]さは大丈夫[だいじょうぶ]でしょうか。',
        translation: '好的。重量沒有超過限制嗎？',
        vocabularyNotes: [
          {
            id: 'pM8vT3xC5Lq',
            surface: '重さ',
            surfaceReading: 'おもさ',
            dictionaryForm: '重さ',
            reading: 'おもさ',
            partOfSpeech: 'noun',
            contextualMeaning: '重量；由形容詞「重い」形成的名詞',
            examples: [
              {
                id: 'cR2nK9wQ6Vt',
                japanese: '荷物の重さを量ります。',
                translation: '測量行李的重量。',
              },
            ],
          },
        ],
      },
      {
        id: 'vT9qL3xM6Pr',
        speakerId: 'Y6tM3qW9bKs',
        text: '十八[じゅうはち]キロですので、問題[もんだい]ございません。壊[こわ]れやすい物[もの]や貴重品[きちょうひん]は入[はい]っていませんか。',
        translation: '是十八公斤，因此沒有問題。裡面沒有易碎物品或貴重物品嗎？',
        vocabularyNotes: [
          {
            id: 'fK5mX8qT2Nc',
            surface: '壊れやすい',
            surfaceReading: 'こわれやすい',
            dictionaryForm: '壊れる',
            reading: 'こわれる',
            partOfSpeech: 'verb',
            contextualMeaning: '容易損壞；「〜やすい」表示容易發生某動作或狀態',
            examples: [
              {
                id: 'yQ7pL3vR9Mt',
                japanese: 'このコップは薄くて壊れやすいです。',
                translation: '這個杯子很薄，容易破掉。',
              },
            ],
          },
          {
            id: 'rC8tN4mX2Vp',
            surface: '貴重品',
            surfaceReading: 'きちょうひん',
            dictionaryForm: '貴重品',
            reading: 'きちょうひん',
            partOfSpeech: 'noun',
            contextualMeaning: '貴重物品，例如現金、護照、珠寶或電子產品',
            examples: [
              {
                id: 'aV6xP9kM3Qs',
                japanese: '貴重品は自分で持ってください。',
                translation: '貴重物品請自行攜帶。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'dP4qT8vL2Xn',
            grammarPointId: null,
            pattern: '〜やすい',
            shortMeaning: '容易～',
            explanation:
              '接在動詞ます形去掉「ます」之後，表示某個動作容易發生，或某件事做起來較容易。',
            anchors: [{ surface: '壊れやすい' }],
            sourceExample: {
              id: 'mW9cR3tK7Vq',
              japanese: '壊れやすい物は入っていませんか。',
              translation: '裡面沒有容易損壞的物品嗎？',
            },
            extraExample: {
              id: 'qN2xL8pT5Cs',
              japanese: 'この説明は分かりやすいです。',
              translation: '這個說明很容易理解。',
            },
          },
        ],
      },
      {
        id: 'kL3mV7qX9Tc',
        speakerId: 'pR4nX8cL2Vz',
        text: 'いいえ、入[はい]っていません。ノートパソコンは機内[きない]に持[も]ち込[こ]んでもいいですか。',
        translation: '沒有。筆記型電腦可以帶進機艙嗎？',
        vocabularyNotes: [
          {
            id: 'tQ8nC2vM6Xp',
            surface: '持ち込んで',
            surfaceReading: 'もちこんで',
            dictionaryForm: '持ち込む',
            reading: 'もちこむ',
            partOfSpeech: 'verb',
            contextualMeaning: '帶入某個場所；此處指把物品帶進機艙',
            examples: [
              {
                id: 'pX5rK9mL3Vt',
                japanese: '飲み物を教室に持ち込まないでください。',
                translation: '請不要把飲料帶進教室。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'nM7vQ3tC8Lx',
            grammarPointId: null,
            pattern: '〜てもいいですか',
            shortMeaning: '可以～嗎？',
            explanation:
              '用來詢問是否允許做某件事。日常對話中很常見，正式場合也可以使用。',
            anchors: [{ surface: '持ち込んでもいいですか' }],
            sourceExample: {
              id: 'cT4qP8xN2Vr',
              japanese: 'ノートパソコンは機内に持ち込んでもいいですか。',
              translation: '筆記型電腦可以帶進機艙嗎？',
            },
            extraExample: {
              id: 'vL9mK3rQ6Xs',
              japanese: 'ここで写真を撮ってもいいですか。',
              translation: '可以在這裡拍照嗎？',
            },
          },
        ],
      },
      {
        id: 'wP6xR2nT8Mq',
        speakerId: 'Y6tM3qW9bKs',
        text: 'はい、機内[きない]にお持[も]ちください。お座席[ざせき]は通路側[つうろがわ]と窓側[まどがわ]のどちらがよろしいでしょうか。',
        translation: '可以，請您帶進機艙。座位想要靠走道還是靠窗呢？',
        vocabularyNotes: [
          {
            id: 'xR3mV7kQ9Lt',
            surface: '通路側',
            surfaceReading: 'つうろがわ',
            dictionaryForm: '通路側',
            reading: 'つうろがわ',
            partOfSpeech: 'noun',
            contextualMeaning: '靠走道的一側；在飛機或列車上指走道座位',
            examples: [
              {
                id: 'lN8qT2pC5Vx',
                japanese: '通路側の席を予約しました。',
                translation: '我預約了靠走道的座位。',
              },
            ],
          },
          {
            id: 'bV5tM9xK3Qr',
            surface: '窓側',
            surfaceReading: 'まどがわ',
            dictionaryForm: '窓側',
            reading: 'まどがわ',
            partOfSpeech: 'noun',
            contextualMeaning: '靠窗的一側；指飛機或列車上的靠窗座位',
            examples: [
              {
                id: 'sQ2xP7nR8Lc',
                japanese: '窓側から海が見えました。',
                translation: '從靠窗的位置看到了海。',
              },
            ],
          },
        ],
      },
      {
        id: 'mV8tQ4pX2Kn',
        speakerId: 'pR4nX8cL2Vz',
        text: '窓側[まどがわ]をお願[ねが]いします。できれば前[まえ]のほうがいいです。',
        translation: '麻煩給我靠窗的位置。可以的話，希望是前面一點。',
        grammarNotes: [
          {
            id: 'qC6nT9vL3Xp',
            grammarPointId: null,
            pattern: 'できれば〜',
            shortMeaning: '可以的話，希望～',
            explanation:
              '用來客氣地提出希望或條件，語氣比直接要求柔和，表示無法做到也可以接受。',
            anchors: [{ surface: 'できれば' }],
            sourceExample: {
              id: 'rP4mX8qK2Vt',
              japanese: 'できれば前のほうがいいです。',
              translation: '可以的話，希望是前面一點。',
            },
            extraExample: {
              id: 'kT7vN3cQ9Ls',
              japanese: 'できれば午前中に来てください。',
              translation: '可以的話，請在上午過來。',
            },
          },
        ],
      },
      {
        id: 'tN2qL9mV5Xc',
        speakerId: 'Y6tM3qW9bKs',
        text: '承知[しょうち]いたしました。前方[ぜんぽう]の窓側[まどがわ]をご用意[ようい]いたします。',
        translation: '了解。我會為您安排前方的靠窗座位。',
        vocabularyNotes: [
          {
            id: 'vQ7mC3xT8Lp',
            surface: '前方',
            surfaceReading: 'ぜんぽう',
            dictionaryForm: '前方',
            reading: 'ぜんぽう',
            partOfSpeech: 'noun',
            contextualMeaning: '前方、前面的方向；此處指機艙較前面的區域',
            examples: [
              {
                id: 'nK5tR9qM2Vx',
                japanese: '駅はこの道の前方にあります。',
                translation: '車站在這條路的前方。',
              },
            ],
          },
        ],
      },
      {
        id: 'xC7pR3vM9Qt',
        speakerId: 'Y6tM3qW9bKs',
        text: 'こちらが搭乗券[とうじょうけん]とお荷物[にもつ]の控[ひか]えでございます。搭乗口[とうじょうぐち]は二十五番[にじゅうごばん]で、出発時刻[しゅっぱつじこく]は午後[ごご]三時[さんじ]二十分[にじゅっぷん]です。',
        translation:
          '這是您的登機證與行李收據。登機門是二十五號，起飛時間是下午三點二十分。',
        vocabularyNotes: [
          {
            id: 'pL4xT8nQ2Vc',
            surface: '搭乗券',
            surfaceReading: 'とうじょうけん',
            dictionaryForm: '搭乗券',
            reading: 'とうじょうけん',
            partOfSpeech: 'noun',
            contextualMeaning: '登機證；搭乘飛機時用來確認航班與座位的票券',
            examples: [
              {
                id: 'cV9mR3tK7Xq',
                japanese: '搭乗券を係員に見せてください。',
                translation: '請向工作人員出示登機證。',
              },
            ],
          },
          {
            id: 'mT6qP2xN8Lr',
            surface: '搭乗口',
            surfaceReading: 'とうじょうぐち',
            dictionaryForm: '搭乗口',
            reading: 'とうじょうぐち',
            partOfSpeech: 'noun',
            contextualMeaning: '登機門；旅客搭乘飛機前集合並登機的入口',
            examples: [
              {
                id: 'qX3vK7mC9Pt',
                japanese: '搭乗口が変更になりました。',
                translation: '登機門已經變更。',
              },
            ],
          },
        ],
      },
      {
        id: 'qK5mT8vX3Nc',
        speakerId: 'pR4nX8cL2Vz',
        text: '搭乗口[とうじょうぐち]には何時[なんじ]までに行[い]けばいいですか。',
        translation: '我最晚幾點前到登機門就可以呢？',
        grammarNotes: [
          {
            id: 'wN8xQ4pL2Vr',
            grammarPointId: null,
            pattern: '〜ばいいですか',
            shortMeaning: '怎麼做才好？',
            explanation:
              '向對方詢問適合的方法、時間或做法，相當於「要怎麼做才好呢」。',
            anchors: [{ surface: '行けばいいですか' }],
            sourceExample: {
              id: 'dC3tM9qX6Lp',
              japanese: '搭乗口には何時までに行けばいいですか。',
              translation: '我最晚幾點前到登機門就可以呢？',
            },
            extraExample: {
              id: 'rV7nK2xT5Qs',
              japanese: 'この書類はどこに出せばいいですか。',
              translation: '這份文件要交到哪裡才好呢？',
            },
          },
        ],
      },
      {
        id: 'lR9vC3mT7Xq',
        speakerId: 'Y6tM3qW9bKs',
        text: '午後[ごご]二時[にじ]五十分[ごじゅっぷん]までにお越[こ]しください。保安検査場[ほあんけんさじょう]が混[こ]むこともございますので、お早[はや]めにお進[すす]みください。',
        translation:
          '請在下午兩點五十分前抵達。安檢區有時會很擁擠，請提早前往。',
        vocabularyNotes: [
          {
            id: 'yM4qX8tP2Vc',
            surface: '保安検査場',
            surfaceReading: 'ほあんけんさじょう',
            dictionaryForm: '保安検査場',
            reading: 'ほあんけんさじょう',
            partOfSpeech: 'noun',
            contextualMeaning:
              '機場的安全檢查區，旅客需在此接受隨身行李與身體檢查',
            examples: [
              {
                id: 'kC7pN3vR9Lt',
                japanese: '保安検査場では搭乗券が必要です。',
                translation: '在安檢區需要出示登機證。',
              },
            ],
          },
          {
            id: 'tV6mQ2xK8Pr',
            surface: '混む',
            surfaceReading: 'こむ',
            dictionaryForm: '混む',
            reading: 'こむ',
            partOfSpeech: 'verb',
            contextualMeaning: '擁擠、人多；常用於交通工具、道路、店家或機場',
            examples: [
              {
                id: 'pQ9xL4nC2Vs',
                japanese: '朝の電車はとても混みます。',
                translation: '早上的電車非常擁擠。',
              },
            ],
          },
        ],
        grammarNotes: [
          {
            id: 'cX3rT8mV5Qn',
            grammarPointId: null,
            pattern: '〜こともある',
            shortMeaning: '有時也會～',
            explanation:
              '表示某種情況偶爾可能發生。此處使用正式服務敬語「〜こともございます」。',
            anchors: [{ surface: '混むこともございます' }],
            sourceExample: {
              id: 'vP7mK2qN9Xt',
              japanese: '保安検査場が混むこともございます。',
              translation: '安檢區有時也會很擁擠。',
            },
            extraExample: {
              id: 'nL5tQ8xR3Cs',
              japanese: '電車が遅れることもあります。',
              translation: '電車有時也會誤點。',
            },
          },
        ],
      },
      {
        id: 'bT8qM2vX6Pk',
        speakerId: 'pR4nX8cL2Vz',
        text: '分[わ]かりました。どうもありがとうございました。',
        translation: '我知道了。非常感謝。',
      },
    ],
  },
]
