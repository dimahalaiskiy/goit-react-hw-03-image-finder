import React, { Component } from 'react';
import { Grid } from 'react-loader-spinner';
import { Stack } from '@mui/material';

export default class Loader extends Component {
	render() {
		return (
			<div>
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
			</div>
		);
	}
}
