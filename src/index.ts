import { filterObjectKeys } from './utils/object'
import { randList } from './utils/random'

const list: (number | string)[] = [1, 2, 3, 'a', 'b', 'c']
console.log(randList(list))
console.log(randList(list))

const symbol = Symbol('')
const obj = {
  a: 'A',
  b: 'B',
  c: 'C',
  1: 'one',
  2: 'two',
  3: 'three',
  [symbol]: 'symbol',
}
const newObj = filterObjectKeys(obj, ['a', '1'])
console.log('newObj', newObj)
const newObj2 = filterObjectKeys(obj, ['b'])
console.log('newObj2', newObj2)
// filterObjectKeys(obj, ['1', symbol]) // typing is error
// filterObjectKeys(['a', 'v'], []) // typing is error
// filterObjectKeys(null, []) // typing is error
