import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import WithCalcService from '../hoc';
import PagePeriod from '../page-period';// компонент высшего порядка

const App = ({CalcService}) => {
   
    return (
        <Router>
            <Switch>
                <Route path='/' exact component={PagePeriod}/>
            </Switch>
        </Router>
    )
}

export default WithCalcService()(App);