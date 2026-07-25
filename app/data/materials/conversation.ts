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
]
