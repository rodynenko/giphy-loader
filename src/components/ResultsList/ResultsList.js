import React from 'react';
import { connect } from 'react-redux';
import isArrayValid from 'utils/isArrayValid';
import isArrayEmpty from 'utils/isArrayEmpty';
import shimToJS from 'utils/shimToJS';
import ResultsItem from '../ResultsItem';

const ResultsList = (props) => {
	const {
		isFetching,
		items,
	} = props;
	const itemsList = shimToJS(items);

	return (
		<div className='results-list'>
			{isFetching && <Spinner />}
			{
				!isFetching && isArrayValid(itemsList) &&
				itemsList.map(item =>
					<div key={item.id} className='results-list__item'>
						<ResultsItem {...item} />
					</div>
				)
			}
			{
				!isFetching && isArrayEmpty(itemsList) &&
				<div className='results-list__empty'>No results</div>
			}
		</div>
	)
};

export default connect(state => ({
	isFetching: state.search.get('isFetching'),
	items: state.search.getIn(['results', state.search.get('currentQuery')]),
}))(ResultsList);
