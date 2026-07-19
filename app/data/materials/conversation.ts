import type { ConversationMaterial } from '~/types/conversation'

export const conversationMaterials: ConversationMaterial[] = [
  {
    id: 'C7Km3pQx92Ab',
    type: 'conversation',
    title: '電話で席を予約する',
    excerpt: '希望時間、人數與座位需求を伝えるレストラン予約の会話です。',
    level: 'n4',
    categories: ['restaurant', 'reservation'],
    coverImage: '/conversation-restaurant-reservation.png',
    sceneDescription: 'レストランに電話をして、二人分の席を予約する場面です。',
    participants: [
      {
        id: 'CvCh1mP8qR4tN',
        name: 'ふふ',
        role: '客人',
        avatarKey: 'fufu',
      },
      {
        id: 'CvCh2xK6vD9sL',
        name: 'シロ',
        role: '店員',
        avatarKey: 'shiro',
      },
    ],
    lines: [
      {
        id: 'CvLn1qT7mN3pH',
        speakerId: 'CvCh2xK6vD9sL',
        japanese: 'お電話ありがとうございます。さくらレストランでございます。',
        translation: '感謝您的來電，這裡是櫻花餐廳。',
        segments: [
          { id: 'CvA1mR8xK4tV', text: 'お' },
          {
            id: 'CvA2pL5nQ9sD',
            text: '電話',
            ruby: 'でんわ',
            vocabularyNoteId: 'CvVw2Rt7Km4P',
          },
          {
            id: 'CvA3cH6vB1qF',
            text: 'ありがとうございます',
            grammarNoteId: 'CvGr3Np8Xq5L',
          },
          { id: 'CvA4wT9mD2kR', text: '。さくらレストランでございます。' },
        ],
      },
      {
        id: 'CvLn2kV5pC8xM',
        speakerId: 'CvCh1mP8qR4tN',
        japanese: '明日の七時に、二人で窓側の席を予約したいのですが。',
        translation: '我想預約明天七點、兩位、靠窗的座位。',
        segments: [
          { id: 'CvB1nQ4tL7vA', text: '明日', ruby: 'あした' },
          { id: 'CvB2mF8xP3sK', text: 'の七時に、二人で窓側の席を' },
          {
            id: 'CvB3rD6kN9qT',
            text: '予約',
            ruby: 'よやく',
            vocabularyNoteId: 'CvVw5Lm9Qa2N',
          },
          {
            id: 'CvB4cV1pH7mR',
            text: 'したいのですが',
            grammarNoteId: 'CvGr6Tw1Mk9C',
          },
          { id: 'CvB5xS3nK8qP', text: '。' },
        ],
      },
      {
        id: 'CvLn3mH9qF2tR',
        speakerId: 'CvCh2xK6vD9sL',
        japanese: 'かしこまりました。お名前をお願いいたします。',
        translation: '了解，請問您的姓名。',
        segments: [
          { id: 'CvC1pT7vN4kL', text: 'かしこまりました。お' },
          { id: 'CvC2wQ5mD8xA', text: '名前', ruby: 'なまえ' },
          { id: 'CvC3nR2kH6sV', text: 'をお願いいたします。' },
        ],
      },
      {
        id: 'CvLn4vK1mP7qD',
        speakerId: 'CvCh1mP8qR4tN',
        japanese: 'ふふです。よろしくお願いします。',
        translation: '我是ふふ，麻煩您了。',
        segments: [
          { id: 'CvD1mX8tQ3pF', text: 'ふふです。よろしくお願いします。' },
        ],
      },
      {
        id: 'CvLn5cN8wL2sT',
        speakerId: 'CvCh2xK6vD9sL',
        japanese: 'ご予約の時間は明日の七時で承りました。',
        translation: '已為您登記預約時間為明天七點。',
        segments: [
          { id: 'CvE1qP5mV9kR', text: 'ご' },
          { id: 'CvE2tL7nC3xH', text: '予約', ruby: 'よやく' },
          { id: 'CvE3sD1wQ8pN', text: 'の時間は明日の七時で' },
          {
            id: 'CvE4mK6vF2tA',
            text: '承りました',
            parts: [
              { text: '承', ruby: 'うけたまわ' },
              { text: 'りました' },
            ],
          },
          { id: 'CvE5xR9qH4nP', text: '。' },
        ],
      },
      {
        id: 'CvLn6pF3mT8vQ',
        speakerId: 'CvCh1mP8qR4tN',
        japanese: 'ありがとうございます。それでは、明日お願いします。',
        translation: '謝謝，那麼明天麻煩您了。',
        segments: [
          { id: 'CvF1nV7kC2qM', text: 'ありがとうございます。それでは、' },
          { id: 'CvF2tP4xL9sD', text: '明日', ruby: 'あした' },
          { id: 'CvF3mQ8vR1kH', text: 'お願いします。' },
        ],
      },
    ],
    vocabularyNotes: [
      {
        id: 'CvVw2Rt7Km4P',
        lexemeId: 'LxDn8Qp3Vm6T',
        surface: '電話',
        reading: 'でんわ',
        contextualMeaning: '電話；本文指打電話向餐廳訂位。',
        examples: [
          {
            id: 'CvVe1pM5xT8qN',
            japanese: 'あとで電話します。',
            translation: '晚點打電話。',
          },
          {
            id: 'CvVe2kR7vC3mL',
            japanese: '電話番号を教えてください。',
            translation: '請告訴我電話號碼。',
          },
        ],
      },
      {
        id: 'CvVw5Lm9Qa2N',
        lexemeId: 'LxYk4Nw7Ps1C',
        surface: '予約',
        reading: 'よやく',
        contextualMeaning: '預約、預訂；本文指事先預留餐廳座位。',
        examples: [
          {
            id: 'CvVe3tH8mQ4pD',
            japanese: 'ホテルを予約しました。',
            translation: '預約了飯店。',
          },
          {
            id: 'CvVe4nK2vL6xR',
            japanese: '予約の時間を変更できますか。',
            translation: '可以更改預約時間嗎？',
          },
        ],
      },
    ],
    grammarNotes: [
      {
        id: 'CvGr3Np8Xq5L',
        grammarPointId: 'GpN5wT2mK7vR',
        pattern: '〜ありがとうございます',
        shortExplanation: '用來對對方的行為表達感謝；服務業常在接電話或接待時使用。',
        sourceSentenceId: 'CvLn1qT7mN3pH',
        sourceExample: {
          id: 'CvGe1mQ6tP9xH',
          japanese: 'お電話ありがとうございます。',
          translation: '感謝您的來電。',
        },
        extraExample: {
          id: 'CvGe2kV4nR8sL',
          japanese: 'ご来店ありがとうございます。',
          translation: '感謝您的光臨。',
        },
      },
      {
        id: 'CvGr6Tw1Mk9C',
        grammarPointId: 'GpN4cH8qL3pV',
        pattern: '〜たいのですが',
        shortExplanation: '委婉表達自己的希望，並期待對方回應或提供協助。',
        sourceSentenceId: 'CvLn2kV5pC8xM',
        sourceExample: {
          id: 'CvGe3pD7mT2qN',
          japanese: '二人で予約したいのですが。',
          translation: '我想預約兩位。',
        },
        extraExample: {
          id: 'CvGe4xK5vF9nR',
          japanese: '時間を変更したいのですが。',
          translation: '我想更改時間。',
        },
      },
    ],
  },
]
