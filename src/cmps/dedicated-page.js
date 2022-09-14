import S from './dedicated-page.module.css'
import { useState, useEffect, useRef } from 'react'
import icons from '../code/icons.js'

import PropertiesCard from './properties-card.js'
import CtrlsCard from './ctrls-card.js'

const setV = () => {}

function Render(P) {
  let { data, RW } = P

  let invalid_orders, nft, orders, order, offers, activity

  let [{ orderIndex }, __set] = useState(() => {
    let orderIndex
    orderIndex = 0

    return { orderIndex }
  })
  const setV = (k, v) => __set(prev => ({ ...prev, [k]: v }))

  invalid_orders = data.invalid_orders
  nft = data.item
  orders = data.orders
  order = data.orders[orderIndex]
  offers = data.offers
  activity = data.logs

  return (
    <div className={S.div73}>
      {true ||
        (nft.owner && RW.account == nft.owner.toLowerCase() && (
          <div className={S.wrapper}>
            <div onClick={async e => RW.transferToken(nft.id, 0)} className={S.transfer_btn}>
              TRANSFER
            </div>
            <div onClick={async e => RW.sellTokens(nft)} className={S.sell_btn}>
              SELL
            </div>
          </div>
        ))}
      {invalid_orders[RW.account] && (
        <div className={S.div62}>
          <div className={S.div63}>You have Orders without stock, Please cancel</div>
        </div>
      )}
      <div className={S.div2}>
        <div className={S.card1}>
          <img src={RW.fix_image(nft.image_url)} className={S.img5}></img>
          <div className={S.propertiescard46}>
            <PropertiesCard nft={nft} RW={RW}></PropertiesCard>
          </div>
        </div>
        <div className={S.card2}>
          <div className={S.collection}>
            <div className={S.div25}>
              <div className={S.div27}>COLLECTION</div>
              <div className={S.div28}>{nft.collection_name || ''}</div>
            </div>
            {false && (
              <div>
                <div className={S.div29}>FLOOR</div>
                <div className={S.div30}>1.2 MATIC</div>
              </div>
            )}
          </div>
          <div className={S.token}>
            <div className={S.div7}>{nft.name || '#' + nft.token_id}</div>
            {(order.amount && (
              <>
                <div className={S.div32}>
                  <div className={S.div34}>Current Price</div>
                  <div className={S.div35}>
                    {parseFloat(parseFloat(order.amount).toFixed(5) + '')} {order.erc20_symbol}
                  </div>
                </div>
                <div className={S.div49}>10% above floor price</div>
                <div className={S.buttons}>
                  <div onClick={async e => RW.buyToken(nft.id, orderIndex)} className={S.div53}>
                    BUY NOW
                  </div>
                  {order.erc20_address != '0x0000000000000000000000000000000000000000' && (
                    <div onClick={async e => RW.makeOffer(nft.id, orderIndex)} className={S.div54}>
                      MAKE OFFER
                    </div>
                  )}
                </div>
              </>
            )) ||
              (RW.account == nft.collection_owner && (
                <div className={S.div68}>
                  This item is not on sale. To put it on sale,
                  <a
                    href={`https://rareweb.app?page=data&project_id=${RW.project_id}&tab=orders&table=orders`}
                    target={`_blank`}
                    className={S.a69}
                  >
                    create an order
                  </a>
                </div>
              )) || <div className={S.div51}>This item is not available for sale</div>}
          </div>
          <CtrlsCard
            orders={orders}
            orderIndex={orderIndex}
            RW={RW}
            offers={offers}
            order={order}
            activity={activity}
          ></CtrlsCard>
          <div className={S.propertiescard66}>
            <PropertiesCard nft={nft} RW={RW}></PropertiesCard>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DedicatedPage(P) {
  let { P2, RW } = P

  let [{ data }, __set] = useState(() => {
    let data
    data = null

    return { data }
  })
  const setV = (k, v) => __set(prev => ({ ...prev, [k]: v }))

  RW.getD([{ type: 'token', id: P2 }]).then(r => {
    if (r && data != r.data[0]) {
      data = r.data[0]
      setV('data', data)
    }
  })

  return data && <Render data={data} RW={RW}></Render>
}
