import React, { Component } from 'react';
import { Header } from './SearchBarStyles';
import SearchIcon from '@mui/icons-material/Search';
import { Paper, IconButton, InputBase } from '@mui/material';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
	state = {
		imageName: '',
	};

	getImageName = (e) => {
		this.setState({
			imageName: e.target.value,
		});
	};

	render() {
		return (
			<Header>
				<Paper
					component='form'
					sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}>
					<InputBase
						onChange={this.getImageName}
						type='text'
						autoComplete='off'
						sx={{ ml: 1, flex: 1 }}
						placeholder='Search images and photos'
						inputProps={{ 'aria-label': 'Search images and photos' }}
					/>
					<IconButton
						onClick={(e) => {
							e.preventDefault();
							this.props.getImage(this.state.imageName);
						}}
						type='submit'
						sx={{ p: '10px' }}
						aria-label='search'>
						<SearchIcon />
					</IconButton>
				</Paper>
			</Header>
		);
	}
}

SearchBar.propTypes = {
	imageName: PropTypes.string,
};
