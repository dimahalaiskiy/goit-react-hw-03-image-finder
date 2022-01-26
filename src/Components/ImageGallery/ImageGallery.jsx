import React, { Component } from 'react';
import { ImageList } from './ImageGallery.styled';
import imageAPI from '../../Service/getData';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoadMoreButton from '../Button/LoadMoreButton';
import { Grid } from 'react-loader-spinner';
import { Stack } from '@mui/material';

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
				console.log(this.galleryRef);
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
				{this.state.isLoading && (
					<Stack direction='row' justifyContent='center' alignItems='center' spacing={0}>
						<Grid
							sx={{
								marginBottom: '20px',
								left: '50%',
								transform: 'translateX(-50%)',
							}}
							heigth='100'
							width='100'
							color='orange'
							ariaLabel='loading'
						/>
					</Stack>
				)}

				{this.state.images.length !== 0 && (
					<LoadMoreButton onClick={this.onClickLoadMoreButtton}></LoadMoreButton>
				)}
			</>
		);
	}
}
