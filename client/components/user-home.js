import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, balance} = props

  return (
    <div className="page-center flex justify-content-center col">
      <h3 className="text-center">Welcome, {email}</h3>
      <div className="text-center">
        You have a balance of: ${(balance / 100).toFixed(2)}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    balance: state.user.balance
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
