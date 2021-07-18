

const initialState = {
    buttonPeriod: false,
    pagePeriod: false,
    formPeriod: false,
    stateButtonRedactDate: false,
    dateItem: {},
    dateList: [],
    loading: true, 
    error: false,
    buttonsAddItem: [{id: "listRegularIncome", btn: true}, {id: "listVariableIncome", btn: true}, {id: "listObligatoryExpenses", btn: true}, {id: "listOptionalExpenses", btn: true}, {id: "listPiggyBank", btn: true}],
    stateBtnRedactItem: [],

    listRegularIncome: [],
    listVariableIncome: [],
    listObligatoryExpenses: [],
    listOptionalExpenses: [],
    listPiggyBank: [],

    totalRegularIncome: 0,
    totalVariableIncome: 0,
    totalObligatoryExpenses: 0,
    totalOptionalExpenses: 0,
    totalPiggyBank: 0,
    amountOfSavings: 0,

    budget: 0,
    currentBudget: 0,
    btnStateFormBanc: [],
    itemBank: [],
    time: [{total: 0, days: 0, hours: 0, minutes: 0, seconds: 0}],
    intervalTime: 0,
    endTime: 0
    }


const reduser =  (state=initialState, action) => {
    switch (action.type) {
        case 'ADD_PERIOD':
            return {
                ...state,
                buttonPeriod: true,
                formPeriod: true,
                pagePeriod: false
            }
        case 'CLOSE_FORM_PERIOD':
            return {
                ...state,
                buttonPeriod: false,
                formPeriod: false,
                pagePeriod: true
            }


        case 'DATE_PERIOD': 
            const newArrPeriod = [action.payload];
            return {
                    ...state,
                    dateList: newArrPeriod,
                    buttonPeriod: false
            }


        case 'DATE_ERROR':
            return {
                ...state,
                loading: true,
                error: true
            }

        case 'DATE_LOADED':
           
            return {
                ...state,
                dateList: action.payload,
                loading: false,
                error: false,
                buttonPeriod: false
            };
    
        case 'DATE_REQUESTED':
            return {
                ...state,
                dateList: state.dateList,
                loading: true,
                error: false,
                buttonPeriod: false
            };

        case 'REDACT_DATE':
            return {
                ...state,
                stateButtonRedactDate: true,
                formPeriod: true,
                buttonPeriod: false,
                pagePeriod: false
            };
        
        case 'OPEN_FORM_DATA':
                
            let button = state.buttonsAddItem.find(item => item.id === action.payload.currentTarget.id);
            let index = state.buttonsAddItem.findIndex(item => item.id === button.id);

            if(action.payload.currentTarget.id == button.id) {
                
                let newButton = {
                    id: button.id, 
                    btn: !button.btn
                }
           
                return {
                    ...state,
                    buttonsAddItem: [
                        ...state.buttonsAddItem.slice(0, index),
                        newButton,
                            ...state.buttonsAddItem.slice(index + 1)
                    ]    
                }
                
            }

        case 'CLOSE_FORM_DATA':

            let form = state.buttonsAddItem.find(item => item.id === action.payload);
            let ind = state.buttonsAddItem.findIndex(item => item.id === form.id);
        
            if(action.payload === 'listRegularIncome') {
                let newForm = {
                    id: form.id, 
                    btn: true
                }
            
                return {
                    ...state,
                    buttonsAddItem: [
                        ...state.buttonsAddItem.slice(0, ind),
                        newForm,
                        ...state.buttonsAddItem.slice(ind + 1)
                    ] 
                }
             }
            
             if(action.payload === 'listVariableIncome') {
                let newForm = {
                    id: form.id, 
                    btn: true
                }
                return {
                    ...state,
                    buttonsAddItem: [
                        ...state.buttonsAddItem.slice(0, ind),
                        newForm,
                            ...state.buttonsAddItem.slice(ind + 1)
                    ]   
                }
             }

             if(action.payload === 'listObligatoryExpenses') {
                let newForm = {
                    id: form.id, 
                    btn: true
                }
      
                return {
                    ...state,
                    buttonsAddItem: [
                        ...state.buttonsAddItem.slice(0, ind),
                        newForm,
                            ...state.buttonsAddItem.slice(ind + 1)
                    ]    
                }
             }

             if(action.payload === 'listOptionalExpenses') {
                let newForm = {
                    id: form.id, 
                    btn: true
                }
      
                return {
                    ...state,
                    buttonsAddItem: [
                        ...state.buttonsAddItem.slice(0, ind),
                        newForm,
                            ...state.buttonsAddItem.slice(ind + 1)
                    ]    
                }
             }

             if(action.payload === 'listPiggyBank') {
                let newForm = {
                    id: form.id, 
                    btn: true
                }
      
                return {
                    ...state,
                    buttonsAddItem: [
                        ...state.buttonsAddItem.slice(0, ind),
                        newForm,
                            ...state.buttonsAddItem.slice(ind + 1)
                    ]   
                }
             }


         
        case 'CHANGE_STATE_DATA':   
            const item = action.payload;
            
            if(action.payload1 === 'listRegularIncome' && state.listRegularIncome.length === 0) {
                
                return {
                    ...state,
                    listRegularIncome: [
                        ...state.listRegularIncome, item
                    ],
                    totalRegularIncome: +item.summ,
                    budget: +item.summ + +state.totalVariableIncome,
                    currentBudget: (+item.summ + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                }
            } else if(action.payload1 === 'listRegularIncome' && state.listRegularIncome.length > 0) {
                const arrSumm = [...state.listRegularIncome, item];
                const arrTotal = arrSumm.map(item => item.summ);
                const total = arrTotal.reduce((result, item) => +result + +item);

                return {
                    ...state,
                    listRegularIncome: [
                        ...state.listRegularIncome, item
                    ],
                    totalRegularIncome: total,
                    budget: total + +state.totalVariableIncome,
                    currentBudget: (total + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings),
                }
            }

            
            if(action.payload1 === 'listVariableIncome' && state.listVariableIncome.length === 0) {
 
                return {
                    ...state,
                    listVariableIncome: [
                        ...state.listVariableIncome, item
                    ],
                    totalVariableIncome: +item.summ,
                    budget: +item.summ + +state.totalRegularIncome,
                    currentBudget: (+item.summ + +state.totalRegularIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                }
            } else if(action.payload1 === 'listVariableIncome' && state.listVariableIncome.length > 0) {

                const arrSumm = [...state.listVariableIncome, item];
                const arrTotal1 = arrSumm.map(item=> item.summ);
                const total = arrTotal1.reduce((result, item) => +result + +item);

                return {
                    ...state,
                    listVariableIncome: arrSumm,
                    totalVariableIncome: total,
                    budget: total + +state.totalRegularIncome,
                    currentBudget: (total + +state.totalRegularIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                }
            }

            if(action.payload1 === 'listObligatoryExpenses' && state.listObligatoryExpenses.length === 0) {
                
                return {
                    ...state,
                    listObligatoryExpenses: [
                        ...state.listObligatoryExpenses, item   
                    ],
                    totalObligatoryExpenses: item.summ,
                    budget: +state.totalVariableIncome + +state.totalRegularIncome,
                    currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+item.summ + +state.totalOptionalExpenses + +state.amountOfSavings)
                    
                }
            } else if(action.payload1 === 'listObligatoryExpenses' && state.listObligatoryExpenses.length > 0) {

                const arrSumm1 = [...state.listObligatoryExpenses, item];
                const arrTotal1 = arrSumm1.map(item=> item.summ);
                const total1 = arrTotal1.reduce((result, item) => +result + +item);
                return {
                    ...state,
                    listObligatoryExpenses: [
                        ...state.listObligatoryExpenses, item
                    ],
                    totalObligatoryExpenses: total1,
                    budget: +state.totalVariableIncome + +state.totalRegularIncome,
                    currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalObligatoryExpenses + +item.summ + +state.totalOptionalExpenses + +state.amountOfSavings)
                }
            }

            if(action.payload1 === 'listOptionalExpenses' && state.listOptionalExpenses.length === 0) {
                
                return {
                    ...state,
                    listOptionalExpenses: [
                        ...state.listOptionalExpenses, item,
                    ],
                    totalOptionalExpenses: item.summ,
                    budget: +state.totalVariableIncome + +state.totalRegularIncome,
                    currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+item.summ + +state.totalObligatoryExpenses + +state.amountOfSavings) 
                }
            } else if(action.payload1 === 'listOptionalExpenses' && state.listOptionalExpenses.length > 0) {
            
                return {
                    ...state,
                    listOptionalExpenses: [
                        ...state.listOptionalExpenses, item
                    ],
                    totalOptionalExpenses: item.summ,
                    budget: +state.totalVariableIncome + +state.totalRegularIncome,
                    currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalObligatoryExpenses + +item.summ + +state.totalOptionalExpenses + +state.amountOfSavings)
                }
            }

            if(action.payload1 === 'listPiggyBank' && state.listPiggyBank.length === 0) {
                
                return {
                    ...state,
                    listPiggyBank: [
                        ...state.listPiggyBank, item
                    ],
                    totalPiggyBank: item.summ,
                    budget: +state.totalVariableIncome + +state.totalRegularIncome,
                    currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalOptionalExpenses+ +state.totalObligatoryExpenses + +state.amountOfSavings) 
                }
            } else if(action.payload1 === 'listPiggyBank' && state.listPiggyBank.length > 0) {
                const arrBank = [...state.listPiggyBank, item];
                const arrTotalBank = arrBank.map(item=> item.summ);
                const totalBank = arrTotalBank.reduce((result, item) => +result + +item);
                return {
                    ...state,
                    listPiggyBank: [
                        ...state.listPiggyBank, item
                    ],
                    totalPiggyBank: totalBank,
                    budget: +state.totalVariableIncome + +state.totalRegularIncome,
                    currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalOptionalExpenses + +state.totalObligatoryExpenses + +state.amountOfSavings) 
                }
            }


        case 'CHANGE_STATE_DATA_REDACT':
                
                if( action.payload1 === 'listRegularIncome') {
                    const id = action.payload2;

                    const item = state.listRegularIncome.find(item => item.id === id);
                    const index = state.listRegularIncome.findIndex(item => item.id === id);
                    
                    const newItem = {
                        text: action.payload.text,
                        summ: action.payload.summ,
                        date: action.payload.date,
                        id: item.id
                    }

                    const newlistRegularIncome = [...state.listRegularIncome.slice(0, index), newItem, ...state.listRegularIncome.slice(index + 1)];
                    const arrSumm = newlistRegularIncome.map(item => item.summ);
                    let total = arrSumm.reduce((result, item) => +result + +item)

                    return {
                        ...state,
                        listRegularIncome: newlistRegularIncome,
                        totalRegularIncome: total,
                        budget: +total  + +state.totalVariableIncome,
                        currentBudget: (+total  + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                    }
                }

                if( action.payload1 === 'listVariableIncome') {
                    const id1 = action.payload2;

                    const item1 = state.listVariableIncome.find(item => item.id === id1);
                    const index1 = state.listVariableIncome.findIndex(item => item.id === id1);
                    
                    const newItem1 = {
                        text: action.payload.text,
                        summ: action.payload.summ,
                        date: action.payload.date,
                        id: item1.id
                    }

                    const newlistVariableIncome = [...state.listVariableIncome.slice(0, index1), newItem1, ...state.listVariableIncome.slice(index1 + 1)];
                    
                    const arrSumm1 = newlistVariableIncome.map(item => item.summ);
                    let total1 = arrSumm1.reduce((result, item) => +result + +item);

                    return {
                        ...state,
                        listVariableIncome: newlistVariableIncome,
                        totalVariableIncome: total1,
                        budget: + total1 + +state.totalRegularIncome,
                        currentBudget: (+total1  + +state.totalRegularIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                    }
                }

                if( action.payload1 === 'listObligatoryExpenses') {
                    const id2 = action.payload2;
    
                    const item2 = state.listObligatoryExpenses.find(item => item.id === id2);
                    const index2 = state.listObligatoryExpenses.findIndex(item => item.id === id2);

                    const newItem2 = {
                        text: action.payload.text,
                        summ: action.payload.summ,
                        date: action.payload.date,
                        id: item2.id
                    }
                  
                    const newlistObligatoryExpenses = [...state.listObligatoryExpenses.slice(0, index2), newItem2, ...state.listObligatoryExpenses.slice(index2 + 1)];
                    const arrSumm2 = newlistObligatoryExpenses.map(item => item.summ);
                    let total2 = arrSumm2.reduce((result, item) => +result + +item);

                    return {
                        ...state,
                        listObligatoryExpenses: newlistObligatoryExpenses,
                        totalObligatoryExpenses: total2,
                        budget: +state.totalVariableIncome + +state.totalRegularIncome,
                        currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalOptionalExpenses + +total2 + +state.amountOfSavings)
                    }
                }


                if( action.payload1 === 'listOptionalExpenses') {
                    const id3 = action.payload2;
    
                    const item3 = state.listOptionalExpenses.find(item => item.id === id3);
                    const index3 = state.listOptionalExpenses.findIndex(item => item.id === id3);

                    const newItem3 = {
                        text: action.payload.text,
                        summ: action.payload.summ,
                        date: action.payload.date,
                        id: item3.id
                    }
                  
                    const newlistOptionalExpenses = [...state.listOptionalExpenses.slice(0, index3), newItem3, ...state.listOptionalExpenses.slice(index3 + 1)];
                    
                    const arrSumm3 = newlistOptionalExpenses.map(item => item.summ);
                    let total3 = arrSumm3.reduce((result, item) => +result + +item);
                    return {
                        ...state,
                        listOptionalExpenses: newlistOptionalExpenses,
                        totalOptionalExpenses: total3,
                        budget: +state.totalVariableIncome + +state.totalRegularIncome,
                        currentBudget: (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalObligatoryExpenses + +total3 + +state.amountOfSavings)
                    }
                }

                if( action.payload1 === 'listPiggyBank') {

                    const id4 = action.payload2;
    
                    const item4 = state.listPiggyBank.find(item => item.id === id4);
                    const index4 = state.listPiggyBank.findIndex(item => item.id === id4);

                    const newItem4 = {
                        text: action.payload.text,
                        summ: action.payload.summ,
                        date: action.payload.date,
                        id: item4.id,
                        bank: item4.bank,
                        widthSumm: item4.widthSumm
                    }

                    const newlistPiggyBank = [...state.listPiggyBank.slice(0, index4), newItem4, ...state.listPiggyBank.slice(index4 + 1)]; 
                    const arrSumm4 = newlistPiggyBank.map(item => item.summ);
                    let total4 = arrSumm4.reduce((result, item) => +result + +item);
                 
                    return {
                        ...state,
                        listPiggyBank: newlistPiggyBank,
                        totalPiggyBank: total4
                    }
                }
    

        case 'ADD_ITEM':
            
                if(action.payload1 === 'listRegularIncome' ) {
                   
                    const arrSumm = action.payload.map(item => item.summ);
                    let total = arrSumm.reduce((result, item) => +result + +item);

                    const budget1 = +total + +state.totalVariableIncome;
                    const currentBudget1 = (+total + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings);
                    
                    return {
                        ...state,
                        listRegularIncome: action.payload,
                        totalRegularIncome: total,
                        budget: budget1,
                        currentBudget: currentBudget1,
                    } 
                }
            
                if(action.payload1 === 'listVariableIncome' ) {
                    const arrSumm1 = action.payload.map(item => item.summ);
                    let total1 = arrSumm1.reduce((result, item) => +result + +item);

                    const budget2 = +total1 + +state.totalRegularIncome;
                    const currentBudget2 = (+total1 + +state.totalRegularIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings);

                    return {
                        ...state,
                        listVariableIncome: action.payload,
                        totalVariableIncome: total1,
                        budget: budget2,
                        currentBudget: currentBudget2
                    }
                }

                if(action.payload1 === 'listObligatoryExpenses' ) {
                    const arrSumm2 = action.payload.map(item => item.summ);
                    let total2 = arrSumm2.reduce((result, item) => +result + +item);

                    const budget3 = +state.totalVariableIncome + +state.totalRegularIncome;
                    const currentBudget3 = (+state.totalVariableIncome + +state.totalRegularIncome) - (+total2 + +state.totalOptionalExpenses + +state.amountOfSavings);

                    return {
                        ...state,
                        listObligatoryExpenses: action.payload,
                        totalObligatoryExpenses: total2,
                        budget: budget3,
                        currentBudget: currentBudget3
                    }
                }

                if(action.payload1 === 'listOptionalExpenses' ) {
                    const arrSumm3 = action.payload.map(item => item.summ);
                    let total3 = arrSumm3.reduce((result, item) => +result + +item);

                    const budget4 = +state.totalVariableIncome + +state.totalRegularIncome;
                    const currentBudget4 = (+state.totalVariableIncome + +state.totalRegularIncome) - (+total3 + +state.totalObligatoryExpenses + +state.amountOfSavings);

                    return {
                        ...state,
                        listOptionalExpenses: action.payload,
                        totalOptionalExpenses: total3,
                        budget: budget4,
                        currentBudget: currentBudget4
                    }
                }

                if(action.payload.length && action.payload1 === 'listPiggyBank' ) {

                    console.log('newArr1sdfsdgфыввg', action.payload);
                    console.log('newArr1sdfsdgфыввg1', action.payload.summ);
                    console.log('newArr1sdfsdgфыввg11', state.listRegularIncome);

                    const arrSumm4 = action.payload.map(item => item.summ);
                    let total4 = arrSumm4.reduce((result, item) => +result + +item);
                    const arrSummSaving = action.payload.map(item => item.bank);

                    if(arrSummSaving.length > 0) {
                        const summSaving = arrSummSaving.reduce((result, item) => +result + +item);
                        console.log('summSavingsummSavingsummSavingsummSaving', summSaving);

                        const budget5 = +state.totalVariableIncome + +state.totalRegularIncome;
                        const currentBudget5 = (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalOptionalExpenses + +state.totalObligatoryExpenses + +summSaving);

                        return {
                            ...state,
                            listPiggyBank: action.payload,
                            totalPiggyBank: total4,
                            amountOfSavings: summSaving,
                            budget: budget5,
                            currentBudget: currentBudget5
                        }
                    } else if(arrSummSaving.length === 0) {
                        const budget6 = +state.totalVariableIncome + +state.totalRegularIncome;
                        const currentBudget6 = (+state.totalVariableIncome + +state.totalRegularIncome) - (+state.totalOptionalExpenses + +state.totalObligatoryExpenses);

                        return {
                            ...state,
                            listPiggyBank: action.payload,
                            totalPiggyBank: total4,
                            amountOfSavings: 0,
                            budget: budget6,
                            currentBudget: currentBudget6
                        }
                    }    
                }
           
       
        
        case 'DELETE_ITEM':
                console.log('zfdfsdfsdf', action.payload);
                console.log('zfdfsdfsdf11', action.payload1);
                if(action.payload1 === 'listRegularIncome') {
                    let idItem = action.payload;
                    const itemIndex = state.listRegularIncome.findIndex(item => item.id === idItem);
                    let newArr1 = [...state.listRegularIncome.slice(0, itemIndex), ...state.listRegularIncome.slice(itemIndex + 1)];
                    const item = state.listRegularIncome.find(item => item.id === idItem);
                    
                    if(newArr1.length > 0) {
                        const arrSumm = newArr1.map(item => item.summ);
                        let total = arrSumm.reduce((result, item) => +result + +item);
                        console.log('newArr1sdggsdasd', +state.totalVariableIncome + total);
                        
                        return {
                            ...state,
                            listRegularIncome: newArr1,
                            totalRegularIncome: total,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome) - +item.summ ,
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings + +item.summ)
                        };
                    } else if(newArr1.length === 0) {
                        return {
                            ...state,
                            listRegularIncome: [],
                            totalRegularIncome: 0,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome) - +item.summ ,
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings + +item.summ)

                        };
                    }
                }
               
                if(action.payload1 === 'listVariableIncome') {
                    let idItem1 = action.payload;
                    const itemIndex1 = state.listVariableIncome.findIndex(item => item.id === idItem1);
                    let newArr11 = [...state.listVariableIncome.slice(0, itemIndex1), ...state.listVariableIncome.slice(itemIndex1 + 1)];
                    const item = state.listVariableIncome.find(item => item.id === idItem1);
                    if(newArr11.length > 0) {
                        const arrSumm1 = newArr11.map(item => item.summ);
                        let total1 = arrSumm1.reduce((result, item) => +result + +item);
    
                        return {
                            ...state,
                            listVariableIncome: newArr11,
                            totalVariableIncome: total1,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome) - +item.summ ,
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings + +item.summ)
                        };

                    } else if(newArr11.length === 0) {
                        return {
                            ...state,
                            listVariableIncome: [],
                            totalVariableIncome: 0,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome) - +item.summ ,
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings + +item.summ)
                        };
                    }
                }

                if(action.payload1 === 'listObligatoryExpenses') {
                    const idItem2 = action.payload;
                    const itemIndex2 = state.listObligatoryExpenses.findIndex(item => item.id === idItem2);
                    const newArr2 = [...state.listObligatoryExpenses.slice(0, itemIndex2), ...state.listObligatoryExpenses.slice(itemIndex2 + 1)];
                    const item = state.listObligatoryExpenses.find(item => item.id === idItem2);
                    if(newArr2.length > 0) {
                        const arrSumm2 = newArr2.map(item => item.summ);
                        const total2 = arrSumm2.reduce((result, item) => +result + +item);;
    
                        return {
                            ...state,
                            listObligatoryExpenses: newArr2,
                            totalObligatoryExpenses: total2,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome),
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome + +item.summ) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                        };

                    } else if(newArr2.length === 0) {
                        return {
                            ...state,
                            listObligatoryExpenses: [],
                            totalObligatoryExpenses: 0,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome) ,
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome + +item.summ) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                        };
                    }
                }

                if(action.payload1 === 'listOptionalExpenses') {
                    const idItem3 = action.payload;
                    const itemIndex3 = state.listOptionalExpenses.findIndex(item => item.id === idItem3);
                    const newArr3 = [...state.listOptionalExpenses.slice(0, itemIndex3), ...state.listOptionalExpenses.slice(itemIndex3 + 1)];
                    const item = state.listOptionalExpenses.find(item => item.id === idItem3);
                    if(newArr3.length > 0) {
                        const arrSumm3 = newArr3.map(item => item.summ);
                        const total3 = arrSumm3.reduce((result, item) => +result + +item);
    
                        return {
                            ...state,
                            listOptionalExpenses: newArr3,
                            totalOptionalExpenses: total3,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome),
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome + +item.summ) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                        };

                    } else if(newArr3.length === 0) {
                        return {
                            ...state,
                            listOptionalExpenses: [],
                            totalOptionalExpenses: 0,
                           budget: (+state.totalRegularIncome + +state.totalVariableIncome) ,
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome + +item.summ) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                        };
                    }
                }

                if(action.payload1 === 'listPiggyBank') {
                    const idItem4 = action.payload;
                    const itemIndex4 = state.listPiggyBank.findIndex(item => item.id === idItem4);
                    const newArr4 = [...state.listPiggyBank.slice(0, itemIndex4), ...state.listPiggyBank.slice(itemIndex4 + 1)];
                    const item = state.listPiggyBank.find(item => item.id === idItem4);
                    if(newArr4.length > 0) {
                        const arrSumm4 = newArr4.map(item => item.summ);
                        const total4 = arrSumm4.reduce((result, item) => +result + +item);

                        const arrBank = newArr4.map(item => item.bank);
                        const bank = arrBank.reduce((result, item) => +result + +item);
                        console.log('fffffffhhhhdfasdddfhh1', +item.bank );
                        return {
                            ...state,
                            listPiggyBank: newArr4,
                            totalPiggyBank: total4,
                            amountOfSavings: bank,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome),
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome + +item.bank) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                        };

                    } else if(newArr4.length === 0) {
                        return {
                            ...state,
                            listPiggyBank: [],
                            totalPiggyBank: 0,
                            amountOfSavings: 0,
                            amountOfSavings: 0,
                            budget: (+state.totalRegularIncome + +state.totalVariableIncome),
                            currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome + +item.bank) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                        };
                    }
                   
    
                }



        case 'OPEN_FORM_ITEM':
                console.log('fffffffhhhhhh', action.payload);
                console.log('fffffffhhhhhh1', action.payload1);
               if(action.payload1 === 'listRegularIncome') {
                    let itemId = state.listRegularIncome.findIndex(item => item.id === action.payload);
                    let itemState = state.listRegularIncome.find(item => item.id === action.payload);
        
                    const newStateBtnRedact = {
                        text: itemState.text,
                        summ: itemState.summ,
                        id: itemState.id,
                        date: itemState.date,
                        redactBtn: true
                    }

                    const newArrStateBtnRedact = [...state.listRegularIncome.slice(0, itemId), newStateBtnRedact, ...state.listRegularIncome.slice(itemId+1)];

                    return {
                        ...state,
                        listRegularIncome: newArrStateBtnRedact
                    }
               }

                if(action.payload1 === 'listVariableIncome') {
                    let itemId1 = state.listVariableIncome.findIndex(item => item.id === action.payload);
                    let itemState1 = state.listVariableIncome.find(item => item.id === action.payload);
            
                    const newStateBtnRedact1 = {
                        text: itemState1.text,
                        summ: itemState1.summ,
                        id: itemState1.id,
                        date: itemState1.date,
                        redactBtn: true
                    }

                    const newArrStateBtnRedact1 = [...state.listVariableIncome.slice(0, itemId1), newStateBtnRedact1, ...state.listVariableIncome.slice(itemId1+1)];

                    return {
                        ...state,
                        listVariableIncome: newArrStateBtnRedact1
                    }
                } 


                if(action.payload1 === 'listObligatoryExpenses') {
                    let itemId2 = state.listObligatoryExpenses.findIndex(item => item.id === action.payload);
                    let itemState2 = state.listObligatoryExpenses.find(item => item.id === action.payload);

                    const newStateBtnRedact2 = {
                        text: itemState2.text,
                        summ: itemState2.summ,
                        id: itemState2.id,
                        date: itemState2.date,
                        redactBtn: true
                    }
    
                    const newArrStateBtnRedact2 = [...state.listObligatoryExpenses.slice(0, itemId2), newStateBtnRedact2, ...state.listObligatoryExpenses.slice(itemId2+1)];
    
                    return {
                        ...state,
                        listObligatoryExpenses: newArrStateBtnRedact2
                    }
                }

                if(action.payload1 === 'listOptionalExpenses') {
                    let itemId3 = state.listOptionalExpenses.findIndex(item => item.id === action.payload);
                    let itemState3 = state.listOptionalExpenses.find(item => item.id === action.payload);

                    const newStateBtnRedact3 = {
                        text: itemState3.text,
                        summ: itemState3.summ,
                        id: itemState3.id,
                        date: itemState3.date,
                        redactBtn: true
                    }
    
                    const newArrStateBtnRedact3 = [...state.listOptionalExpenses.slice(0, itemId3), newStateBtnRedact3, ...state.listOptionalExpenses.slice(itemId3 + 1)];
    
                    return {
                        ...state,
                        listOptionalExpenses: newArrStateBtnRedact3
                    }
                }

                if(action.payload1 === 'listPiggyBank') {
                    let itemId4 = state.listPiggyBank.findIndex(item => item.id === action.payload);
                    let itemState4 = state.listPiggyBank.find(item => item.id === action.payload);

                    const newStateBtnRedact4 = {
                        text: itemState4.text,
                        summ: itemState4.summ,
                        id: itemState4.id,
                        date: itemState4.date,
                        redactBtn: true,
                        bank: itemState4.bank,
                        widthSumm: itemState4.widthSumm
                    }
    
                    const newArrStateBtnRedact4 = [...state.listPiggyBank.slice(0, itemId4), newStateBtnRedact4, ...state.listPiggyBank.slice(itemId4 + 1)];
    
                    return {
                        ...state,
                        listPiggyBank: newArrStateBtnRedact4
                    }
                }
                
        case 'CLOSE_FORM_ITEM':

            if(action.payload1 === 'listRegularIncome') {
                let itemId = state.listRegularIncome.findIndex(item => item.id === action.payload);
                let itemState = state.listRegularIncome.find(item => item.id === action.payload);
                const newStateBtnRedact = {
                    text: itemState.text,
                    summ: itemState.summ,
                    id: itemState.id,
                    date: itemState.date,
                    redactBtn: false
                }
    
                const newArrStateBtnRedact = [...state.listRegularIncome.slice(0, itemId), newStateBtnRedact, ...state.listRegularIncome.slice(itemId+1)];
                
                return {
                    ...state,
                    listRegularIncome: newArrStateBtnRedact
                }
            }

            if(action.payload1 === 'listVariableIncome') {
                let itemId1 = state.listVariableIncome.findIndex(item => item.id === action.payload);
                let itemState1 = state.listVariableIncome.find(item => item.id === action.payload);
                const newStateBtnRedact1 = {
                    text: itemState1.text,
                    summ: itemState1.summ,
                    id: itemState1.id,
                    date: itemState1.date,
                    redactBtn: false
                }

                const newArrStateBtnRedact1 = [...state.listVariableIncome.slice(0, itemId1), newStateBtnRedact1, ...state.listVariableIncome.slice(itemId1+1)];
                 
                return {
                    ...state,
                    listVariableIncome: newArrStateBtnRedact1
                }
            }
            
            if(action.payload1 === 'listObligatoryExpenses') {
                let itemId2 = state.listObligatoryExpenses.findIndex(item => item.id === action.payload);
                let itemState2 = state.listObligatoryExpenses.find(item => item.id === action.payload);
                const newStateBtnRedact2 = {
                    text: itemState2.text,
                    summ: itemState2.summ,
                    id: itemState2.id,
                    date: itemState2.date,
                    redactBtn: false
                }
    
                const newArrStateBtnRedact2 = [...state.listObligatoryExpenses.slice(0, itemId2), newStateBtnRedact2, ...state.listObligatoryExpenses.slice(itemId2+1)];
                  
                return {
                    ...state,
                    listObligatoryExpenses: newArrStateBtnRedact2
                }
            }

            if(action.payload1 === 'listOptionalExpenses') {
                    let itemId3 = state.listOptionalExpenses.findIndex(item => item.id === action.payload);
                let itemState3 = state.listOptionalExpenses.find(item => item.id === action.payload);
                const newStateBtnRedact3 = {
                    text: itemState3.text,
                    summ: itemState3.summ,
                    id: itemState3.id,
                    date: itemState3.date,
                    redactBtn: false
                }
    
                const newArrStateBtnRedact3 = [...state.listOptionalExpenses.slice(0, itemId3), newStateBtnRedact3, ...state.listOptionalExpenses.slice(itemId3 + 1)];
                  
                return {
                    ...state,
                    listOptionalExpenses: newArrStateBtnRedact3
                }
            }
            if(action.payload1 === 'listPiggyBank') {
        
                const itemId4 = state.listPiggyBank.findIndex(item => item.id === action.payload);
                const itemState4 = state.listPiggyBank.find(item => item.id === action.payload);
                const newStateBtnRedact4 = {
                    text: itemState4.text,
                    summ: itemState4.summ,
                    id: itemState4.id,
                    date: itemState4.date,
                    redactBtn: false,
                    bank: itemState4.bank,
                    widthSumm: itemState4.widthSumm
                }
    
                const newArrStateBtnRedact4 = [...state.listPiggyBank.slice(0, itemId4), newStateBtnRedact4, ...state.listPiggyBank.slice(itemId4 + 1)];
                
                return {
                    ...state,
                    listPiggyBank: newArrStateBtnRedact4
                }
            }


        case 'TOTAL_REQUESTED':

            return {
                ...state,
                totalRegularIncome: state.totalRegularIncome,
                totalVariableIncome: state.totalVariableIncome,
                totalObligatoryExpenses: state.totalObligatoryExpenses,
                totalOptionalExpenses: state.totalOptionalExpenses,
                amountOfSavings: state.amountOfSavings
            }



        case 'OPEN_FORM_BANK':
            const itemBtn = state.listPiggyBank.find(item => item.id === action.payload);
            const idBtn = state.listPiggyBank.findIndex(item => item.id === action.payload);
            const newItem = {
                date: itemBtn.date,
                text: itemBtn.text,
                summ: itemBtn.summ,
                id: itemBtn.id,
                btnBanc: true,
                bank: itemBtn.bank,
                widthSumm: itemBtn.widthSumm 
                
            }
                
            const newlistPiggyBank = [...state.listPiggyBank.slice(0, idBtn), newItem, ...state.listPiggyBank.slice(idBtn + 1)];

            return {
                ...state,
                listPiggyBank: newlistPiggyBank
            }
       
        case 'CLOSE_FORM_BANK':     
            const itemBtn1 = state.listPiggyBank.find(item => item.id === action.payload);
            const idBtn1 = state.listPiggyBank.findIndex(item => item.id === action.payload);

            const newItem1 = {
                date: itemBtn1.date,
                text: itemBtn1.text,
                summ: itemBtn1.summ,
                id: itemBtn1.id,
                btnBanc: false,
                bank: itemBtn1.bank,
                widthSumm: itemBtn1.widthSumm  
            }

            const newlistPiggyBank1 = [...state.listPiggyBank.slice(0, idBtn1), newItem1, ...state.listPiggyBank.slice(idBtn1 + 1)];

            return {
                ...state,
                listPiggyBank: newlistPiggyBank1
            }

        case 'SAVE_STATE_BANK':

            const itemBank = state.listPiggyBank.find(item => item.id === action.payload1)

            if(typeof action.payload1 === 'string' &&
                !itemBank.bank) {

                const indexBank = state.listPiggyBank.findIndex(item => item.id === action.payload1);
                  
                const summ = Number(action.payload.bank); 
                const widthSumm = Number(action.payload.widthSumm);
                
                const newItemBank = {
                    date: itemBank.date,
                    text: itemBank.text,
                    summ: itemBank.summ,
                    id: itemBank.id,
                    btnBanc: true,
                    bank: summ,
                    widthSumm: widthSumm
                }
                    
                const arrBank = [...state.listPiggyBank.slice(0, indexBank), newItemBank, ...state.listPiggyBank.slice(indexBank + 1)];
                const arrSummSaving = arrBank.map(item => item.bank); 
                const summSaving = arrSummSaving.reduce((result, item) => +result + +item);
                    
                return {
                    ...state,
                    listPiggyBank: arrBank,
                    amountOfSavings: summSaving,
                    budget: (+state.totalRegularIncome + +state.totalVariableIncome),
                    currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome - summ) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + +state.amountOfSavings)
                 }
            } else if(typeof action.payload1 === 'string' &&
                itemBank.bank ) {
                 
                const indexBank1 = state.listPiggyBank.findIndex(item => item.id === action.payload1);
                const summ1 = Number(action.payload.bank); 
                const widthSumm1 = Number(action.payload.widthSumm);
                
                const newItemBank1 = {
                    date: itemBank.date,
                    text: itemBank.text,
                    summ: itemBank.summ,
                    id: itemBank.id,
                    btnBanc: true,
                    bank: summ1,
                    widthSumm: widthSumm1
                }
                
                const arrBank1 = [...state.listPiggyBank.slice(0, indexBank1), newItemBank1, ...state.listPiggyBank.slice(indexBank1 + 1)];
                const arrSavings = arrBank1.map(item => item.bank);
                const totalSavings = arrSavings.reduce((result, item) => +result + +item);

                const persentTransactions = +itemBank.summ/(+itemBank.bank/100);
                const persent = Math.ceil(persentTransactions);
    
                return {
                    ...state,
                    listPiggyBank: arrBank1,
                    amountOfSavings: totalSavings,
                    budget: (+state.totalRegularIncome + +state.totalVariableIncome),
                    currentBudget: (+state.totalRegularIncome + +state.totalVariableIncome) - (+state.totalObligatoryExpenses + +state.totalOptionalExpenses + totalSavings)
                }
            }
        
        case 'TIME_COUNTER':
            const endTime = state.dateList[0].finishDate;
  
            console.log('fdfdgggda', state.dateList[0].finishDate);

            let end =  new Date(endTime);
            let t =  +Date.parse(end) - +Date.parse(new Date());

            if (t >= 0) {
                let seconds =  Math.floor((t/1000) % 60); // округление Math.floor чтобы получать только целые числа, деление на 60 дает хвостик секунд, а не все секунды или целые минуты, целые минуты нам не нужны
                let minutes =  Math.floor((t/1000/60) % 60);// здесь получаем общее количество чаосв, а хвостик запишем в минуты, поэтому 2 раза на 60, % -это деление
                let hours =  Math.floor((t/(1000*60*60))); // количество целых часов
                let days =  Math.floor((t/(1000*60*60*24)));// получаем дни
    
                const newTime = {
                    total: seconds, 
                    days: days, 
                    hours: hours, 
                    minutes: minutes, 
                    seconds: seconds
                }
    
                return {
                    ...state,
                    time: [newTime],
                    intervalTime: t,
                    endTime: endTime
                }
            }

        default:
            return state;
    }
}

export default reduser;