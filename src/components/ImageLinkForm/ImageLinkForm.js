import React from 'react';
import './ImgaeLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
	return(
		<div>
			<p className='f3 tc'>
				This magic Robot will detect your faces in your pictures.
			</p>
			<div className='center'>
				<div className='form pa4 br2 shadow-5'>
					<input className='f4 pa2 w-70' type="text" onChange={onInputChange}/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onPictureSubmit}>
						Detect
					</button>
				</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;