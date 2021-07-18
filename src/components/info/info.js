import React, {Component} from 'react';
import PropTypes from 'prop-types'; 
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {dateLoaded, dateRequested, dateError, redactDate} from '../../actions';
import Timer from '../timer';
import './info.css';

class Info extends Component {
  
    componentDidMount() {

        const {CalcService} = this.props;
        CalcService.getResours(`/period`)
        .then(res => {  
            this.props.dateLoaded(res);
            })
        .catch(error => this.props.dateError());
    }

    nowDate = () => {
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

    render() {
        const {amountOfSavings, budget, currentBudget, dateList, redactDate} = this.props;

        return (
            
            <div className = "infoWrapper">   
                <div>
   
                        {
                            dateList.map((item, index) => {
                                return (
                                    <div key="" className = "period">
                                        <div key = {item.id} className = "date-period"> Отчетный месяц: c 
                                        <span className = "text-color"> {item.startDate}</span> 
                                        по 
                                        <span className = "text-color"> {item.finishDate}</span>
                                        </div> 
                                        <Timer finish = {item.finishDate}/> 
                                    </div>
                                )
                             
                            })
                        }
                       
                    
                    <div> 
                        Дата: 
                        <span className = "text-color"> {this.nowDate()}</span>
                    </div>  
                    { 
                        !budget && budget !== 0 ? 
                        <div className="total three" >Итого:<div className="spinner"> </div></div> 
                        :   <div> Ваш бюджет: <span className = "text-color">{budget} руб</span> </div> 
                    } 
                    {
                        !currentBudget && currentBudget !== 0 ? 
                        <div className="total three" >Итого:<div className="spinner"> </div></div> 
                        :   <div> Текущий бюджет:  <span className = "text-color">{currentBudget} руб</span> </div> 
                    }

                    {
                        !currentBudget && currentBudget !== 0 ? 
                        <div className="total three" >Итого:<div className="spinner"> </div></div> 
                        :   <div> Накоплено: <span className = "text-color">{amountOfSavings} руб</span> </div> 
                    }  
                                  
                </div>
            </div>
        )    
    }  
}

Info.defaultProps = {
    interval: 1
}

Info.propTypes = {
    interval: PropTypes.number
}


const mapStateToProps = ({amountOfSavings, budget, currentBudget, dateList, error, stateButtonRedactDate, endTime}) => {
    return {
        dateList,
        error,
        stateButtonRedactDate,
        endTime,
        budget,
        currentBudget,
        amountOfSavings
    }
};

const mapDispatchToProps = {// в круглых скобках не обязательно иметь аргумент
    dateLoaded,
    dateRequested,
    dateError,
    redactDate
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(Info));





