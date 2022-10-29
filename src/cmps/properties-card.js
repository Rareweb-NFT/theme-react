import S from './properties-card.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

export default function PropertiesCard(P) {
  let { nft, RW } = P

  let conf, data

  let [{ tabs, tab }, __set] = useState(() => {
    let tabs, tab
    tabs = ['properties', 'token', 'collection']
    tab = 'properties'

    return { tabs, tab }
  })
  const setV = (k, v) => __set(prev => ({ ...prev, [k]: v }))

  conf = {
    token: [
      { name: 'token id', value: nft.token_id },
      { name: 'contract', value: nft.contract },
      { name: 'blockchain', value: RW.chainName },
      { name: 'creator royalties', value: '2.5%' },
      { name: 'token standard', value: nft.type }
    ],
    collection: [
      { name: 'collection name', value: nft.collection_name },
      { name: 'tokens', value: nft.total_tokens || 0 },
      { name: 'contract', value: nft.contract },
      { name: 'owners', value: nft.owners || 0 },
      {},
      { name: 'floor', value: 12 }
    ]
  }

  data = conf[tab]

  return (
    <div className={S.card3}>
      <div className={S.div3}>
        {tabs.map((o, i) => (
          <div
            key={i}
            onClick={async e => {
              tab = o
              setV('tab', tab)
            }}
            className={` ${o == tab ? `sel` : ''}`}
          >
            {o}
          </div>
        ))}
      </div>
      {(tab == 'properties' && (
        <div className={S.div4}>
          <div className={S.div14}>DESCRIPTION</div>
          <div className={S.div15}>{nft.collection_desc}</div>
          {nft.traits.length > 0 && (
            <>
              <div className={S.div17}>PROPERTIES</div>
              <div className={S.div37}>
                {(nft.traits.length ? nft.traits : []).map((o, i) => (
                  <div key={i} className={S.div39}>
                    <div className={S.div40}>{o.trait_type}</div>
                    <div className={S.div41}>{o.value}</div>
                    <div className={S.div42}>
                      {o.trait_count || 0} ({o.trait_count / 100 || 0}%)
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )) || (
        <div className={S.div21}>
          {data.map((o, i) => (
            <div key={i} style={{ '--var1': i % 2 == 0 ? 'left' : 'right' }} className={S.div23}>
              <div className={S.div24}>{o.name || ''}</div>
              {(o.name == 'contract' && (
                <a href={`${RW.blockscan}/address/${o.value}`} target={`_blank`} className={S.a25}>
                  <div>{RW.shortA(o.value)}</div>
                  <div className={S.div34} dangerouslySetInnerHTML={{ __html: icons.visit }}></div>
                </a>
              )) || <div className={S.div32}>{o.value == undefined ? '' : o.value}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
