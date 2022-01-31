import React, { Component } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import './App.module.css';
import PropTypes from 'prop-types';
import imageAPI from './Service/getData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';

class App extends Component {
	state = {
		images: [],
		pageNumber: 1,
		isLoading: false,
		imageName: '',
	};

	getImage = (imageName) => {
		this.setState({
			imageName,
		});
	};

	componentDidUpdate(_, prevState) {
		const prevImage = prevState.imageName;
		const currentImage = this.state.imageName;

		if (prevImage !== currentImage || prevState.pageNumber !== this.state.pageNumber) {
			this.setState({
				isLoading: true,
			});

			imageAPI
				.getImages(currentImage, this.state.pageNumber)
				.then((images) => {
					if (images.hits.length === 0) {
						toast('No photos with this word!');
					}
					this.setState({
						images: [...this.state.images, ...images.hits],
					});
				})
				.finally(() => {
					this.setState({
						isLoading: false,
					});
				});
		}
	}

	onClickLoadMoreButtton = () => {
		this.setState({
			pageNumber: this.state.pageNumber + 1,
		});
		scroll.scrollToBottom();
	};

	render() {
		return (
			<>
				<SearchBar getImage={this.getImage} />
				<ImageGallery
					isLoading={this.state.isLoading}
					images={this.state.images}
					onClickMoreBtn={this.onClickLoadMoreButtton}
				/>
				<ToastContainer />
			</>
		);
	}
}

App.propTypes = {
	imageName: PropTypes.string,
};

export default App;
