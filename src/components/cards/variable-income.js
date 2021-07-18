import React, {Component} from 'react';
import './index.css';
import FormData from '../form-data';
import Error from '../error';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {totalRequested, openFormData, addItem, deleteItem, openFormItem} from '../../actions';

class VariableIncome extends Component {
 
    componentDidMount() {

        const {CalcService} = this.props;
        this.props.totalRequested();

            CalcService.getData(`/variableincome`)
                    .then(data => 
                        {
                            const ol = document.querySelector('.variableIncome');
                            if(data.length > 0) {
                                this.props.addItem(data, 'listVariableIncome');
                                ol.style.background = 'rgb(247, 250, 250)';
                            } else {
                                ol.style.background = '#fff';
                            } 
                        })
                    .catch(error => this.props.Error());
            }
    

    componentDidUpdate(prevProps) {

        if(this.props.listVariableIncome.length !== prevProps.listVariableIncome.length) {
            const {CalcService} = this.props;

            CalcService.getData(`/variableincome`)
                    .then(data => {
                        const olUpdata = document.querySelector('.variableIncome');
                        if(data.length > 0) {
                            this.props.addItem(data, 'listVariableIncome');
                            olUpdata.style.background = 'rgb(247, 250, 250)';
                        } else {
                            olUpdata.style.background = '#fff';
                        }
                    })
                    .catch(error => this.props.Error());    
        }
        
    }

    render() {
        const {totalVariableIncome, buttonsAddItem, listVariableIncome, openFormData, deleteItem, openFormItem} = this.props;

        const button = buttonsAddItem.find(item => item.id === 'listVariableIncome');
        const {btn} = button;
        const nameList = "listVariableIncome";
        const form = !btn ? <FormData url = "variableincome" nameList = {nameList} formType = "addItemList"/> : null;
 
        return (
            <div>
                <div>
                    <h2>Не постоянные доходы</h2>
                    <button id = "listVariableIncome" type = "button" className = "add_item"
                        onClick = {(e) => openFormData(e)}>
                            Добавить
                    </button>

                    {form}
                    <div className = "inf">
                        <span className = "one">Дата</span> 
                        <span className = "two">Доход</span>
                        { !totalVariableIncome && totalVariableIncome !== 0 ? <div className="total three" >Итого:<div className="spinner"> </div></div> :  <span className = "total three">Итого: {totalVariableIncome} руб.</span> }    
                    </div>
                    
                    <ol className="variableIncome">
                        {  
                           listVariableIncome.map((item) => {
                                
                                const formItem = <FormData nameListRedact = {'listVariableIncome'} urlItem = "variableincome" idItem = {item.id} redactBtn = {item.redactBtn}/>
                
                                return (
                                    <li key = {item.id} className = "item"> 
                                        <div className = "wrapper-item">
                                            {!item.date ? <div className="spinner date"> </div> : <span  className="date">{item.date}</span> }
                                            {!item.text ? <div className="spinner text"> </div> : <span className="text">{item.text}</span> }
                                            {!item.summ ? <div className="spinner summ"> </div> : <span className="summ">{item.summ} </span> }
                                        </div>
                                        <button onClick= {(e)=> 
                                            {   
                                                e.preventDefault();
                                                const {CalcService} = this.props;
                                                CalcService.deleteData(`/variableincome/`, item.id);      
                                                deleteItem(item.id, 'listVariableIncome');
                                            }}
                                            className="btn-delete ">
                                        </button> 
                                            
                                        <button className="btn-redact"
                                            onClick = {(e)=> openFormItem(item.id, 'listVariableIncome')}>
                                        </button>
                                        
                                        { item.redactBtn ? formItem : null }
                                    </li>
                                ) 
                            })
                        }
                    </ol> 
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({buttonsAddItem, listVariableIncome, totalVariableIncome}) => {
    return {
        buttonsAddItem,
        listVariableIncome,
        totalVariableIncome
    }
};

const mapDispatchToProps = {
    openFormData,
    addItem,
    deleteItem,
    openFormItem,
    totalRequested
    
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(VariableIncome));

