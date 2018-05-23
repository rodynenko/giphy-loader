import React from 'react';
import { instanceOf, bool } from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import ResultsItem from 'components/ResultsItem';
import Spinner from 'components/Spinner';
import isArrayValid from 'utils/isArrayValid';
import isArrayEmpty from 'utils/isArrayEmpty';
import shimToJS from 'utils/shimToJS';
import './ResultsList.scss';

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
				itemsList.map(item => (
					<div key={item.id} className='results-list__item'>
						<ResultsItem {...item} />
					</div>
				))
			}
			{
				!isFetching && isArrayEmpty(itemsList) &&
				<div className='results-list__empty'>No results</div>
			}
		</div>
	);
};

ResultsList.propTypes = {
	items: instanceOf(List),
	isFetching: bool.isRequired,
};

ResultsList.defaultProps = {
	items: null,
};

export default connect(state => ({
	isFetching: state.search.get('isFetching'),
	items: state.search.getIn(['results', state.search.get('currentQuery')]),
}))(ResultsList);
