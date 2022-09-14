import S from './faqs.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

function FaqAnswer(P) {
  let { o, RW } = P

  const ref = useRef()
  useEffect(() => RW.renderArticle(ref.current, o.answer), [ref])

  return <div ref={ref} className={S.div7}></div>
}

export default function Faqs(P) {
  let { RW } = P

  let [{ open }, __set] = useState(() => {
    let open
    open = {}

    return { open }
  })
  const setV = (k, v) => __set(prev => ({ ...prev, [k]: v }))

  return (
    <div className={S.div8}>
      <div className={S.div2}>Frequently Asked Questions</div>
      {(RW.conf.faqs || []).map((o, i) => (
        <div key={i}>
          <div
            onClick={async e => {
              open[i] = !open[i]
              open = open
              setV('open', open)
            }}
            className={S.div6}
          >
            <div className={S.div9}>{o.question}</div>
            <div className={S.div10} dangerouslySetInnerHTML={{ __html: open[i] ? icons.minus : icons.plus }}></div>
          </div>
          {open[i] && <FaqAnswer o={o} RW={RW}></FaqAnswer>}
        </div>
      ))}
    </div>
  )
}
