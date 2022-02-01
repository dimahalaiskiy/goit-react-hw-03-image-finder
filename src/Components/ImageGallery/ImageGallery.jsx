import React from 'react';
import { ImageList } from './ImageGallery.styled';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import LoadMoreButton from '../Button/LoadMoreButton';
import Loader from '../Loader/Loader';
import PropTypes from 'prop-types';

const ImageGallery = ({ images, onClickMoreBtn, isLoading, modal }) => {
	return (
		<>
			<ImageList>
				{images &&
					images.map((image, index) => {
						return (
							<ImageGalleryItem
								key={index}
								imageSmall={image.webformatURL}
								imageLarge={image.largeImageURL}
								modal={modal}
							/>
						);
					})}
			</ImageList>
			{isLoading && <Loader />}
			{images.length !== 0 && <LoadMoreButton onClick={() => onClickMoreBtn()}></LoadMoreButton>}
		</>
	);
};

ImageGallery.propTypes = {
	images: PropTypes.array,
	pageNumber: PropTypes.number,
	isLoading: PropTypes.bool,
};

export default ImageGallery;
