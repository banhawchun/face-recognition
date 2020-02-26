import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import Bot from './Bot.png';

const Logo = () => {
	return(
		<Tilt className="Tilt br2 shadow-5 ml5" options={{ max : 45 }} style={{ height: 200, width: 200 }} >
		 <div className="Tilt-inner tc pa3">
		 	<img style={{paddingTop: '35px'}} alt="Logo" src={Bot}/>
		 </div>
		</Tilt>
	);
}

export default Logo;