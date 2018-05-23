import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setCurrentQuery } from 'reducers/search';
import InputField from 'components/InputField';

class SearchForm extends Component {
	state = {
		query: '',
		error: '',
		lastQueries: [],
	};

	handleQueryRequest = (e) => {
		e.preventDefault();
		const { query } = this.state;
		const { setCurrentQuery } = this.props;

		if (query.trim().lenght > 0) {
			setCurrentQuery(query);
		} else {
			this.setState({
				error: 'This field is required',
			});
		}
	};

	handleInputFocus = () => {
		const { error } = this.state;

		if (error) {
			this.setState({ error: '' });
		}
	}

	handleInputChange = (ev) => {

	};

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
