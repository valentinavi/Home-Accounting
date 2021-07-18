import React, {Component} from 'react';
import './progress-bar.css';
import FormData from '../form-data';
import FormBank from '../form-bank';
import Error from '../error';
// import CountWhiteProgress from '../count-white-progress';


import WithCalcService from '../hoc';
import {connect} from 'react-redux';


class ProgressBar extends Component {

    render() {

        const {width, item} = this.props;

        const divStyle = {
            width: `${width}%`
        };

    const percentTransactions = (+item.bank / +item.summ) *100;
    const percent = Math.ceil(percentTransactions);

        return (
            <> 
                <div className="boxProgressBar" >

                    <div  style = {divStyle} className="progress">
                    </div>

                </div>
                {percent > 100 ? null : <div className="percent">{percent} %</div>}
            </>
        )
    }
}


const mapStateToProps = ({listPiggyBank}) => {
    return {
        listPiggyBank
    }
};
const mapDispatchToProps = {
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(ProgressBar));

