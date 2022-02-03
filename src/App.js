import React, { Component } from 'react';
import SearchBar from './Components/SearchBar/SearchBar';
import ImageGallery from './Components/ImageGallery/ImageGallery';
import { ImageLarge } from './Components/ImageGalleryItem/ImageGalleryItem.styled';
import './App.module.css';
import PropTypes from 'prop-types';
import imageAPI from './Service/getData';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
import Modal from 'react-modal';

Modal.setAppElement('#root');

class App extends Component {
	state = {
		images: [],
		pageNumber: 1,
		isLoading: false,
		imageName: '',
		isModalOpen: false,
		imageLarge: '',
	};

	modalStyles = {
		content: {
			padding: '0',
			overflow: 'hidden',
			width: '975px',
			height: '660px',
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	modalHandler = (image) => {
		this.setState({
			imageLarge: image,
			isModalOpen: !this.state.isModalOpen,
		});
	};

	getImage = (imageName) => {
		this.setState({
			imageName,
		});
	};

	componentDidUpdate(_, prevState) {
		const prevImage = prevState.imageName;
		const currentImage = this.state.imageName;

		if (prevImage !== currentImage) {
			this.setState({
				pageNumber: 1,
				images: [],
			});
		}

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
					modal={this.modalHandler}
					isLoading={this.state.isLoading}
					images={this.state.images}
					onClickMoreBtn={this.onClickLoadMoreButtton}
				/>
				<Modal
					isOpen={this.state.isModalOpen}
					onRequestClose={this.modalHandler}
					style={this.modalStyles}>
					<ImageLarge width='975' height='650' src={this.state.imageLarge} />
				</Modal>
				<ToastContainer />
			</>
		);
	}
}

App.propTypes = {
	imageName: PropTypes.string,
};

export default App;
