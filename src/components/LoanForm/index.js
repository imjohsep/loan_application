import React, {Component, PropTypes} from 'react'
import numeral from 'numeral'

import Formsy, { Form, Decorator } from 'formsy-react';
import RaisedButton from 'material-ui/RaisedButton'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import CircularProgress from 'material-ui/CircularProgress'

import './LoanForm.sass'

Formsy.addValidationRule('isSocialSecuirtyNumber', (values, value) => {
  return /^(\d{3}-?\d{2}-?\d{4}|d{9})$/.test(value)
})

Formsy.addValidationRule('isCurrency', (values, value) => {
    return typeof(numeral(value).value()) === "number"
})

const submitForm = (body) => {
    return new Promise((resolve, reject) => {
        fetch('/api/loans', {
            body: JSON.stringify(body),
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                return response.json().then(json => {
                    resolve({
                        loanId: json.loanId,
                        loanStatus: json.loanStatus
                    })
                })
            }
            return response.json().then(json => reject(json.meta))
        }).catch(reject)
    })
}

export default class LoanForm extends Component {

    constructor(props) {
        super(props)

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.enableButton = this.enableButton.bind(this)
        this.disableButton = this.disableButton.bind(this)
        this.formatCurrency = this.formatCurrency.bind(this)
        
        this.state = { 
            loanAmount: null,
            propertyValue: null,
            ssn: null,
            canSubmit: false,
            loanId: null,
            status: null,
            error:null,
            formDisplay: 'visible',
            loading: false,
            statusDisplay: 'hidden'
        }

    }

    componentWillMount() {
        // this.handleFormValid = debounce(this.handleFormValid, 250).bind(this)
        // this.handleFormInvalid = debounce(this.handleFormInvalid, 250).bind(this) 
    }

    enableButton() {
        this.setState({
            canSubmit: true
        })
    }

    disableButton() {
        this.setState({
           canSubmit: false
        })
    }

    formatCurrency(e) {
        var stateChange = {}
        stateChange[e.target.name] = numeral(e.target.value).format('$0,0.00')
        this.setState(stateChange)
    }

    handleFormSubmit(values) {
        let body = {
            loanAmount: numeral(values.loanAmount).value(),
            propertyValue: numeral(values.propertyValue).value(),
            ssn: values.ssn
        }

        submitForm(body).then((response) => {
            this.setState({
                loading: true,
                formDisplay: 'hidden'
            })

            window.setTimeout(() => {
                this.setState({
                    loanId: response.loanId,
                    status: response.loanStatus,
                    formDisplay: 'hidden',
                    statusDisplay: 'visible',
                    loading: false
            })}, 4000)

            
        }).catch((error) => {
            this.setState({
                error: error
            })
        })
    }

    render() {
        let {loanAmount, propertyValue, ssn} = this.state

        return (
            <div>
                <div>
                    <h3>Mortgage Applicaiton Form</h3>
                    <p>Three easy inputs can determine if you are qualified for a loan today</p>
                </div>
                <Form 
                    className={`application-form ${this.state.formDisplay}`}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    onValidSubmit={this.handleFormSubmit}
                >
                    <FormsyText
                        className="text-input"
                        floatingLabelText="Loan Amount"
                        name="loanAmount"
                        validations="isCurrency"
                        validationError="Please enter a valid loan amount."
                        value={loanAmount}
                        onBlur={this.formatCurrency}
                        required
                    />
                    <FormsyText
                        className="text-input"
                        floatingLabelText="Property Value"
                        name="propertyValue"
                        validations="isCurrency"
                        validationError="Please enter a valid property value."
                        value={propertyValue}
                        onBlur={this.formatCurrency}
                        required
                    />
                    <FormsyText
                        className="text-input"
                        floatingLabelText="Social Security Number"
                        name="ssn"
                        validations="isSocialSecuirtyNumber"
                        validationError="Please enter a valid social security number. Eg. (xxx-xx-xxxx or xxxxxxxxx)"
                        value={ssn}
                        type="password"
                        required
                    />
                    <div>
                        <RaisedButton
                            className="form-submit-btn"
                            type="submit"
                            label="Submit"
                            disabled={!this.state.canSubmit}
                        />
                    </div>
                </Form>
                
                <div className={this.state.statusDisplay}>
                    Loan Id: {this.state.loanId}
                    <h4>
                        {this.state.status}
                    </h4>
                </div>

                {(() => {
                    if (this.state.error != null) {
                        <div>this.state.error</div>
                    }
                })()}

                {(() => {
                    if (this.state.loading) {
                       return <CircularProgress />    
                    }
                })()}
            </div>
        )
    }
}


LoanForm.propTypes = {
}
