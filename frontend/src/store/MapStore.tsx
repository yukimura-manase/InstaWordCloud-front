import { proxyMap } from 'valtio/utils'

const state = proxyMap()
state.set('key', 'value')
state.set('key2', 'value2')
// state.delete('key')
// state.get('key') // ---> value
// state.forEach((value, key) => console.log(key, value)) // ---> "key", "value", "key2", "value2"