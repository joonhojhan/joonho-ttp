import React from 'react'
import {connect} from 'react-redux'
import {fetchStock} from '../store'
import {StockData} from '../components'

function StockSearch(props) {
  const {handleSubmit, stock} = props
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
    </div>
  )
}

const mapStateToProps = state => ({
  stock: state.stock
})

const mapDispatchToProps = dispatch => ({
  handleSubmit(evt) {
    evt.preventDefault()
    dispatch(fetchStock(evt.target.symbol.value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(StockSearch)
