import React, {Component} from 'react';
import FormData from '../form-data';
import Error from '../error';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {totalRequested, openFormData, addItem, deleteItem, openFormItem} from '../../actions';
import './index.css';

class ObligatoryExpenses extends Component {
 
    componentDidMount() {
        const {CalcService} = this.props;
        this.props.totalRequested();

        CalcService.getData(`/obligatoryexpenses`)
            .then(data => 
                {  
                    const ol = document.querySelector('.obligatoryExpenses');
                    if(data.length > 0) {
                        this.props.addItem(data, 'listObligatoryExpenses');
                    }  else {
                        ol.style.background = '#fff';
                    }
                })
              
            .catch(error => this.props.Error());
    }
    

    componentDidUpdate(prevProps) {

        if(this.props.listObligatoryExpenses.length !== prevProps.listObligatoryExpenses.length) {
            const {CalcService} = this.props;
     
            CalcService.getData(`/obligatoryexpenses`)
                .then(data => {
                    const olUpdata = document.querySelector('.obligatoryExpenses');

                    if(data.length > 0) {
                        this.props.addItem(data, 'listObligatoryExpenses');
                        olUpdata.style.background = 'rgb(247, 250, 250)';
                    } else {
                        olUpdata.style.background = '#fff';
                    }
                })
                .catch(error => this.props.Error());   
        }   
    }

    render() {
        const {totalObligatoryExpenses, buttonsAddItem, listObligatoryExpenses, openFormData, deleteItem, openFormItem} = this.props;

        const button = buttonsAddItem.find(item => item.id === 'listObligatoryExpenses');
        const {btn} = button;
        const nameList = "listObligatoryExpenses";
        const form = !btn ? <FormData   url = "obligatoryexpenses" nameList = {nameList} formType = "addItemList"/> : null;
 
        return (
            <div>   
                <div>
                    <h2>Постоянные расходы</h2>
                    <button id = "listObligatoryExpenses" type = "button" className = "add_item"
                        onClick = {(e) => openFormData(e)}>
                            Добавить
                    </button>

                    {form}
                    <div className = "inf">
                        <span className = "one">Дата</span> 
                        <span className = "two">Расход</span>
                        { !totalObligatoryExpenses && totalObligatoryExpenses !== 0 ? <div className="total three" >Итого:<div className="spinner"> </div></div> :  <span className = "total three">Итого: {totalObligatoryExpenses} руб.</span> }          
                    </div>
                    <ol className="obligatoryExpenses">
                        {  
                           listObligatoryExpenses.map((item) => {
                                const formItem = <FormData nameListRedact = {'listObligatoryExpenses'} urlItem = "obligatoryexpenses" idItem = {item.id} redactBtn = {item.redactBtn}/>
                              
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
                                                CalcService.deleteData(`/obligatoryexpenses/`, item.id); 
                                                deleteItem(item.id, 'listObligatoryExpenses');
                                            }}
                                            className = "btn-delete ">
                                        </button> 
                                        <button className = "btn-redact"
                                            onClick = {(e)=> openFormItem(item.id, 'listObligatoryExpenses')}>
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


const mapStateToProps = ({buttonsAddItem, listObligatoryExpenses, totalObligatoryExpenses}) => {
    return {
        buttonsAddItem,
        listObligatoryExpenses,
        totalObligatoryExpenses
    }
};
const mapDispatchToProps = {
    openFormData,
    addItem,
    deleteItem,
    openFormItem,
    totalRequested
    
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(ObligatoryExpenses));

