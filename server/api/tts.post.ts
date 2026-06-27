import textToSpeech from '@google-cloud/text-to-speech'

const client = new textToSpeech.TextToSpeechClient({
  credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS as string),
})

export default defineEventHandler(async (event) => {
  const { text, lang } = await readBody(event)

  const [response] = await client.synthesizeSpeech({
    input: { text },
    voice: {
      languageCode: lang.ttsCode,
      name: lang.ttsName,
    },
    audioConfig: {
      audioEncoding: 'MP3',
    },
  })

  const audioBuffer = Buffer.from(response.audioContent as Buffer)
  const base64Audio = audioBuffer.toString('base64')

  return {
    audioContent: base64Audio,
  }
})
