
import * as React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory, browserHistory } from 'react-router'

import { App } from './Components/App'
import { Create } from './Components/Create'
import { Login } from './Components/Login'

render((


    <Router history={browserHistory} >
        <Route path="/items" component={App} />
        <Route path="/create" component={Create} />
        <Route path="/login" component={Login} />

    </Router>
), document.getElementById('main'))


