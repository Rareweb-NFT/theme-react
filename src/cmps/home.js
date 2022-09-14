import S from './home.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'
import Header from './header.js'
import HomePage from './home-page.js'
import DedicatedPage from './dedicated-page.js'
import ListPage from './list-page.js'
import Footer from './footer.js'

const setV = () => {}

function Rareweb(P) {
  let { RW } = P

  const ref = useRef()
  useEffect(() => RW.renderPage(ref.current), [ref])

  return <div ref={ref} className={S.div25}></div>
}

export default function Home(P) {
  let RW, deps_loaded, P1, P2

  RW = window.RW
  deps_loaded = RW.conf.default_theme

  const [r, setR] = useState(0)
  useEffect(() => {
    const refresh = () => setR(r => r + 1)
    RW.addListener(refresh)
    return () => RW.removeListener(refresh)
  }, [])

  const parts = window.location.pathname.slice(1)?.split('/')

  P1 = parts[0] || ''
  P2 = parts[1] || ''

  return (
    deps_loaded && (
      <div theme={RW.theme()} className={S.div1}>
        <div className={S.header6}>
          <Header RW={RW}></Header>
        </div>
        <div className={S.content}>
          {(P1 == '' && <HomePage RW={RW}></HomePage>) ||
            (P1 == 'token' && <DedicatedPage P2={P2} RW={RW}></DedicatedPage>) ||
            (P1 == 'tokens' && <ListPage RW={RW}></ListPage>) ||
            (['page', 'blog'].indexOf(P1) != -1 && <Rareweb RW={RW}></Rareweb>)}
        </div>
        <Footer RW={RW}></Footer>
      </div>
    )
  )
}
