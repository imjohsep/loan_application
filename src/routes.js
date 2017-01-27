import React from 'react'
import {Route} from 'react-router'
import App from './components/App'
import Home from './components/Home'
import Loan from './components/Loan'
import NotFound from './components/NotFound'

import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

const routes = (
  <Route component={App}>
    <Route path='/' component={Home} />
    <Route path='/loans/:loanId' component={Loan} />
    <Route path='/*' component={NotFound} />
  </Route>
)

export default routes
