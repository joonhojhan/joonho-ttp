import React from 'react'
import {connect} from 'react-redux'
import {fetchStock, purchaseStock, me} from '../store'
import {StockData} from '../components'

function StockSearch(props) {
  const {handleSubmit, stock, user} = props

  const {
    symbol,
    companyName,
    open,
    close,
    high,
    low,
    latestPrice,
    latestSource,
    previousClose,
    change,
    changePercent
  } = stock

  const handleBuy = evt => {
    evt.preventDefault()
    let shares = evt.target.shares.value
    if (user.balance / 100 - Number(shares) * latestPrice >= 0) {
      let transaction = {
        shares,
        companyName,
        symbol,
        latestPrice,
        userId: user.id
      }
      props.purchaseStock(transaction)
      props.me()
    } else {
      console.log('Balance too low!')
    }
  }

  return (
    <div className="flex justify-content-center page-center col">
      <form className="flex justify-content-center col" onSubmit={handleSubmit}>
        <div className="flex justify-content-space-between margin-x-0">
          <label htmlFor="search">Ticker Symbol: </label>
          <input
            name="symbol"
            type="text"
            placeholder="e.g. aapl, goog, etc."
          />
        </div>
      </form>
      {Object.keys(stock).length ? (
        <StockData
          symbol={symbol}
          companyName={companyName}
          open={open}
          close={close}
          high={high}
          low={low}
          latestPrice={latestPrice}
          latestSource={latestSource}
          previousClose={previousClose}
          change={change}
          changePercent={changePercent}
        />
      ) : (
        <div />
      )}
      <form className="flex justify-content-center col" onSubmit={handleBuy}>
        <input name="shares" type="number" />
      </form>
    </div>
  )
}

const mapStateToProps = state => ({
  stock: state.stock,
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    dispatch(fetchStock(evt.target.symbol.value))
  },
  purchaseStock(transaction) {
    dispatch(purchaseStock(transaction))
  },
  me() {
    dispatch(me())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StockSearch)
