import React, { Component } from 'react';
import { Button } from '@mui/material';

export default class LoadMoreButton extends Component {
	render() {
		return (
			<Button
				onClick={this.props.onClick}
				sx={{
					marginBottom: '20px',
					left: '50%',
					transform: 'translateX(-50%)',
				}}
				color='warning'
				variant='contained'>
				Load More
			</Button>
		);
	}
}
