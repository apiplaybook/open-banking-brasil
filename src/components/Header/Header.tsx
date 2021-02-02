import React from 'react'
import { Link } from 'react-router-dom'
import { HOME } from '../../routes'
import { HeaderStyled } from './Header.styled'

import logo from '../../assets/img/apiplaybook-logo.png'

const Header = ({ title }: { title?: string }) => {
	return (
		<HeaderStyled>
			<Link to={HOME}>
				<img src={logo} alt="API Playbook" />
			</Link>
			{title && <h1>{title}</h1>}
		</HeaderStyled>
	)
}

export default Header
