import React, { Component } from 'react';
import { ImageItem, Image, ImageLarge } from './ImageGalleryItem.styled';
import Modal from 'react-modal';

const modalStyles = {
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

Modal.setAppElement('#root');

export default class ImageGalleryItem extends Component {
	state = {
		isModalOpen: false,
	};

	modalIsOpen = () => {
		this.setState({
			isModalOpen: true,
		});
	};

	closeModal = () => {
		this.setState({
			isModalOpen: false,
		});
	};

	render() {
		return (
			<ImageItem>
				<Modal
					isOpen={this.state.isModalOpen}
					onRequestClose={this.closeModal}
					style={modalStyles}>
					<ImageLarge width='975' height='650' src={this.props.imageLarge} />
				</Modal>
				<Image onClick={this.modalIsOpen} src={this.props.imageSmall} />
			</ImageItem>
		);
	}
}
