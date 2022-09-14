import S from './footer.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

export default function Footer(P) {
  let { RW } = P

  return (
    <div className={S.div1}>
      <div className={S.div5}>
        <div className={S.div3}>{RW.conf.store_name}</div>
        <div className={S.div15}>{RW.conf.store_caption}</div>
        <div className={S.div9}>
          <div>
            {(RW.conf.links || []).map((o, i) => (
              <div key={i} onClick={async e => RW.goto(o.id)} className={S.div7}>
                {o.name}
              </div>
            ))}
          </div>
          <div className={S.div13}>
            <div className={S.div10}>
              {['twitter', 'discord', 'instagram', 'tiktok', 'telegram', 'facebook']
                .filter(o => (RW.conf.social || {})[o])
                .map((o, i) => (
                  <div
                    key={i}
                    onClick={async e => window.open((RW.conf.social || {})[o], true)}
                    className={S.div11}
                    dangerouslySetInnerHTML={{ __html: icons[o] }}
                  ></div>
                ))}
            </div>
            <div className={S.div14}>Powered by Rareweb</div>
          </div>
        </div>
      </div>
    </div>
  )
}
