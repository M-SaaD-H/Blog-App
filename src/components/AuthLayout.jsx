// This is a Protected Container -> It helps in conditionally redering its children -> like to show its childrens to logged in users only

import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
	const navigate = useNavigate();

	const [loader, setLoader] = useState(true);
	// Check this line it is state.status or state.auth.status
	const authStatus = useSelector(state => state.auth.status);

	useEffect(() => {
		if(authentication &&authStatus !== authentication) {
			navigate('/login');
		} else if(!authentication && authStatus !== authentication) {
			navigate('/');
		}
		
		setLoader(false);
	}, [authStatus, navigate, authentication])

  return (
    <div>
      
    </div>
  )
}