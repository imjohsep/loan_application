import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import muiTheme from '../../themes/parkside'
import './Home.sass'

import LoanForm from '../LoanForm'

export default class Home extends Component {
  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="main-view">
          <div className="eventList-shortView">
            <h1>Loan Application</h1>
          </div>
          <div className="eventList-shortView">
            <LoanForm />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
