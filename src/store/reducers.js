import { combineReducers } from 'redux';
import searchReducer from 'reducers/search';

export default combineReducers({
	search: searchReducer,
});
