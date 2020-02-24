import React from 'react'
import {me} from '../store'
import {connect} from 'react-redux'
import {PortfolioData, StockSearch} from '../components'

const Portfolio = props => {
  React.useEffect(() => {
    props.me()
  }, [])
  return (
    <div className="portfolio">
      <PortfolioData />
      <StockSearch />
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  me: () => dispatch(me())
})

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio)
