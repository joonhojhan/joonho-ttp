import axios from 'axios'
// import history from '../history'
const API_TOKEN = 'sk_b694d08e650645a68f962a2ed7de2493'

/**
 * ACTION TYPES
 */
const GET_STOCK = 'GET_STOCK'

/**
 * INITIAL STATE
 */
const defaultStock = {}

/**
 * ACTION CREATORS
 */
const getStock = stock => ({type: GET_STOCK, stock})

/**
 * THUNK CREATORS
 */

export const fetchStock = ticker => async dispatch => {
  try {
    let {data} = await axios.get(
      `https://cloud.iexapis.com/stable/stock/${ticker}/batch?types=quote&token=${API_TOKEN}`
    )
    console.log('DATA', data)
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
    } = data.quote
    const stock = {
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
    }
    dispatch(getStock(stock || defaultStock))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultStock, action) {
  switch (action.type) {
    case GET_STOCK:
      return action.stock
    default:
      return state
  }
}
