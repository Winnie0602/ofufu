import { MongoClient } from 'mongodb'

/**
 * 舊 karaoke 資料（songs／videos／list）所在的資料庫。
 *
 * 新的教材 collection 放在 `MONGODB_DB` 指定的資料庫，兩者住在同一個 MongoDB
 * instance——**一個 instance 可以有多個資料庫**，所以換資料庫不必換連線字串。
 */
export const legacyDbName = 'karaoke_app'

let cachedClient: MongoClient | null = null
// 連線中的 Promise。同時進來的請求共用它，避免各自建一個 client。
let connecting: Promise<MongoClient> | null = null

/**
 * 取得 MongoDB 連線。
 *
 *   const { db } = await connectToDatabase()                  // 教材資料庫（預設）
 *   const { db } = await connectToDatabase(legacyDbName)      // 舊的 karaoke 資料
 *
 * 資料庫名稱不寫死在程式裡，預設讀 runtimeConfig 的 `mongoDbName`
 * （環境變數 `MONGODB_DB`）；呼叫時傳名字可以指定別的，讓舊的歌曲 API 繼續讀
 * `karaoke_app`。`client.db()` 只是取個 handle，不會產生連線，所以每次呼叫都拿
 * 新的 handle 沒有成本。
 */
export async function connectToDatabase(dbName?: string) {
  const config = useRuntimeConfig()
  const name = dbName ?? config.mongoDbName

  if (cachedClient) {
    return { client: cachedClient, db: cachedClient.db(name) }
  }

  connecting ??= (async () => {
    if (!config.mongoURI) {
      throw new Error('請在 .env 設定 MONGODB_URI')
    }

    const client = new MongoClient(config.mongoURI)
    await client.connect()
    return client
  })().catch((error) => {
    // 連線失敗就把 Promise 清掉，下一個請求才有機會重試，不會永遠拿到同一個失敗結果。
    connecting = null
    throw error
  })

  cachedClient = await connecting
  return { client: cachedClient, db: cachedClient.db(name) }
}
