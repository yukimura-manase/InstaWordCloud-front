// 1. Valtio の proxy を import する
import { proxy } from "valtio";
import { useSnapshot } from "valtio";
import { useProxy } from "valtio/utils";
import { watch } from 'valtio/utils'
import { useEffect } from "react";
import { subscribe } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import { proxyMap } from 'valtio/utils'


interface Pet {
  val: string
}

const state = proxy({
  listMap: new Map<string, Pet>(),
  // listMap2: proxyMap<string, Pet>(), // Error
  arrayList: ['ロボ玉', '白桃さん', 'ももちゃん']
});

const stateProxyMap = proxyMap<string, Pet>()

state.listMap.set('robotama', {val: 'ロボ玉'})
state.listMap.set('hakutou', {val: '白桃さん'})
state.listMap.set('momo', {val: 'ももちゃん'})

stateProxyMap.set('robotama', {val: 'ロボ玉'})
stateProxyMap.set('hakutou', {val: '白桃さん'})
stateProxyMap.set('momo', {val: 'ももちゃん'})


export default function ValtioTestView() {

  console.log('ValtioTestView レンダリング');
  
  /** 1. useSnapshot */ 
  // const valtioStateSnapshot = useSnapshot(state)

  /** 2. useProxy */ 
  const valtioStateSnapshot = useProxy(state)

  console.log('valtioStateSnapshot 初期表示', valtioStateSnapshot);

  
  const piuiSetter = () => {
    valtioStateSnapshot.listMap.set('piui', {val: 'ピウイ'})
    console.log('valtioStateSnapshot 追加後', valtioStateSnapshot);

    stateProxyMap.set('piui', {val: 'ピウイ'})
    valtioStateSnapshot.arrayList.push('ピュピュまる')
  }

  const robotamaEat = () => {
    valtioStateSnapshot.listMap.delete('robotama')
    console.log('valtioStateSnapshot 削除後', valtioStateSnapshot);

    stateProxyMap.delete('robotama')
    valtioStateSnapshot.arrayList.push('ピューたん')
  }

  return (
    <div>
      <div>
        <h3>proxyMap を使用する場合</h3>
        {
          Array.from(valtioStateSnapshot.listMap).map( (petList) => {
            return <p>{petList[1].val}</p>
          })
        }
      </div>
      <hr />
      <div>
        <h3>proxyMap での表示 パターン1</h3>
        {Array.from(stateProxyMap).map( (petList) => {
          return <p>{petList[1].val}</p>
        })}
      </div>
      <hr />
      <div>
        <h3>配列での表示</h3>
        {valtioStateSnapshot.arrayList.map((val) => {
          return <p>{val}</p>
        })}
      </div>
      <button onClick={() => (piuiSetter())}>ピウイ登場🌟</button>
      <button onClick={() => (robotamaEat())}>ロボ玉、食べられる🥺</button>
    </div>
  );
}