const Sequelize = require('sequelize')
const db = require('../db')

const Portfolio = db.define('portfolio', {
  company: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  total: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 0
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    defaultValue: 0
  }
})

module.exports = Portfolio
