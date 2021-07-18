// period

const addFormPeriod = () => {
    return {
        type: 'ADD_PERIOD'
    };
};
const closeFormPeriod = (id)=> {
    return {
        type: 'CLOSE_FORM_PERIOD',
        payload: id
    }
}


const dateError = ()=> {
    return {
        type: 'DATE_ERROR'
    }
}

const dateRequested = () => {
    return {
        type: 'DATE_REQUESTED'
    }
}

const dateLoaded = (newDate) => {
    return {
        type: 'DATE_LOADED',
        payload: newDate

    }
}

const redactDate = () => {
    return {
        type: 'REDACT_DATE'
    }
}


// cards
const openFormData =(id)=> {
    return {
        type: 'OPEN_FORM_DATA',
        payload: id
    }
}

const closeFormData =(name)=> {
    return {
        type: 'CLOSE_FORM_DATA',
        payload: name
     
    }
}

const changeStateData =(newList, nameList)=> {
    return {
        type: 'CHANGE_STATE_DATA',
        payload: newList,  
        payload1: nameList  

    }
}

const changeStateDataRedact =(newItem, nameList, idItem)=> {
    return {
        type: 'CHANGE_STATE_DATA_REDACT',
        payload: newItem,  
        payload1: nameList,
        payload2: idItem

    }
}

const addItem =(newList, nameList)=> {

    return {
        type: 'ADD_ITEM',
        payload: newList,
        payload1: nameList
    }
}

const postList = () => {
    return {
        type: 'POST_LIST'
    }
}

const deleteItem = (id, nameList) => {
    return {
        type: 'DELETE_ITEM',
        payload: id,
        payload1: nameList
    }
}

const openFormItem = (id, nameList) => {
    return {
        type: 'OPEN_FORM_ITEM',
        payload: id,
        payload1: nameList
    }
}

const closeFormItem = (idItem, nameList) => {
    return {
        type: 'CLOSE_FORM_ITEM',
        payload: idItem,
        payload1: nameList
    }
}

// banc
const openFormBank = (id) => {

    return {
        type: 'OPEN_FORM_BANK',
        payload: id
    }
}

const closeFormBank = (idItem) => {

    return {
        type: 'CLOSE_FORM_BANK',
        payload: idItem
    }
}

const saveStateBank = (values, idItem) => {

    return {
        type: 'SAVE_STATE_BANK',
        payload: values,
        payload1: idItem
    }
}

const countedProgress = (summ, id) => {

    return {
        type: 'PROGRESS',
        payload: summ,
        payload1: id
    }
}

const datePeriod = (value) => {

    return {
        type: 'DATE_PERIOD',
        payload: value
    }
}

const totalRequested = () => {

    return {
        type: 'TOTAL_REQUESTED'

    }
}

const timeСounter = () => {
    return {
        type: 'TIME_COUNTER'
    }
}

const endTimeLoaded = (endTime) => {
    return {
        type: 'TIME_COUNTER',
        payload: endTime
    }
}


export {
    addFormPeriod,
    closeFormPeriod,
    dateError,
    
    dateRequested,
    dateLoaded,
    redactDate,

    openFormData,
    closeFormData,
    changeStateData,
    changeStateDataRedact,
    
    addItem,
    postList,

    deleteItem,
    openFormItem,
    closeFormItem,

    openFormBank,
    closeFormBank,

    saveStateBank,
    countedProgress,
    datePeriod,
    totalRequested,
    timeСounter,
    endTimeLoaded 
};