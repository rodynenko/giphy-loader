import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentQuery } from 'reducers/search';
import InputField from 'components/InputField';

class SearchForm extends Component {
	state = {
		query: '',
		error: null,
		lastQueries: [],
	};

	handleQueryRequest = (e) => {
		if (e) e.preventDefault();
		const { query, lastQueries } = this.state;
		const { setCurrentQuery } = this.props;

		if (query.trim().length > 0) {
			const newLastQueries = [query, ...lastQueries];

			this.setState({ lastQueries: newLastQueries }, () => {
				setCurrentQuery(query);
			});
		} else {
			this.setState({
				error: 'This field is required',
			});
		}
	};

	handleInputFocus = () => {
		const { error } = this.state;

		if (error) {
			this.setState({ error: null });
		}
	}

	handleInputChange = (ev) => {
		this.setState({ query: ev.target.value });
	};

	handlePrevSearch = (value) => {
		this.setState({ query: value }, () => {
			this.handleQueryRequest();
		});
	}

	render() {
		const { query, error, lastQueries } = this.state;
		const { isFetching } = this.props;

		return (
			<form
				className='search-form'
				onSubmit={this.handleQueryRequest}
			>
				<InputField
					value={query}
					error={error}
					onChange={this.handleInputChange}
					onFocus={this.handleInputFocus}
					placeholder='Search query'
					disabled={isFetching}
					lastQueries={lastQueries}
				/>
				<button
					type='submit'
					className='search-form__button'
					disabled={isFetching}
				>
					start
				</button>
			</form>
		);
	}
}

export default connect(state => ({
	isFetching: state.search.isFetching,
}), {
	setCurrentQuery,
})(SearchForm);
