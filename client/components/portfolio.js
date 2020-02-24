import React from 'react'
import {me} from '../store'
import {connect} from 'react-redux'

const Portfolio = props => {
  React.useEffect(() => {
    props.me()
  }, [])
  const {portfolios} = props.user
  return portfolios && portfolios.length ? (
    <table className="width-100 text-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ticker Symbol</th>
          <th scope="col">Company Name</th>
          <th scope="col">Shares</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            {portfolios.map(stock => {
              return (
                <div key={stock.id}>
                  {stock.id}
                  <br />
                </div>
              )
            })}
          </th>
          <td>
            {portfolios.map(stock => {
              return (
                <div key={stock.id}>
                  {stock.tickerSymbol}
                  <br />
                </div>
              )
            })}
          </td>
          <td>
            {portfolios.map(stock => {
              return (
                <div key={stock.id}>
                  {stock.company}
                  <br />
                </div>
              )
            })}
          </td>
          <td>
            {portfolios.map(stock => {
              return (
                <div key={stock.id}>
                  {stock.shares}
                  <br />
                </div>
              )
            })}
          </td>
          <td>
            {portfolios.map(stock => {
              return (
                <div key={stock.id}>
                  ${(stock.total / 100).toFixed(2)}
                  <br />
                </div>
              )
            })}
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div className="text-center">Nothing in portfolio to show!</div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
