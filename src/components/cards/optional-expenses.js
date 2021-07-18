import React, {Component} from 'react';
import FormData from '../form-data';
import Error from '../error';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {totalRequested, openFormData, addItem, deleteItem, openFormItem} from '../../actions';
import './index.css';

class OptionalExpenses extends Component {
 
    componentDidMount() {

        const {CalcService} = this.props;
        this.props.totalRequested();

        CalcService.getData(`/optionalexpenses`)
            .then(data => 
                {
                    const ol = document.querySelector('.optionalExpenses');
                    if(data.length > 0) {
                        this.props.addItem(data, 'listOptionalExpenses'); 
                        ol.style.background = 'rgb(247, 250, 250)';
                    } else {
                        ol.style.background = '#fff';
                    }
            })
            .catch(error => this.props.Error());
    }
    

    componentDidUpdate(prevProps) {

        if(this.props.listOptionalExpenses.length !== prevProps.listOptionalExpenses.length) {
            const {CalcService} = this.props;
            
            CalcService.getData(`/optionalexpenses`)
                .then(data => {
                    const olUpdata = document.querySelector('.optionalExpenses');
                    if(data.length > 0) {
                        this.props.addItem(data, 'listOptionalExpenses');
                        olUpdata.style.background = 'rgb(247, 250, 250)';
                    } else {
                        olUpdata.style.background = '#fff';
                    }
                })
            .catch(error => this.props.Error());   
        }   
    }

    render() {
        const {totalOptionalExpenses, buttonsAddItem, listOptionalExpenses, openFormData, deleteItem, openFormItem} = this.props;

        let button = buttonsAddItem.find(item => item.id === 'listOptionalExpenses');
        const {btn} = button;
        const nameList = "listOptionalExpenses";
        const form = !btn ? <FormData  url = "optionalexpenses" nameList = {nameList} formType = "addItemList"/> : null;
 
        return (
            <div>  
                <div>
                    <h2>Не постоянные расходы</h2>
                    <button id = "listOptionalExpenses" type = "button" className = "add_item"
                        onClick = {(e) => openFormData(e)}>
                            Добавить
                    </button>

                    {form}
                    <div className = "inf">
                        <span className = "one">Дата</span> 
                        <span className = "two">Расход</span>
                        { !totalOptionalExpenses && totalOptionalExpenses !== 0 ? <div className="total three" >Итого:<div className="spinner"> </div></div> :  <span className = "total three">Итого: {totalOptionalExpenses} руб.</span> }   
                    </div>
                    <ol className="optionalExpenses">
                        {  
                           listOptionalExpenses.map((item) => {
                                const formItem =  <FormData nameListRedact = {'listOptionalExpenses'} urlItem = "optionalexpenses" idItem = {item.id} redactBtn = {item.redactBtn}/>
                            
                                return (
                                    <li key = {item.id} className = "item"> 
                                        <div className = "wrapper-item">
                                            { !item.date ? <div className="spinner date"> </div> : <span  className="date">{item.date}</span> }
                                            { !item.text ? <div className="spinner text"> </div> : <span className="text">{item.text}</span> }
                                            { !item.summ ? <div className="spinner summ"> </div> : <span className="summ">{item.summ} </span> }
                                        </div>
                                    
                                        <button onClick= {(e)=> 
                                            {   
                                                e.preventDefault();
                                                const {CalcService} = this.props;
                                                CalcService.deleteData(`/optionalexpenses/`, item.id);       
                                                deleteItem(item.id, 'listOptionalExpenses');
                                            }}
                                            className="btn-delete ">
                                        </button>

                                        <button className="btn-redact"
                                            onClick = {(e)=> openFormItem(item.id, 'listOptionalExpenses')}>
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

const mapStateToProps = ({buttonsAddItem, listOptionalExpenses, totalOptionalExpenses}) => {
    return {
        buttonsAddItem,
        listOptionalExpenses,
        totalOptionalExpenses
    }
};

const mapDispatchToProps = {
    openFormData,
    addItem,
    deleteItem,
    openFormItem,
    totalRequested    
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(OptionalExpenses));
