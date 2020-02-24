const router = require('express').Router()
const {Transaction, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {shares, companyName, symbol, latestPrice, userId} = req.body
    let transaction = await Transaction.create({
      shares,
      company: companyName,
      tickerSymbol: symbol,
      price: (latestPrice * 100).toFixed(0),
      userId
    })
    let user = await User.findByPk(userId)
    user.balance -= transaction.price * shares
    await user.save()
    res.json(user.balance)
  } catch (error) {
    next(error)
  }
})
