var _ = require('lodash')
var Loan = require('./models/loan')

/* Routes */
module.exports = function (app) {
  
    app.use(function(req, res, next) {
        next()
    })

    app.get('/', function(req, res) {
        res.json({ message: 'Loan API' })
    })

    app.get('/loans/:loanId', function(req, res) {
        var loanId = req.params.loanId
        Loan.findOne({_id: loanId}).exec(function(err, loan) {
            if (err) res.send(err)
            res.json(loan)
        })
    })

    /**
     * Create Loan Application
     * <host>/api/loans (POST)
     * 
     * Request Body
     * propertyValue
     * loanAmount
     * ssn
     * 
     * Response - JSON
     * Loan ID
     * Loan Status (Accepted, Rejected, etc.)
     */
    app.post('/loans', function(req, res) {
        var body = req.body
        var data = {loanId: null, loanStatus: null}
        
        // Validate application
        if ((body.loanAmount / body.propertyValue) > .40) {
            data.loanStatus = 'Rejected'
        } else {
            data.loanStatus = 'Accepted'
        }
        
        // Need to hash SSN
        
        // Create new entry of loan application
        var loan = new Loan({
            loanAmount: body.loanAmount,
            propertyValue: body.propertyValue,
            ssn: body.ssn,
            loanStatus: data.loanStatus
        })

        data.loanId = loan._id

        // Validate and save loan 
        loan.save(function(err) {
            if (err) {
                res.send(err)
            } else {
                res.json(data)
            }
        })

    })
}
