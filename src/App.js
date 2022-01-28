import React, { Component } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import './App.module.css';
import PropTypes from 'prop-types';

class App extends Component {
	state = {
		imageName: '',
	};

	getImage = (imageName) => {
		this.setState({
			imageName,
		});
	};
	render() {
		return (
			<>
				<SearchBar getImage={this.getImage} />
				<ImageGallery imageName={this.state.imageName} />
			</>
		);
	}
}

App.propTypes = {
	imageName: PropTypes.string,
};

export default App;
