import S from './header.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

export default function Header(P) {
  let { RW } = P

  const ref = useRef()
  useEffect(() => RW.walletCard(ref.current), [ref])

  return (
    <div className={S.div1}>
      {RW.account && RW.walletchainId != RW.chainId && (
        <div className={S.div22}>
          <div>Change Blockchain Network in Wallet</div>
          <div onClick={async e => await RW.checkChain()} className={S.div24}>
            Change
          </div>
        </div>
      )}
      <div className={S.div5}>
        <div onClick={async e => RW.goto('')} className={S.div16}>
          {RW.conf.logo_image && <img src={RW.fix_image(RW.conf.logo_image)} className={S.img13}></img>}
          <div className={S.div6}>{RW.conf.logo_text || 'Rareweb'}</div>
        </div>
        <div className={S.spacer}></div>
        <div
          onClick={async e => RW.toggleTheme()}
          className={`${S.div17} ${RW.theme()}`}
          dangerouslySetInnerHTML={{ __html: icons.mode }}
        ></div>
        <div ref={ref} className={S.wallet_card}></div>
      </div>
    </div>
  )
}
