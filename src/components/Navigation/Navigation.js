import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
	if(isSignedIn){
		return(
			<nav className='flex justify-end'>
				<p onClick={() => onRouteChange('signout')} className='pa4 dim link underline black pointer'>Sign Out</p>
			</nav>
		);
	} else {
		return(
			<nav className='flex justify-end'>
				<p onClick={() => onRouteChange('signin')} className='pa4 dim link underline black pointer'>Sign In</p>
				<p onClick={() => onRouteChange('register')} className='pa4 dim link underline black pointer'>Register</p>
			</nav>
		);
	}
		
	
}

export default Navigation;