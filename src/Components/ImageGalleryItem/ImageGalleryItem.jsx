import React from 'react';
import { ImageItem, Image } from './ImageGalleryItem.styled';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageLarge, imageSmall, modal }) => {
	return (
		<ImageItem>
			<Image onClick={() => modal(imageLarge)} src={imageSmall} />
		</ImageItem>
	);
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
	imageSmall: PropTypes.string,
	imageLarge: PropTypes.string,
};
