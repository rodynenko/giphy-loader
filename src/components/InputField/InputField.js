import React, { Component } from 'react';
import isArrayValid from 'utils/isArrayValid';
import './InputField.scss';

class InputField extends Component {
	state = {
		isOpen: false,
	};

	handleFocus = () => {
		const { onFocus } = this.props;

		onFocus();
		this.setState({ isOpen: true });
	}

	handleBlur = () => {
		this.setState({ isOpen: false });
	}

	handleOfferClick = value => () => {
		const { onPrevSearch } = this.props;

		onPrevSearch(value);
	};

	render() {
		const { isOpen } = this.state;
		const {
			lastQueries,
			onChange,
			value,
			error,
			disabled,
			placeholder
		} = this.props;
		const isRecommendationOpen = isOpen && isArrayValid(lastQueries);

		return (
			<div className='input-field'>
				<input
					value={value}
					type='text'
					className='input-field__input'
					onFocus={this.handleFocus}
					onBlur={this.handleBlur}
					onChange={onChange}
					disabled={disabled}
					placeholder={placeholder}
				/>
				{
					error &&
					<div className='input-field__error'>{error}</div>
				}
				{
					isRecommendationOpen &&
					<div className='input-field__list'>
						{lastQueries.map(q => (
							<div
								role='button'
								tabIndex='-1'
								key={q}
								onClick={this.handleOfferClick(q)}
								className='input-field__list-item'
							>
								{q}
							</div>
						))}
					</div>
				}
			</div>
		);
	}
}

export default InputField;
