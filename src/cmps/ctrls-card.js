import S from './ctrls-card.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

const setV = () => {}

export default function CtrlsCard(P) {
  let { orders, orderIndex, RW, offers, order, activity } = P

  let [{ tabs, tab }, __set] = useState(() => {
    let tabs, tab
    tabs = ['owners', 'offers', 'activity']
    tab = 'owners'

    return { tabs, tab }
  })
  const setV = (k, v) => __set(prev => ({ ...prev, [k]: v }))

  return (
    <div className={S.table}>
      <div className={S.div3}>
        {tabs.map((o, i) => (
          <div
            key={i}
            onClick={async e => {
              tab = o
              setV('tab', tab)
            }}
            className={`${S.div5} ${tab == o ? `sel` : ''}`}
          >
            <div className={S.div8} dangerouslySetInnerHTML={{ __html: icons[o] }}></div>
            <div>{o}</div>
          </div>
        ))}
      </div>
      {(tab == 'owners' && (
        <div className={S.div6}>
          <div className={S.div77}>
            <div className={S.div94}></div>
            <div className={S.div78}>OWNER</div>
            <div className={S.div79}>EDITION</div>
            <div className={S.div80}>PRICE</div>
            <div className={S.div81}></div>
          </div>
          {orders.map((o, i) => (
            <div
              key={i}
              onClick={async e => {
                if (o.order_id) orderIndex = i
                setV('orderIndex', orderIndex)
              }}
              className={S.div12}
            >
              <div className={S.div95}>
                {orderIndex == i && <div className={S.div96} dangerouslySetInnerHTML={{ __html: icons.tick }}></div>}
              </div>
              <div className={S.div82}>{o.sell_type == 1 ? RW.conf.store_name : RW.shortA(o.signer)}</div>
              <div className={S.div83}>
                {o.quantity}/{o.inventory}
              </div>
              {(o.order_id && (
                <div className={S.div84}>
                  {parseFloat(parseFloat(o.amount).toFixed(5) + '')} {o.erc20_symbol}
                </div>
              )) || <div className={S.div89}>Not for Sale</div>}
              <div className={S.div103}>
                {RW.account == o.signer && o.order_id && (
                  <div
                    onClick={async e => {
                      RW.sell_pane = true
                      RW.order_eid = o.order_id
                      RW.order_tab = 'detail'
                    }}
                    className={S.div106}
                  >
                    cancel
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )) ||
        (tab == 'offers' && (
          <div className={S.div15}>
            {(offers.length == 0 && <div className={S.div18}>No offers yet</div>) || (
              <div className={S.div31}>
                <div className={S.div32}>
                  <div className={S.div43}>OFFER</div>
                  <div className={S.div44}>BY</div>
                  <div className={S.div45}>EXPIRY</div>
                  <div className={S.div49}></div>
                </div>
                {offers.map((o, i) => (
                  <div key={i} className={S.div35}>
                    <div className={S.div40}>
                      <div className={S.div47}>
                        {parseFloat(o.amount)} {o.erc20_symbol}
                      </div>
                      {o.diff != 0 && (
                        <div className={`${S.div48} ${o.diff > 0 ? `more` : `less`}`}>
                          {parseInt(o.diff)}% {o.diff > 0 ? 'more' : 'less'} than item price
                        </div>
                      )}
                    </div>
                    <div className={S.div41}>{RW.shortA(o.signer)}</div>
                    <div className={S.div42}>30 days</div>
                    <div className={S.div50}>
                      {order.signer == RW.account && (
                        <div onClick={async e => RW.acceptOffer(o.id)} className={S.div51}>
                          Accept
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )) ||
        (tab == 'activity' && (
          <div className={S.div17}>
            {(activity.length == 0 && <div className={S.div19}>No activity yet</div>) || (
              <div>
                <div className={S.div112}>
                  <div className={S.div108}>TYPE</div>
                  <div className={S.div109}>PRICE</div>
                  <div className={S.div110}>BY</div>
                  <div className={S.div111}>TO</div>
                  <div className={S.div113}>DATE</div>
                  <div className={S.div120}></div>
                </div>
                {activity.map((o, i) => (
                  <div key={i} className={S.div54}>
                    <div className={S.div55}>
                      <div className={S.div73}>{o.entity_type}</div>
                    </div>
                    <div className={S.div114}>
                      {parseFloat(o.amount)} {o.erc20}
                    </div>
                    <div className={S.div115}>{RW.shortA(o.from)}</div>
                    <div className={S.div116}>{RW.shortA(o.to)}</div>
                    <div className={S.div117}>{o.block_time.split('T')[0]}</div>
                    <div className={S.div118}>
                      <div
                        onClick={async e => window.open(`${RW.blockscan}/tx/${o.txn_hash}`, true)}
                        className={S.div119}
                        dangerouslySetInnerHTML={{ __html: icons.visit2 }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
    </div>
  )
}
