import typia from 'typia'

type TypeChecker<StorageTyping> = {
  [k in keyof StorageTyping]: (data: unknown) => data is StorageTyping[k]
}
/**
 * 說明:
 * localStorage, sessionStorage 的管理器
 *
 * 功能:
 * 1. 確保進出 localStorage, sessionStorage 的型別是一樣的，在寫 code 的時候可以少思考型別問題
 * 2. 可以減少處理型別轉換問題 (畢竟記錄都需要用 string 紀錄)
 * 3. 在型別不對的時候順手刪掉錯誤的型別資料
 * 4. 減少思考目前 storage 有用到哪些 key
 */
export class StorageManager<StorageTyping extends Record<string, unknown>> {
  private readonly _storage: Storage
  private readonly _typeChecker: TypeChecker<StorageTyping>
  public constructor(
    storage: Storage,
    typeChecker: TypeChecker<StorageTyping>,
  ) {
    this._storage = storage
    this._typeChecker = typeChecker
  }
  public get<Key extends Extract<keyof StorageTyping, string>>(
    key: Key,
  ): StorageTyping[Key] | null {
    const sourceData = this._storage.getItem(key)
    if (sourceData === null) {
      return null
    }
    try {
      const data: unknown = JSON.parse(sourceData)
      if (this._typeChecker[key](data)) {
        return data
      }
    } finally {
      // 因為 JSON parse 失敗或者是 typing check 失敗基本上等於無效了，所以刪除 item 也不會留下用不到的垃圾
      this.remove(key)
      return null
    }
  }

  public set<Key extends Extract<keyof StorageTyping, string>>(
    key: Key,
    value: StorageTyping[Key],
  ) {
    this._storage.setItem(key, JSON.stringify(value))
  }

  public remove<Key extends Extract<keyof StorageTyping, string>>(key: Key) {
    this._storage.removeItem(key)
  }
}

type K3 = { id: number; name: string }[]

/**
 * 可以改用 typia 處理 typing 問題
 */
const localStorageManager = new StorageManager<{
  k1: string
  k2: number
  k3: K3
}>(localStorage, {
  k1: (data): data is string => typeof data === 'string',
  k2: (data): data is number => typeof data === 'number',
  k3: typia.is<K3>,
})

const sessionStorageManager = new StorageManager<{
  k4: boolean
}>(sessionStorage, {
  k4: (data): data is boolean => typeof data === 'boolean',
})
