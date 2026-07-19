import type { ReadingMaterial } from '~/types/reading'

export const readingMaterials: ReadingMaterial[] = [
  {
    id: 'V1StGXR8Z5jd',
    type: 'reading',
    title: '日本の四季を楽しもう',
    excerpt: '桜、夏祭り、紅葉、雪景色から、日本の季節ごとの楽しみ方を読みます。',
    level: 'n5',
    categories: ['culture', 'travel'],
    coverImage: '/reading-japanese-seasons.png',
    paragraphs: [
      {
        id: 'RdP8kM2xQ5aN',
        sentences: [
          {
            id: 'RdS1wF7cL3pT',
            japanese: '日本には四つの季節があり、それぞれの景色や食べ物を楽しめるようになります。',
            translation: '日本有四個季節，每個季節都能欣賞不同的景色與食物。',
            segments: [
              { id: 'RdA1qZ8mN4vC', text: '日本', ruby: 'にほん' },
              { id: 'RdA2pL6tH9xK', text: 'には' },
              { id: 'RdA3rB5wS2jM', text: '四つ', ruby: 'よっつ' },
              { id: 'RdA4nD7yQ1fV', text: 'の' },
              { id: 'RdA5kT3cP8sR', text: '季節', ruby: 'きせつ' },
              { id: 'RdA6mX9aG4hW', text: 'があり、それぞれの' },
              { id: 'RdA7vJ2eK6qB', text: '景色', ruby: 'けしき' },
              { id: 'RdA8cN5uL1tF', text: 'や' },
              { id: 'RdA9hR7pD3xS', text: '食べ物', ruby: 'たべもの' },
              { id: 'RdA0wM4kV8nQ', text: 'を楽しめる' },
              {
                id: 'RdG1bP6zT2cH',
                text: 'ようになります',
                grammarNoteId: 'RdGr7Yp2Lm9Q',
              },
              { id: 'RdAq3F8sK5vN', text: '。' },
            ],
          },
          {
            id: 'RdS2mQ9vB4xK',
            japanese: '春になると桜が咲き、公園には多くの人が集まります。',
            translation: '春天一到櫻花盛開，許多人會聚集在公園裡。',
            segments: [
              { id: 'RdB1tL5nC8qR', text: '春', ruby: 'はる' },
              { id: 'RdB2xP7mV3kD', text: 'になると' },
              {
                id: 'RdB3cH9wF1sJ',
                text: '桜',
                ruby: 'さくら',
                vocabularyNoteId: 'RdVw4Kp8Nx2M',
              },
              { id: 'RdB4qT6aL9vG', text: 'が咲き、' },
              { id: 'RdB5mR2yD7pW', text: '公園', ruby: 'こうえん' },
              { id: 'RdB6nS8kQ3xF', text: 'には多くの人が集まります。' },
            ],
          },
          {
            id: 'RdS3pT6nH8cQ',
            japanese: '夏には各地で夏祭りが開かれ、浴衣を着た人々が屋台の食べ物や夜空の花火を楽しみます。',
            translation: '夏天日本各地會舉辦夏季祭典，穿著浴衣的人們會享受攤販美食與夜空中的煙火。',
            segments: [
              { id: 'RdC1vK4mB7qN', text: '夏', ruby: 'なつ' },
              { id: 'RdC2sF9xL5pR', text: 'には各地で' },
              {
                id: 'RdC3hW2tD8nM',
                text: '夏祭り',
                ruby: 'なつまつり',
                vocabularyNoteId: 'RdVw6Ts3Qa7L',
              },
              { id: 'RdC4aP1yV9kG', text: 'が開かれ、' },
              { id: 'RdC5rN7cH3wX', text: '浴衣', ruby: 'ゆかた' },
              { id: 'RdC6mQ8bF2sJ', text: 'を着た人々が屋台の食べ物や夜空の' },
              { id: 'RdC7tL4pK6vD', text: '花火', ruby: 'はなび' },
              { id: 'RdC8xR5nM1qT', text: 'を楽しみます。' },
            ],
          },
        ],
      },
      {
        id: 'RdP3cT9mK6xV',
        sentences: [
          {
            id: 'RdS4qN1wL7pF',
            japanese: '秋になると山や寺の木々が赤や黄色に変わり、美しい紅葉を見に出かける人が増えます。',
            translation: '秋天山林與寺院周圍的樹木轉為紅色和黃色，出門欣賞美麗紅葉的人也會增加。',
            segments: [
              { id: 'RdD1kV8mQ4sH', text: '秋', ruby: 'あき' },
              { id: 'RdD2pC6tN9xR', text: 'になると山や寺の木々が赤や黄色に変わり、美しい' },
              { id: 'RdD3wF2aL7qM', text: '紅葉', ruby: 'こうよう' },
              { id: 'RdD4nT5vB1kP', text: 'を見に出かける人が増えます。' },
            ],
          },
          {
            id: 'RdS5rD8kM2vA',
            japanese: '冬の雪が多い地域では、静かな雪景色を眺めたり、温泉で冷えた体を温めたりできます。',
            translation: '冬季積雪較多的地區能欣賞寧靜的雪景，也能泡溫泉暖和冰冷的身體。',
            segments: [
              { id: 'RdE1mH7xQ3pL', text: '冬', ruby: 'ふゆ' },
              { id: 'RdE2cK5nV8tS', text: 'の雪が多い地域では、静かな' },
              { id: 'RdE3qR9wF4aN', text: '雪景色', ruby: 'ゆきげしき' },
              {
                id: 'RdE4vP2mD6kT',
                text: 'を眺めたり、温泉で冷えた体を温めたりできます',
                grammarNoteId: 'RdGr5Cv8Rt1X',
              },
              { id: 'RdE5sL1bH7qW', text: '。' },
            ],
          },
          {
            id: 'RdS6xJ4pT9nC',
            japanese: '季節の変化を知ることは、日本の文化を理解するきっかけにもなります。',
            translation: '了解季節的變化，也會成為理解日本文化的契機。',
            segments: [
              { id: 'RdF1tQ6mK3vB', text: '季節', ruby: 'きせつ' },
              { id: 'RdF2nD8xL5pR', text: 'の変化を知ることは、' },
              { id: 'RdF3cW1qT7mH', text: '日本', ruby: 'にほん' },
              { id: 'RdF4kP9vN2sA', text: 'の文化を理解するきっかけにもなります。' },
            ],
          },
        ],
      },
    ],
    translation: [
      '日本有春、夏、秋、冬四個季節，每個季節都能欣賞不同的景色與食物。春天一到櫻花盛開，許多人會聚集在公園裡賞花。',
      '夏天日本各地會舉辦夏季祭典。穿著浴衣的人們可以品嚐攤販美食，並欣賞點亮夜空的煙火。',
      '秋天可以欣賞紅葉，冬天則能看見寧靜的雪景並享受溫泉。了解季節的變化，也是認識日本文化的好機會。',
    ],
    vocabularyNotes: [
      {
        id: 'RdVw4Kp8Nx2M',
        lexemeId: 'LxSk7Pq3Vm8N',
        surface: '桜',
        reading: 'さくら',
        contextualMeaning: '櫻花；本文指春季盛開、常被觀賞的日本櫻花。',
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
      {
        id: 'RdVw6Ts3Qa7L',
        lexemeId: 'LxNm5Rk9Bw2D',
        surface: '夏祭り',
        reading: 'なつまつり',
        contextualMeaning: '夏季祭典；日本夏天常見、有攤販與煙火的節慶活動。',
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
    grammarNotes: [
      {
        id: 'RdGr7Yp2Lm9Q',
        grammarPointId: 'GpN5cT8vK3mR',
        pattern: '〜ようになる',
        shortExplanation: '表示能力、狀態或習慣產生變化，相當於中文的「變得會……／開始變成……」。',
        sourceSentenceId: 'RdS1wF7cL3pT',
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
      {
        id: 'RdGr5Cv8Rt1X',
        grammarPointId: 'GpN4mW2qF7pA',
        pattern: '〜たり、〜たりする',
        shortExplanation: '列舉數個代表性的動作或狀態，表示「做做……、做做……之類的事情」。',
        sourceSentenceId: 'RdS5rD8kM2vA',
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
]
