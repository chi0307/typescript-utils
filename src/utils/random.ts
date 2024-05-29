export function randList<T>([...list]: T[]): T[] {
  const newList: T[] = []
  while (list.length > 0) {
    const index = Math.floor(Math.random() * list.length)
    newList.push(...list.splice(index, 1))
  }
  return newList
}
