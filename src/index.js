import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import ErrorBoundry from './components/error-boundry';
import CalcService from './services/calc-service';
import CalcServiceContext from './components/calc-service-context';
import store from './store';
import {Col, Row, Container} from 'reactstrap';



const calcService = new CalcService();
ReactDOM.render(
        <Provider store={store}>
            <ErrorBoundry> 
                <CalcServiceContext.Provider value={calcService}>
                    <Router>
                        <App/>
                    </Router>
                </CalcServiceContext.Provider>
            </ErrorBoundry>
        </Provider>

    , document.getElementById('root'));


