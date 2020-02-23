import React from 'react'
import {me} from '../store'
import {connect} from 'react-redux'

function Transaction(props) {
  React.useEffect(() => {
    props.me()
  }, [])
  const {transactions} = props.user
  return transactions !== undefined && transactions.length ? (
    <table className="width-100 text-center">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Ticker Symbol</th>
          <th scope="col">Company Name</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            {transactions.map(trans => {
              return (
                <div key={trans.id}>
                  {trans.id}
                  <br />
                </div>
              )
            })}
          </th>
          <td>
            {transactions.map(trans => {
              return (
                <div key={trans.id}>
                  {trans.tickerSymbol}
                  <br />
                </div>
              )
            })}
          </td>
          <td>
            {transactions.map(trans => {
              return (
                <div key={trans.id}>
                  {trans.company}
                  <br />
                </div>
              )
            })}
          </td>
          <td>
            {transactions.map(trans => {
              return (
                <div key={trans.id}>
                  {trans.shares}
                  <br />
                </div>
              )
            })}
          </td>
          <td>
            {transactions.map(trans => {
              return (
                <div key={trans.id}>
                  ${(trans.price / 100).toFixed(2)}
                  <br />
                </div>
              )
            })}
          </td>
          <td>
            {transactions.map(trans => {
              return (
                <div key={trans.id}>
                  ${((trans.price * trans.shares) / 100).toFixed(2)}
                  <br />
                </div>
              )
            })}
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <div className="text-center">No orders made!</div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
