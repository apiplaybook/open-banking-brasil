import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'

import {
	HomeStyled,
	LeftSideStyled,
	CardStyled,
	HomeButtonStyled,
	ApiCardStyled,
	HomeButtonRedirect,
	HomeMainContent,
	ButtonContainer,
	GitHubButtonContainer,
} from './Home.styled'
import home from '../../assets/img/home.svg'
import GitHubButton from 'react-github-btn'

import { HomeData } from './HomeData'

const HomePage = () => {
	return (
		<Layout>
			<HomeStyled>
				<GitHubButtonContainer>
					<GitHubButton
						href="https://github.com/apiplaybook/open-banking-brasil"
						data-color-scheme="no-preference: light; light: light; dark: dark;"
						data-icon="octicon-star"
						data-show-count="true"
						aria-label="Star apiplaybook/open-banking-brasil on GitHub"
						data-size="large"
					>
						Star
					</GitHubButton>
				</GitHubButtonContainer>
				<LeftSideStyled>
					<CardStyled>
						<h1>Seja bem-vindo ao Open Banking Brasil!</h1>
						<p>
							Por meio de um sistema financeiro aberto, regulamentado pelo Banco Central do
							Brasil, os dados do cliente podem ser compartilhados de forma segura, mediante
							autorização.
						</p>

						<ButtonContainer>
							<a href="#main">
								<HomeButtonRedirect>Veja todos os comparativos</HomeButtonRedirect>
							</a>
						</ButtonContainer>
					</CardStyled>
					<img src={home} alt="" />
				</LeftSideStyled>

				<HomeMainContent id="main">
					{HomeData.map((item) => (
						<HomeButtonStyled>
							<Link to={item.path}>
								<ApiCardStyled>
									<h3>{item.title}</h3>
									<img src={item.img.src} alt={item.img.alt} />
									<p>{item.description}</p>
								</ApiCardStyled>
							</Link>
						</HomeButtonStyled>
					))}
				</HomeMainContent>
			</HomeStyled>
		</Layout>
	)
}

export default HomePage
