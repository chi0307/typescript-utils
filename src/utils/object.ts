export function filterObjectKeys<
  T extends Record<string, unknown>,
  U extends Array<`${Exclude<keyof T, symbol>}`>,
>(sourceObj: T, sourceKeys: U): Pick<T, U[number]> {
  const obj: T = structuredClone(sourceObj)
  const keys: string[] = [...sourceKeys]
  const needDeleteKeys = Object.keys(obj).filter((key) => !keys.includes(key))
  for (const key of needDeleteKeys) {
    delete obj[key]
  }
  return obj
}
