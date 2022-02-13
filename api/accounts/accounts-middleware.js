const Account = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const errorMessage = { status: 400 };
  const { name, budget } = req.body;
  if (name === undefined || budget === undefined) {
    error.message = 'Name and budget are required'
    next(error)
  }
  else if (typeof name !== 'string') {
    error.message = 'Name and budget are required'
    next(error)
  }
  else if (name.trim().length < 3 || name.trim().length > 100) {
    error.message = 'Name must be between 3 and 100 characters'
    next(error)
  }
  else if (typeof budget !== 'number') {
    error.message = 'Budget must be a number'
    next(error)
  }
  else if (budget < 0 | budget > 1000000) {
    error.message = 'Budget must be between 1 and 1M'
    next(error)
  }
  next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try {
    const existing = await db('accounts').where('name', req.body.name.trim())
    if (existing) {
      res.json({Message: 'That name already exists'})
      next()
    }
  }
  catch (err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if(!account) {
      res.json({Message: 'Account does not exist'})
      next()
    }
    else {
      req.account = account;
      next()
    }
  }
  catch (err){
    next(err)
  }
}
