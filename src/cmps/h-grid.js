import S from './h-grid.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

export default function HGrid(P) {
  let { RW, o } = P

  let [{ tokens }, __set] = useState(() => {
    let tokens
    tokens = null
    RW.getD([{ type: 'tokens', limit: 10 }]).then(r => {
      if (r && tokens != r?.data[0]) {
        tokens = r?.data[0]
        setV('tokens', tokens)
      }
    })

    return { tokens }
  })
  const setV = (k, v) => __set(prev => ({ ...prev, [k]: v }))

  return (
    <div className={S.div19}>
      <div className={S.div23}>
        <div>{o.title}</div>
        <div onClick={async e => RW.goto('tokens')} className={S.div24}>
          View All
        </div>
      </div>
      <div className={S.div1}>
        {(tokens || []).slice(0, 6).map((o, i) => (
          <div key={i} onClick={async e => RW.goto(`token/${o.id}`)} className={S.div7}>
            <img src={RW.fix_image(o.image_url)} className={S.img8}></img>
            <div className={S.div9}>
              <div className={S.div10}>
                <div className={S.div11}>
                  <div className={S.div12}>{o.name || '#' + o.token_id}</div>
                  <div className={S.div13}>{o.collection_name}</div>
                </div>
                {o.price > 0 && (
                  <div className={S.div16}>
                    <div className={S.div17}>{o.erc20}</div>
                    <div>{parseFloat(o.price)}</div>
                  </div>
                )}
              </div>
            </div>
            {false && (
              <div className={S.div21}>
                <div>Highest Offer</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
