import S from './list-page.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

export default function ListPage(P) {
  let { RW } = P

  let [{ tokens, observer, pnum, last_fetched, addIntersectionObserver }, __set] = useState(() => {
    let tokens, observer, pnum, last_fetched, addIntersectionObserver
    tokens = []
    RW.getD([{ type: 'tokens', limit: 10 }]).then(r => {
      tokens = r?.data[0] || []
      setV('tokens', tokens)
    })
    observer = null
    pnum = 1
    last_fetched = 1
    addIntersectionObserver = () => {
      let elem = document.querySelector('#loadmore')
      if (!elem) return
      let observer = new window.IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            if (pnum > 30) {
              console.log('max pages loaded')
              return
            }
            pnum += 1
            setV('pnum', pnum)
            RW.getD([{ type: 'tokens', limit: 10, pnum: pnum }]).then(r => {
              let items = r?.data[0] || []
              last_fetched = items.length
              setV('last_fetched', last_fetched)
              tokens = [...tokens, ...items]
              setV('tokens', tokens)
            })
          }
        },
        {
          threshold: 1.0
        }
      )
      observer.observe(elem)
    }
    setTimeout(addIntersectionObserver, 1000)

    return { tokens, observer, pnum, last_fetched, addIntersectionObserver }
  })
  const setV = (k, v) => __set(prev => ({ ...prev, [k]: v }))

  return (
    <div className={S.div1}>
      <div className={S.div19}>All Featured</div>
      <div className={S.div2}>
        {tokens.map((o, i) => (
          <div key={i} onClick={async e => RW.goto(`token/${o.id}`)} className={S.div4}>
            <img src={RW.fix_image(o.image_url)} className={S.img5}></img>
            <div className={S.div6}>
              <div className={S.div7}>
                <div className={S.div8}>
                  <div className={S.div9}>{o.name || '#' + o.token_id}</div>
                  <div className={S.div10}>{o.collection_name}</div>
                </div>
                {o.price > 0 && (
                  <div className={S.div13}>
                    <div className={`${S.div14} fab fa-ethereum`}></div>
                    <div>{parseFloat(o.price)}</div>
                  </div>
                )}
              </div>
            </div>
            {false && (
              <div className={S.div16}>
                <div>Highest Offer</div>
              </div>
            )}
          </div>
        ))}
      </div>
      {pnum < 10 && last_fetched > 0 && (
        <div id={`loadmore`} className={S.div24}>
          Loading...
        </div>
      )}
    </div>
  )
}
