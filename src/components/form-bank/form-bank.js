import React, {Component} from 'react';
import { Form, Field } from 'react-final-form'
import './form-bank.css';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {closeFormBank, saveStateBank} from '../../actions';

class FormBank extends Component {

    render() {

        const {item, closeFormBank, saveStateBank, CalcService} = this.props;

        const required = value => (value ? undefined : 'Required');
        const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
        const minValue = min => value =>
        value.length <= min ? `Should be greater than ${min}` : undefined;

        const maxValue = max => value => 
        value.length >= max ? `Should be less than ${max}` : undefined;
  
        const maxSumm = max => value => 
        +value >= +item.summ ? `Should be less than ${+item.summ}` : undefined;

        const composeValidators = (...validators) => value =>
        validators.reduce((error, validator) => error || validator(value), undefined);

        return (
            <Form 
                onSubmit = {saveStateBank}
        
                render = {({handleSubmit, form, submitting, pristine, values }) => (
                
                    <form  
                        onSubmit = {(e) => {
                            e.preventDefault();
                            handleSubmit();
                            let summ = Number(values.summ);
                            
                            let widthSumm = 0;
                            if(item.bank) {
                                widthSumm = (100/(+item.summ)) * (summ + +item.bank);
                                const object = {
                                    bank: +item.bank + summ,
                                    widthSumm: widthSumm
                                }
             
                                if(object.bank > item.summ) {
                                    return null;
                                } else if(object.bank <= item.summ) {
                                    saveStateBank(object, item.id);
                                    CalcService.pathPiggyBanc(`/piggybanc/${item.id}`, object);
                                }
                            } else if(!item.bank && item.id){
                                widthSumm = (100/(+item.summ)) * summ;
                                const object1 = {
                                    bank: summ,
                                    widthSumm: widthSumm
                                }
                             
                                if(+item.summ < summ) {
                                    return null;
                                } else if(+item.summ >= summ) {
                                    saveStateBank(object1, item.id);
                                    CalcService.pathPiggyBanc(`/piggybanc/${item.id}`, object1);
                                }
                            }  
                        }}  
                        className = "form-banc">
                    <button 
                        onClick = {(e) => closeFormBank(item.id)}
                        type = "button" className = "close_form"> 
                    </button>

                    <Field name = "summ" className = 'form' validate={composeValidators(mustBeNumber, required, minValue(0), maxValue(10), maxSumm(+item.summ))}>
                        {({ input, meta }) => (
                          <div className = 'input-wrap-bank'>
        
                            <input {...input} type = "text" placeholder = "Сколько копим?"/>
                            { meta.error && meta.touched && <span>{meta.error}</span> } 
                            
                          </div>
                        )}
                    </Field>
         
                    <button 
                        type = "submit" 
                        disabled = {submitting || pristine}
                        className = "btn-save-bank">Сохранить
                    </button>
                </form> 
                )}
            />
        )
    }
}

const mapStateToProps = ({}) => {
    return {
    }
};
const mapDispatchToProps = {
    closeFormBank,
    saveStateBank
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(FormBank));

