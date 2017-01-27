import React, {Component, PropTypes} from 'react'
import './Loan.sass'
import numeral from 'numeral'

export default class Loan extends Component {
    constructor(props) {
        super(props)
        this.loadLoan = this.loadLoan.bind(this)
        this.state = {
            loanId: null,
            loanStatus: null
        }
    }

    componentDidMount() {
        this.loadLoan(this.props.params.loanId)
    }

    loadLoan(loanId) {
        return new Promise((resolve, reject) => {
            fetch(`/api/loans/${loanId}`
            ).then(response => {
                if (response.ok) {
                    return response.json().then(json => {
                        this.setState({
                            ...json,
                            loanId: json._id
                        })
                        resolve(json)
                    })
                }
                return response.json().then(json => reject(json.meta))
            }).catch(reject)
        })
    }

    render () {
        return (
            <div className="main-view">
                <h1>Loan Details</h1>
                <div>
                    <h4>Account - {this.state.loanId}</h4>
                    <div>
                        <h6>Property Value: {numeral(this.state.propertyValue).format('$0,0.00')}</h6>
                        <h6>Loan Amount: {numeral(this.state.loanAmount).format('$0,0.00')}</h6>
                        <h6>Application Status: {this.state.loanStatus}</h6>
                    </div>
                </div>
            </div>
        )
    }
}

Loan.propTypes = {
    params: PropTypes.object.isRequired
}