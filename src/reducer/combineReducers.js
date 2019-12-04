import { combineReducers } from 'redux';

// import all reducers here
import Reducers from './reducers.js';


// combine reducers
const reducers = combineReducers({
  // if we had other reducers, they would go here
  data: Reducers,
});

// make the combined reducers available for import
export default reducers;