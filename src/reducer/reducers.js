import * as types from '../src/constant/actionTypes.js.js';


const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.types) {
    case 'UPDATE_TYPE': 
    state.count += 1;

    return {
      ...state,    
    }

    default: return state;
  }
}


export default reducer;