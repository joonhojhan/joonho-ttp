const Sequelize = require('sequelize')
const db = require('../db')

const Transaction = db.define('transaction', {
  tickerSymbol: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      noteEmpty: true
    }
  },
  shares: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      noteEmpty: true
    }
  }
})

module.exports = Transaction
