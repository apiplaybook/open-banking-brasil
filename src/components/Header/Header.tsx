import React from 'react'
import { Link } from 'react-router-dom'
import { HOME } from '../../routes'
import { HeaderStyled, LinkStars } from './Header.styled'

import logo from '../../assets/img/apiplaybook-logo.png'

const Header = ({ title }: { title?: string }) => {
	return (
		<HeaderStyled>
			<Link to={HOME}>
				<img src={logo} alt="API Playbook" />
			</Link>
			{title && <h1>{title}</h1>}

			<LinkStars>
				<a
					className="github-button"
					href="https://github.com/apiplaybook/open-banking-brasil"
					data-color-scheme="no-preference: light; light: light; dark: dark;"
					data-icon="octicon-star"
					data-size="large"
					data-show-count="true"
					aria-label="Star apiplaybook/open-banking-brasil on GitHub"
				>
					Star
				</a>
			</LinkStars>
		</HeaderStyled>
	)
}

export default Header
