import React, {Component} from 'react';
import FormData from '../form-data';
import FormBank from '../form-bank';
import ProgressBar from '../progress-bar';
import Error from '../error';
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {totalRequested, openFormBank, openFormData, addItem, deleteItem, openFormItem} from '../../actions';
import './index.css';

class PiggyBanc extends Component {
 
    componentDidMount() {
        const {CalcService} = this.props;
        this.props.totalRequested();
        CalcService.getData(`/piggybanc`)
                .then(data => 
                    {
                        const ol = document.querySelector('.piggyBank');
                        if(data.length > 0) {
                            this.props.addItem(data, 'listPiggyBank'); 
                            ol.style.background = 'rgb(247, 250, 250)';
                        } else {
                            ol.style.background = '#fff';
                        }
                    })
                .catch(error => this.props.Error());
    }
    

    componentDidUpdate(prevProps) {

        if(this.props.listPiggyBank.length !== prevProps.listPiggyBank.length) {
            const {CalcService} = this.props;
            CalcService.getData(`/piggybanc`)
                .then(data => {
                    const olUpdata = document.querySelector('.piggyBank');
                    if(data.length > 0) {
                        this.props.addItem(data, 'listPiggyBank');
                        olUpdata.style.background = 'rgb(247, 250, 250)';
                    } else {
                        olUpdata.style.background = '#fff';
                    }
                })
                .catch(error => this.props.Error());    
        }     
    }

    render() {
        const {amountOfSavings, openFormBank, buttonsAddItem, listPiggyBank, openFormData, deleteItem, openFormItem} = this.props;
        const button = buttonsAddItem.find(item => item.id === 'listPiggyBank');
        const {btn} = button;
        const nameList = "listPiggyBank";
        const form = !btn ? <FormData  url = "piggybanc" nameList={nameList} formType = "addItemList"/> : null;
        return (
            <div> 
                <div>
                    <button id = "listPiggyBank" type = "button" className = "add_item"
                        onClick = {(e) => openFormData(e)}>
                            Добавить
                    </button>

                    {form}
                    <div className="inf">
                        <span className = "one-bank">Дата</span> 
                        <span className = "two-bank">Цель</span>
                        <span className = "two1-bank">Cумма</span>
                        { !amountOfSavings && amountOfSavings !== 0 ? <div className="total three-bank" >Банк:<div className="spinner"> </div></div> :  <span className = "total three-bank">Банк: {amountOfSavings}</span> }  
                           
                    </div>
                    <ol className="piggyBank">
                        {  
                           listPiggyBank.map( (item) =>  {
                                const bank = Number(item.bank); 
                                const formItem =  <FormData item={item} nameListRedact={'listPiggyBank'} urlItem="piggybanc" idItem={item.id} redactBtn = {item.redactBtn} bankSumm={bank}/>
                                const formBank = <FormBank item={item} btnBanc = {item.btnBanc} />
                                
                                return (
                                    <li key = {item.id} className = "item"> 
                                        <div className = "wrapper-item">
                                            <span  className = "date-bank">{item.date}</span>
                                            <div className = "text-bank">
                                               
                                                <span>{item.text}</span>
                                                { bank ? <ProgressBar width = {item.widthSumm} item = {item}/> : null }
                                            </div>
                            
                                            <span className = "summ-bank">{item.summ}</span>
                                            { +item.bank > +item.summ ? null : <span className = "bank">{item.bank}</span> }
                                        </div>
                                    
                                        <button onClick = {(e)=> 
                                            {   
                                                e.preventDefault();
                                                const {CalcService} = this.props;
                                               
                                                CalcService.deleteData(`/piggybanc/`, item.id);     
                                                deleteItem(item.id, 'listPiggyBank');
                                            }}
                                            type = "button" className = "btn-delete ">
                                        </button> 
        
                                        {
                                            bank >= item.summ ? null : <button type = "button" className = "btn-redact"
                                                onClick= {(e)=> openFormItem(item.id, 'listPiggyBank')}>
                                            </button>
                                        }

                                        {
                                            bank >= item.summ ? <span className = "goal">Готово</span> : 
                                            <button onClick = {(e) => openFormBank(item.id)} 
                                                type = "button" className = "btn-banc"> 
                                            </button> 
                                        }

                                        
                                        { item.redactBtn ? formItem : null }
                                        { item.btnBanc ? formBank : null }
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


const mapStateToProps = ({buttonsAddItem, listPiggyBank, amountOfSavings}) => {
    return {
        buttonsAddItem,
        listPiggyBank,
        amountOfSavings
    }
};
const mapDispatchToProps = {
    openFormData,
    addItem,
    deleteItem,
    openFormItem,
    openFormBank,
    totalRequested
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(PiggyBanc));

