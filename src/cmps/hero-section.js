import S from './hero-section.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

export default function HeroSection(P) {
  let { o, RW } = P

  return (
    <div className={S.div1}>
      <div className={S.div2}>
        <div className={S.div3}>{o.title}</div>
        <div className={S.div4}>{o.desc}</div>
      </div>
      <div style={{ '--var1': `url(${RW.HOST}/images/${o.image})` }} className={S.div5}></div>
    </div>
  )
}
