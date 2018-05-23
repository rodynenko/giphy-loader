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

	render() {
		const { isOpen } = this.state;
		const { lastQueries, onChange, value, error } = this.props;

		return (
			<div className='input-field'>
				<input
					value={value}
					type='text'
					className='input-field__input'
					onFocus={this.handleFocus}
					onBlue={this.handleBlur}
					onChange={onChange}
				/>
				{
					error &&
					<div className='input-field__error'>{error}</div>
				}
				{
					isOpen && isArrayValid(lastQueries) &&
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
