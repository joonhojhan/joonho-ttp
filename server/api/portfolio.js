const router = require('express').Router()
const {Portfolio, User} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {shares, companyName, symbol, latestPrice, userId} = req.body
    let stock = await Portfolio.findOne({
      where: {
        userId: userId,
        tickerSymbol: symbol
      }
    })
    if (stock) {
      stock.total += Number((latestPrice * 100 * shares).toFixed(0))
      stock.shares += shares
      await stock.save()
    } else {
      stock = await Portfolio.create({
        company: companyName,
        tickerSymbol: symbol,
        total: Number((latestPrice * 100 * shares).toFixed(0)),
        shares: Number(shares),
        userId
      })
    }
    let user = await User.findByPk(userId, {
      include: {all: true}
    })
    res.json(user)
  } catch (error) {
    next(error)
  }
})
