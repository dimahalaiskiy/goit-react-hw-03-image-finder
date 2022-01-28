import React, { Component } from 'react';
import { ImageList } from './ImageGallery.styled';
import imageAPI from '../../Service/getData';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoadMoreButton from '../Button/LoadMoreButton';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class ImageGallery extends Component {
	state = {
		images: [],
		pageNumber: 2,
		isLoading: false,
	};

	galleryRef = React.createRef();

	componentDidUpdate(prevProps, prevState) {
		const prevImage = prevProps.imageName;
		const currentImage = this.props.imageName;

		if (prevImage !== currentImage) {
			this.setState({
				isLoading: true,
			});

			imageAPI
				.getImages(currentImage)
				.then((images) => {
					if (images.hits.length === 0) {
						console.log('notification');
						toast('No photos with this word!');
					}
					console.log(images.hits.length);
					this.setState({
						images: images.hits,
					});
				})
				.finally(() => {
					this.setState({
						isLoading: false,
					});
				});
		}
	}

	onClickLoadMoreButtton = (e) => {
		e.preventDefault();
		const { imageName } = this.props;
		const { pageNumber } = this.state;

		this.setState({
			isLoading: true,
		});

		imageAPI
			.getImages(imageName, pageNumber)
			.then((images) => {
				this.setState({
					images: [...this.state.images, ...images.hits],
					pageNumber: pageNumber + 1,
				});
			})
			.finally(() => {
				this.setState({
					isLoading: false,
				});
				this.galleryRef.current.scrollIntoView({
					behavior: 'smooth',
					block: 'end',
				});
			});
	};

	render() {
		const { images } = this.state;
		return (
			<>
				<ToastContainer />
				<ImageList ref={this.galleryRef}>
					{images &&
						images.map((image) => {
							return (
								<ImageGalleryItem
									key={image.id}
									imageSmall={image.webformatURL}
									imageLarge={image.largeImageURL}
								/>
							);
						})}
				</ImageList>
				{this.state.isLoading && <Loader />}
				{this.state.images.length !== 0 && (
					<LoadMoreButton onClick={this.onClickLoadMoreButtton}></LoadMoreButton>
				)}
			</>
		);
	}
}

ImageGallery.propTypes = {
	images: PropTypes.array,
	pageNumber: PropTypes.number,
	isLoading: PropTypes.bool,
};
