import styled from 'styled-components';

const ImageItem = styled.li`
	list-style: none;
	padding: 0;
	margin: 0;
	margin-right: 10px;
	margin-bottom: 10px;
	height: 220px;
	cursor: zoom-in;
`;

const Image = styled.img`
	width: 325px;
	height: 220px;
`;

const ImageLarge = styled.img`
	width: 100%;
	height: 100%;
`;

export { ImageItem, Image, ImageLarge };
