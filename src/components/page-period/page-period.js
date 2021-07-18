import React, { Component, useEffect, useState } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Info from '../info';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {RegularIncome, VariableIncome, ObligatoryExpenses, OptionalExpenses, PiggyBanc} from '../cards';
import AddPeriod from '../add-period';
import FormPeriod from '../form-period';


import './index.css';

class PagePeriod extends Component {
   
  
    componentDidUpdate(prevProps) {
       
        if(this.props.buttonPeriod !== prevProps.buttonPeriod 
            && this.props.buttonPeriod === true)  {
            let elem1 = document.querySelector('body');
            elem1.style.position = 'fixed';
            elem1.style.overflowY = 'scroll';
            elem1.style.width = '100%';

        } else  {
            let elem1 = document.querySelector('body');
            elem1.style.position = 'static';
            elem1.style.overflowY = 'auto';
            elem1.style.width = '100%';
        }

    }

    render() {
        const {buttonPeriod} = this.props;
        const formPeriod = buttonPeriod ? <FormPeriod/> : null;

        return (
            <>
                <Container className="container">
            
                    <Row>
                        <Col> 
                            <AddPeriod/>   
                        </Col> 
                    </Row>
                    
                    {formPeriod}
                    
                    <Row>
                        <Col xs="6">
                            <h1>Сводная информация</h1>
                            <Info />

                        </Col>
                        <Col xs="6">
                            <h1>Копилка покупок</h1>
                            <PiggyBanc/>
                        </Col>
                    
                    </Row>
                
                    <Row>
                        <Col xs="6">
                            <h1>Доходы</h1>
                            <RegularIncome/>
                            <VariableIncome/>
                        </Col>
                        <Col xs="6">
                        <h1>Расходы</h1>
                            <ObligatoryExpenses/>
                            <OptionalExpenses/>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    } 
}



const mapStateToProps = ({buttonPeriod}) => {
    return {
        buttonPeriod
    }
};
const mapDispatchToProps = {
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(PagePeriod));