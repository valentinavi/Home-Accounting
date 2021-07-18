import React from 'react';
import CalcServiceContext from '../calc-service-context';

const WithCalcService = () => (Wrapped) => { 
    return (props) => {  
        return (
            <CalcServiceContext.Consumer>
                {
                    (CalcService) => {
                        return <Wrapped {...props} CalcService = {CalcService}/>
                    }
                }
            </CalcServiceContext.Consumer>
        )
    }
};

export default WithCalcService;