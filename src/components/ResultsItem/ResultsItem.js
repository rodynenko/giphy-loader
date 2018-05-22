import React, { Component } from 'react';
import './ResultsItem.scss';

class ResultsItem extends Component {
	constructor(props) {
		super(props);

		const { downsized_still: { url } } = props;

		this.state({
			imgSrc: url
		});
	}

	componentDidMount() {
		this.originalImage = new Image();

		this.originalImage.addEventListener('load', this.handleGifLoad);
	}

	handleGifLoad = () => {
		const { original: { url } } = this.props;

		this.setState({ imgSrc: url });
	};

	componentWillUnmount() {
		if (this.originalImage) {
			this.originalImage.removeEventListener('load', this.handleGifLoad);
		}
	}

	render() {
		const { imgSrc } = this.state;
		const { caption } = this.props;

		return (
			<img
				className='results-item'
				src={imgSrc}
				alt={caption}
			/>
		);
	}
}

export default ResultsItem;
