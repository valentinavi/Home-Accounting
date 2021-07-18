import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import WithCalcService from '../hoc';
import {connect} from 'react-redux';
import {timeСounter, endTimeLoaded} from '../../actions';

import './timer.css';

class Timer extends Component {

    componentDidMount() {
        this.props.timeСounter(); 
        this.timerId = setInterval(this.props.timeСounter(), this.props.interval); 
    }

    componentWillUnmount () {
        clearInterval(this.timerId);
    }

    render() {
        
        const {time, intervalTime} = this.props;

        const {days, hours, minutes, seconds} = time[0];

        const d = days < 10 ? '0' + days : days;
        const h = hours < 10 ? '0' + hours : hours;
        const m = minutes < 10 ? '0' + minutes : minutes;
        const s = seconds < 10 ? '0' + seconds : seconds;
        const counter = `${d} дней`;
        
        return (
            <div> До конца отчетного периода осталось: <span className="text-color">{counter}</span></div>
        )
    }
}


Timer.defaultProps = {
    interval: 3000
}

Timer.propTypes = {
    interval: PropTypes.number
}

const mapStateToProps = ({time}) => {
    return {
        time
    }
};

const mapDispatchToProps = {
    timeСounter,
    endTimeLoaded
}

export default WithCalcService()(connect(mapStateToProps, mapDispatchToProps)(Timer));


