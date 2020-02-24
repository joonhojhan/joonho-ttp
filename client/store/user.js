import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const BUY_STOCK = 'BUY_STOCK'
const EDIT_PORTFOLIO = 'EDIT_PORTFOLIO'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const buyStock = balance => ({type: BUY_STOCK, balance})
const editPortfolio = () => ({type: EDIT_PORTFOLIO})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/portfolio')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const purchaseStock = transaction => async dispatch => {
  try {
    const {data} = await axios.post('/api/transaction', transaction)
    dispatch(buyStock(data))
    // history.push('/home')
  } catch (error) {
    console.error(error)
  }
}

export const addToPortfolio = transaction => async dispatch => {
  try {
    await axios.post('/api/portfolio', transaction)
    dispatch(editPortfolio())
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case BUY_STOCK:
      return {...state, balance: action.balance}
    default:
      return state
  }
}
