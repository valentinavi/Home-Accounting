import React, {Component} from 'react';
// import {Col, Row, Container} from 'reactstrap';
import './add-period.css';
import {addFormPeriod} from '../../actions';
import FormPeriod from '../form-period';
import PagePeriod from'../page-period'
import WithCalcService from '../hoc';
import Error from '../error';
import {connect} from 'react-redux';



class AddPeriod extends Component {


    render() {
        const {buttonPeriod, addFormPeriod, dateList} = this.props;
        
        console.log('saddsddd', dateList);
        
        const text = dateList.length > 0 ? "Редактировать отчетный период" : "Добавить отчетный период";
      
            return ( 
                <button className='btn-add-period'
                    onClick = {()=> addFormPeriod()}>
                    {text}
                </button>
            )
        }
    // }  
}


const mapStateToProps = ({buttonPeriod, dateList}) => {
    return {
        buttonPeriod,
        dateList
    }
};
const mapDispatchToProps = {
    addFormPeriod
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(AddPeriod));