import React from 'react'
import {me} from '../store'
import {connect} from 'react-redux'

function Transaction(props) {
  React.useEffect(() => {
    props.me()
  }, [])
  const {user} = props
  return <div>HELLO</div>
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Transaction)
