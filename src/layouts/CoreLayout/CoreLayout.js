import React from 'react';
import SearchForm from 'components/SearchForm';
import ResultsList from 'components/ResultsList';
import './CoreLayout.scss';

const CoreLayout = () => (
	<div className='main'>
		<h1>Giphy search</h1>
		<SearchForm />
		<ResultsList />
	</div>
);

export default CoreLayout;
