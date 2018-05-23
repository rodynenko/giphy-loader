import React, { Component } from 'react';
import { shape, string } from 'prop-types';
import './ResultsItem.scss';

class ResultsItem extends Component {
	static propTypes = {
		images: shape({
			downsized_still: shape({
				url: string,
			}),
			original: shape({
				url: string,
			}),
		}).isRequired,
		title: string.isRequired,
	};

	constructor(props) {
		super(props);

		const { images: { downsized_still: { url } } } = props;

		this.state = {
			imgSrc: url
		};
	}

	componentDidMount() {
		const { images: { original: { url } } } = this.props;

		this.originalImage = new Image();
		this.originalImage.src = url;
		this.originalImage.addEventListener('load', this.handleGifLoad);
	}

	componentWillUnmount() {
		if (this.originalImage) {
			this.originalImage.removeEventListener('load', this.handleGifLoad);
		}
	}

	handleGifLoad = () => {
		const { images: { original: { url } } } = this.props;

		this.setState({ imgSrc: url });
	};

	render() {
		const { imgSrc } = this.state;
		const { title } = this.props;

		return (
			<img
				className='results-item'
				src={imgSrc}
				alt={title}
			/>
		);
	}
}

export default ResultsItem;
