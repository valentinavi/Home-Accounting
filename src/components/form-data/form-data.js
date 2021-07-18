import React, {Component} from 'react';
import { Form, Field } from 'react-final-form';
import './form-data.css';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {changeStateDataRedact, changeStateData, closeFormData, closeFormItem} from '../../actions';

class FormData extends Component {
   

    render() {
       
        const {item, nameListRedact, changeStateDataRedact, urlItem, redactBtn, CalcService, changeStateData, url, idItem, closeFormData, nameList, closeFormItem, formType} = this.props;
    
        const idGenerattor = (() => {
            let res = '';
            let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
            let pos = words.length - 1;
    
            for( let i = 0; i < 5; ++i ) {
                let position = Math.floor( Math.random() * pos );
                res = position + words.substring(position, position + 1);
                return res;
            }
        });


        const nowDate = () => {
            let now = new Date();
            let date = now.getDate();
            let month = now.getMonth();
            let year = now.getFullYear();
            let today;
            if(month < 10) {
                today = `${date}-${"0" + (month + 1)}-${year}`;
            } else {
                today = `${date}-${month + 1}-${year}`;
            }
             return today;
        }

          
            const required = value => (value ? undefined : 'Required');
            const mustBeNumber = value => (isNaN(value) ? 'Must be a number' : undefined);
            const minValue = min => value =>
            value.length <= min ? `Should be greater than ${min}` : undefined;

            const maxValue = max => value => 
            value.length >= max ? `Should be less than ${max}` : undefined;

            const composeValidators = (...validators) => value =>
            validators.reduce((error, validator) => error || validator(value), undefined);
   
   

        return (
            <Form 
                onSubmit={changeStateData}

                render={({handleSubmit, form, submitting, pristine, values }) => (
                
                    <form  onSubmit={ (e) => {
                        e.preventDefault();
                        handleSubmit();

                        const newAddValues =  {
                            text: values.text, 
                            summ: values.summ,
                            date: nowDate(),
                            id:  idGenerattor()
                        }
                        
                        const newAddValuesForBank =  {
                            text: values.text, 
                            summ: values.summ,
                            date: nowDate(),
                            id:  idGenerattor(),
                            bank: 0
                        }
                        
                        const newValuesUpdate =  {
                            text: values.text, 
                            summ: values.summ,
                            date: nowDate()
                        }
                        
                        if(nameList !== 'listPiggyBank' 
                            && formType
                            && newAddValues.text.length <= 100
                            && newAddValues.text.length >= 4 
                            && newAddValues.summ.length <= 10) {
                                
                            CalcService.postData(`/${url}`, newAddValues);
                            changeStateData(newAddValues, nameList);
                            
                        }
                      
                        if(nameList === 'listPiggyBank' 
                            && formType
                            && newAddValuesForBank.text.length <= 100
                            && newAddValuesForBank.text.length >= 4 
                            && newAddValuesForBank.summ.length <= 10) {

                            CalcService.postData(`/${url}`, newAddValuesForBank);
                            changeStateData(newAddValuesForBank, nameList);    
                        }
                       
                        if(nameList !== 'listPiggyBank' 
                            && redactBtn === true 
                            && newValuesUpdate.text.length <= 100 
                            && newValuesUpdate.text.length >= 4 
                            && newValuesUpdate.summ.length <= 10) {

                             CalcService.pathResours(`/${urlItem}/${idItem}`, newValuesUpdate);
                             changeStateDataRedact(newValuesUpdate, nameListRedact, idItem);  
                        }
                     
                     
                        if(nameList === 'listPiggyBank'
                            && redactBtn === true 
                            && newValuesUpdate.text.length <= 100 
                            && newValuesUpdate.text.length >= 4 
                            && newValuesUpdate.summ.length <= 10) {

                                if(item.bank && item.widthSumm) {

                                    let widthSumm = 0;
                                    const elemWhidth = 180;
                                    widthSumm = (elemWhidth/(+values.summ)) * item.bank;
                                
                                    const valuesForBank =  {
                                        text: values.text, 
                                        summ: values.summ,
                                        date: nowDate(),
                                        id:  item.id,
                                        bank: item.bank,
                                        widthSumm: widthSumm
                                     }

                                     const pathValuesForBank =  {
                                        text: values.text, 
                                        summ: values.summ,
                                        date: nowDate(),
                                        bank: item.bank,
                                        widthSumm: widthSumm
                                     }

                                     CalcService.pathResours(`/${urlItem}/${idItem}`, pathValuesForBank);
                                     changeStateDataRedact(valuesForBank, nameList, item.id);
                                } else if(!item.bank && !item.widthSumm) {

                                    const pathValuesForBank1 =  {
                                        text: values.text, 
                                        summ: values.summ,
                                        date: nowDate(),
                                        bank: 0,
                                        widthSumm: 0
                                     }
                         
                                    CalcService.pathResours(`/${urlItem}/${idItem}`, pathValuesForBank1);
                                    changeStateDataRedact(pathValuesForBank1, nameList, item.id);
                                    }    
                            }
                        
                    }}  className="form">
            

                <button 
                    onClick = {(e) => {
                        formType ? closeFormData(nameList) : closeFormItem(idItem, nameListRedact);
                    }}
                    type="button" className="remove_form">  
                </button>

                    <Field name="text" className='form' validate={composeValidators(required, minValue(3), maxValue(100))}>
                        {({ input, meta }) => (
                          <div className='input-wrap'>
        
                            <input {...input} type="text" placeholder="Ведите текст" className='form-input'/>
                            {meta.error && meta.touched && <span>{meta.error}</span>}
                            
                          </div>
                        )}
                    </Field>

                    <Field name="summ" className='form' validate={composeValidators(mustBeNumber, required, maxValue(10))}>
                        {({ input, meta }) => (
                         <div className='input-wrap'>
    
                           <input {...input} type="number" placeholder="Ведите сумму" className='form-input'/>
                           {meta.error && meta.touched && <span>{meta.error}</span>}
                         </div>
                        )} 
                    </Field>

                    <button 
                        type="submit" 
                        disabled={submitting || pristine}
                        className="btn-save-data">Сохранить
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
    changeStateData,
    closeFormData,
    closeFormItem,
    changeStateDataRedact
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(FormData));