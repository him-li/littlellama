import { useState, useRef } from 'react';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Grid, Button } from '@mui/material';
import PropTypes from 'prop-types';

export default function AddImage({ formData, setFormData }) {
	const [image, setImage] = useState(null);
	const inputRef = useRef();

	const handleThumbnail = () => {
		if (!inputRef.current.files.length) {
			return;
		}

		const file = inputRef.current.files[0];
		const reader = new FileReader();
		reader.onloadend = () => {
			setImage(reader.result);
		};
		reader.readAsDataURL(file);
		setImage(file);
		setFormData({ ...formData, picture: file });
	};

	const VisuallyHiddenInput = styled('input')`
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		bottom: 0;
		left: 0;
		white-space: nowrap;
		width: 1px;
	`;
	return (
		<Grid container spacing={3}>
			{image && (
				<Grid item xs={12}>
					<img
						style={{
							width: '300px',
							borderRadius: '5px',
							boxShadow: '0 0 10px 0 rgba(0,0,0,0.5)',
						}}
						src={image}
						alt=''
					/>
				</Grid>
			)}
			<Grid item xs={12}>
				<Button
					component='label'
					variant='contained'
					startIcon={<CloudUploadIcon />}
					href='#file-upload'
					color='secondary'
					size='large'
				>
					Upload a Picture
					<VisuallyHiddenInput
						type='file'
						name='image'
						accept='image/*'
						ref={inputRef}
						onChange={handleThumbnail}
					/>
				</Button>
			</Grid>
		</Grid>
	);
}

AddImage.propTypes = {
	formData: PropTypes.object.isRequired,
	setFormData: PropTypes.func.isRequired,
};
