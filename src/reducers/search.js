import {
	API_ROOT,
	GIPHY_API_KEY,
	START,
	SUCCESS,
	ERROR,
	FETCH_GIF,
	UPDATE_CURRENT_QUERY,
} from 'store/constants';
import { RSAA } from 'redux-api-middleware';
import { fromJS } from 'immutable';

const fetchGifs = query => ({
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

export const setCurrentQuery = query => (dispatch, getState) => {
	const { search } = getState();
	const cachedResults = search.getIn(['results', query]);

	if (cachedResults) {
		dispatch({
			type: UPDATE_CURRENT_QUERY,
			meta: { query }
		});
	} else {
		dispatch(fetchGifs(query));
	}
};

const initialState = fromJS({
	isFetching: false,
	currentQuery: null,
	results: {},
});

const actionHandlers = {
	[UPDATE_CURRENT_QUERY]: (state, action) => {
		const { meta: { query } } = action;

		return state.set('currentQuery', query);
	},
	[FETCH_GIF + START]: state => state.set('isFetching', true),
	[FETCH_GIF + SUCCESS]: (state, action) => {
		const { payload, meta: { query } } = action;

		return state
			.set('isFetching', false)
			.setIn(['results', query], fromJS(payload.data));
	},
	[FETCH_GIF + ERROR]: state => state.set('isFetching', false),
};

const reducer = (state = initialState, action) => {
	const handler = actionHandlers[action.type];
	return handler ? handler(state, action) : state;
};

export default reducer;
