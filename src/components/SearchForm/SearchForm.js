import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentQuery } from 'reducers/search';

class SearchForm extends Component {
	state = {
		query: '',
		lastQueries: [],
	};

	componentDidMount() {
		this.props.setCurrentQuery('fun cat');
	}

	render() {
		return (
			<div />
		);
	}
}

export default connect(null, {
	setCurrentQuery,
})(SearchForm);
