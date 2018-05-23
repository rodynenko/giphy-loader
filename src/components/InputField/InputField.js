import React, { Component } from 'react';
import { func, string, arrayOf, bool } from 'prop-types';
import isArrayValid from 'utils/isArrayValid';
import closest from 'utils/closest';
import './InputField.scss';

class InputField extends Component {
	static propTypes = {
		onFocus: func.isRequired,
		onPrevSearch: func.isRequired,
		lastQueries: arrayOf(string).isRequired,
		onChange: func.isRequired,
		value: string.isRequired,
		error: string,
		disabled: bool,
		placeholder: string,
	};

	static defaultProps = {
		error: null,
		disabled: false,
		placeholder: '',
	}

	state = {
		isOpen: false,
	};

	componentWillUnmount() {
		window.removeEventListener('click', this.handleClickOut);
	}

	handleClickOut = (ev) => {
		const parent = closest(ev.target, 'input-field');

		if (!parent) {
			this.setState({ isOpen: false });
		}
	};

	handleFocus = () => {
		const { onFocus } = this.props;

		onFocus();
		this.setState({ isOpen: true });
		window.addEventListener('click', this.handleClickOut);
	}

	handleOfferClick = value => () => {
		const { onPrevSearch } = this.props;

		this.setState({ isOpen: false }, () => {
			onPrevSearch(value);
		});
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
