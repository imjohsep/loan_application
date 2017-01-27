var mongoose = require('mongoose')

var LoanSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  loanAmount: {type: Number, required: true},
  propertyValue: {type: Number, required: true},
  ssn: {type: String, require: true},
  loanStatus: {type: String, require: true}
})

module.exports = mongoose.model('Loan', LoanSchema)
