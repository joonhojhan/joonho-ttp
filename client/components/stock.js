import React from 'react'
import {connect} from 'react-redux'
import {fetchStock} from '../store'

function Stock(props) {
  const {handleSubmit, stock} = props
  const [text, setText] = React.useState('')
  const handleChange = event => {
    setText(event.target.value)
  }
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
        <div className="flex justify-content-center">
          <input
            name="symbol"
            type="text"
            placeholder="e.g. aapl, goog, etc."
            onChange={handleChange}
            value={text}
          />
        </div>
      </form>
      <div>Symbol: {symbol}</div>
      <div>Company: {companyName}</div>
      <div>Status: {latestSource}</div>
      <div>Current Price: ${latestPrice}</div>
      <div>Open Price: ${open}</div>
      <div>Close Price: ${close}</div>
      <div>High Price: ${high}</div>
      <div>Low Price: ${low}</div>
      <div>Previous Close Price: ${previousClose}</div>
      <div>Change Price: ${change}</div>
      <div>Change Percentage: {changePercent}%</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Stock)
