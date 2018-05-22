import {
	API_ROOT,
	GIPHY_API_KEY,
	START,
	SUCCESS,
	ERROR,
	FETCH_GIF,
} from 'store/constants';
import { RSAA } from 'redux-api-middleware';
import { fromJS } from 'immutable';

export const fetchGifs = query => dispatch => dispatch({
	[RSAA]: {
		method: 'GET',
		endpoint: `${API_ROOT}/gifs/search?q=${encodeURIComponent(query)}&api_key=${GIPHY_API_KEY}`,
		types: [
			FETCH_GIF + START,
			{
				type: FETCH_GIF + SUCCESS,
				meta: { query }
			},
			FETCH_GIF + ERROR,
		]
	}
});

const initialState = fromJS({
	isFetching: false,
	results: {},
});

const actionHandlers = {
	[FETCH_GIF + START]: state => state.set('isFetching', true),
	[FETCH_GIF + SUCCESS]: (state, action) => {
		const { payload, meta: { query } } = action;

		return state
			.set('isFetching', false)
			.setIn(['results', query], fromJS(payload.data));
	},
	[FETCH_GIF + ERROR]: state => state.set('isFetching', false)
};

const reducer = (state = initialState, action) => {
	const handler = actionHandlers[action.type];
	return handler ? handler(state, action) : state;
};

export default reducer;
