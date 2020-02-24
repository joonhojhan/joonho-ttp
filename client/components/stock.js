import React from 'react'
import {connect} from 'react-redux'
import {fetchStock, purchaseStock, addToPortfolio, me} from '../store'
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
    let shares = Number(evt.target.shares.value)
    if (user.balance / 100 - shares * latestPrice >= 0) {
      let transaction = {
        shares,
        companyName,
        symbol,
        latestPrice,
        userId: user.id
      }
      props.purchaseStock(transaction)
      props.addToPortfolio(transaction)
    } else {
      console.log('Balance too low!')
    }
  }

  return (
    <div className="flex justify-content-center page-center col">
      <form className="flex justify-content-center col" onSubmit={handleSubmit}>
        <div className="flex col justify-content-space-between margin-x-0">
          <label htmlFor="search">Ticker Symbol: </label>
          <input
            name="symbol"
            type="text"
            placeholder="e.g. AAPL, GOOG, AMZN, etc."
          />
          <button type="submit">Search</button>
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
      ) : null}
      {Object.keys(stock).length &&
      latestSource !== 'Close' &&
      latestSource !== undefined ? (
        <form className="flex justify-content-center col" onSubmit={handleBuy}>
          <input name="shares" type="number" />
          <button type="submit">Buy</button>
        </form>
      ) : (
        <div>Market is closed for the day, come back tomorrow!</div>
      )}
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
  addToPortfolio(transaction) {
    dispatch(addToPortfolio(transaction))
  },
  me() {
    dispatch(me())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StockSearch)
