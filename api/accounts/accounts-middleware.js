const Account = require('./accounts-model')

exports.checkAccountPayload = (req, res, next) => {
  // DO YOUR MAGIC
  // Note: you can either write "manual" validation logic
  // or use the Yup library (not currently installed)
  next()
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accountName = await Account.getAll()
  if (account in accountName)
  next()
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const account = await Account.getById(req.params.id)
    if(!account) {
      next({status: 404, Message: 'Account not found'})
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
