import React, {Component} from 'react';
import './index.css';
import FormData from '../form-data';
import Error from '../error';
import Info from '../info';
import { Spinner } from 'reactstrap';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {totalRequested, openFormData, addItem, deleteItem, openFormItem} from '../../actions';

class RegularIncome extends Component {
 
    componentDidMount() {
        const {CalcService} = this.props;
        this.props.totalRequested();

        CalcService.getData(`/regularincome`)
            .then(data => 
                {
                    const ol = document.querySelector('.regularIncome');
                    if(data.length > 0) {
                        this.props.addItem(data, 'listRegularIncome'); 
                        
                        ol.style.background = 'rgb(247, 250, 250)';
                    } else {
                        ol.style.background = '#fff';
                    } 
                })  
            .catch(error => this.props.Error());
    }
    

    componentDidUpdate(prevProps) {

        if(this.props.listRegularIncome.length !== prevProps.listRegularIncome.length) {
            const {CalcService} = this.props;
            CalcService.getData(`/regularincome`)
                .then(data => {
                    const olUpdata = document.querySelector('.regularIncome');
                    if(data.length > 0) {
                        this.props.addItem(data, 'listRegularIncome');
                        olUpdata.style.background = 'rgb(247, 250, 250)';
                    } else {
                        olUpdata.style.background = '#fff';
                    }

                })
                .catch(error => this.props.Error());   
        }    
    }

    render() {
        const {budget, totalRegularIncome, buttonsAddItem, listRegularIncome, openFormData, deleteItem, openFormItem} = this.props;
        console.log('ololololol11', listRegularIncome);
       
        <Info budget={budget}/>

        let button = buttonsAddItem.find(item => item.id === 'listRegularIncome');
        const {btn} = button;
        const nameList = "listRegularIncome";
        const form = !btn ? <FormData url="regularincome" nameList={nameList} formType="addItemList"/> : null;
        
        return (
            <div> 
          
          
                <div>
                    <h2>Постоянные доходы</h2>
                    <button id = "listRegularIncome" type="button" className="add_item"
                        onClick={(e) => openFormData(e)}>
                            Добавить
                    </button>

                    {form}
                    <div className="inf">
                        <span className="one">Дата</span> 
                        <span className="two">Доход</span>
                        { !totalRegularIncome && totalRegularIncome !== 0 ? <div className="total three" >Итого:<div className="spinner"> </div></div> :  <span className = "total three">Итого: {totalRegularIncome} руб.</span> }                  
                    </div>
                    <ol className="regularIncome">
                        {  
                           listRegularIncome.map((item) => {
                                const formItem = <FormData nameListRedact={'listRegularIncome'} urlItem="regularincome" idItem={item.id} redactBtn = {item.redactBtn}/>
                              
                                return (
                                    <li key={item.id} className = "item"> 
                                        <div className="wrapper-item">
                                            
                                            { !item.date ? <div className="spinner date"> </div> : <span  className="date">{item.date}</span> }
                                            { !item.text ? <div className="spinner text"> </div> : <span className="text">{item.text}</span> }
                                            { !item.summ ? <div className="spinner summ"> </div> : <span className="summ">{item.summ} </span> }
                                            
                                        </div>
                                        
                                        <button onClick= {(e)=> 
                                            {   
                                                e.preventDefault();
                                                const {CalcService} = this.props;
                                                CalcService.deleteData(`/regularincome/`, item.id);      
                                                deleteItem(item.id, 'listRegularIncome');
                                            }}
                                            className="btn-delete ">
                                        </button> 

                                        <button className="btn-redact"
                                            onClick= {(e)=> openFormItem(item.id, 'listRegularIncome')}>
                                        </button>
                                        
                                        

                                         {item.redactBtn ? formItem : null}
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


const mapStateToProps = ({buttonsAddItem, listRegularIncome, totalRegularIncome, budget, currentBudget}) => {
    return {
        buttonsAddItem,
        listRegularIncome,
        totalRegularIncome,
        budget, 
        currentBudget
    }
};
const mapDispatchToProps = {
    openFormData,
    addItem,
    deleteItem,
    openFormItem,
    totalRequested 
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(RegularIncome));

