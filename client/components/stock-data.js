import React from 'react'

export default function StockData(props) {
  const {
    symbol,
    companyName,
    latestSource,
    latestPrice,
    open,
    close,
    high,
    low,
    previousClose,
    change,
    changePercent
  } = props
  return (
    <div>
      <div>Symbol: {symbol}</div>
      <div>Company: {companyName}</div>
      <div>Status: {latestSource}</div>
      <div>Current Price: ${latestPrice.toFixed(2)}</div>
      {latestSource === 'close' && (
        <div>
          <div>Open Price: ${open.toFixed(2)}</div>
          <div>Close Price: ${close.toFixed(2)}</div>
          <div>High Price: ${high.toFixed(2)}</div>
          <div>Low Price: ${low.toFixed(2)}</div>
        </div>
      )}
      <div>Previous Close Price: ${previousClose.toFixed(2)}</div>
      <div>Change Price: ${change}</div>
      <div>Change Percentage: {changePercent}%</div>
    </div>
  )
}
