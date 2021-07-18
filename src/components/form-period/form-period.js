import React, {Component} from 'react';
import WithCalcService from '../hoc';
import {Row} from 'reactstrap';
import {connect} from 'react-redux';
import './form-period.css';
import { Form, Field } from 'react-final-form';
import {datePeriod, closeFormPeriod} from '../../actions';

class FormPeriod extends Component {
    
    render() {
        const {dateList, datePeriod, closeFormPeriod, CalcService} = this.props;

        return (
            <Row className="row-position"  >
                   
                <Form 
                    onSubmit = {datePeriod}
            
                    render={({ handleSubmit, form, submitting, pristine, values }) => (
                
                        <form  onSubmit={ (e) => {
                            e.preventDefault();
                            handleSubmit();
                            datePeriod(values);
                   
                            if(dateList.length) {
                                CalcService.pathResours(`/period/1`, values);
                            } else if(!dateList.length){
                               
                                CalcService.postPeriod(`/period`, values);
                            }

                        }}  className='form-period'>
            
                        <button 
                            onClick = {() => closeFormPeriod()}
                            type="button" className='button-remove-form-period'>  
                        </button>

                        <label className='input-date' >Введите дату с </label>
                        <Field
                            name="startDate"
                            component="input"
                            type="date"
                            placeholder="Ведите дату" 
                            className='form-period-input' />

                        <label className='input-date' >по </label>
                        <Field
                              name="finishDate"
                              component="input"
                              type="date"
                              placeholder="Ведите сумму"
                              className='form-period-input' /> 
                        <button 
                            type="submit" 
                            disabled={submitting || pristine}
                            className='btn-save-period'>Сохранить
                        </button>
                    </form> 
                    )}
                /> 
              
          </Row> 
        )
    }  
}

const mapStateToProps = ({dateList, buttonPeriod}) => {
    return {
        dateList,
        buttonPeriod
    }
};

const mapDispatchToProps = {
    datePeriod,
    closeFormPeriod
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(FormPeriod));