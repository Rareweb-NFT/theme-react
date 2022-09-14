import S from './home-page.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'
import HeroSection from './hero-section.js'
import HGrid from './h-grid.js'
import Faqs from './faqs.js'

const setV = () => {}

export default function HomePage(P) {
  let { RW } = P

  return (
    <div className={S.div1}>
      {RW && icons && <div></div>}
      {RW.conf.home_sections.map((o, i) => (
        <div key={i}>
          {(o.type == 'hero-section' && <HeroSection o={o} RW={RW}></HeroSection>) ||
            (o.type == 'h-grid' && <HGrid RW={RW} o={o}></HGrid>)}
        </div>
      ))}
      <Faqs RW={RW}></Faqs>
    </div>
  )
}
