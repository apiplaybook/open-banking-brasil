import React from 'react'
import { Link } from 'react-router-dom'

import { PERSONAL_LOANS, PERSONAL_ACCOUNTS, BUSINESS_LOANS } from '../../routes'
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
import rate from '../../assets/img/rate.svg'
import GitHubButton from 'react-github-btn'

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
					<HomeButtonStyled>
						<Link to={PERSONAL_LOANS}>
							<ApiCardStyled>
								<h3>Taxas de empréstimos PF</h3>
								<img src={rate} alt="Api de Empréstimos pessoa física" />
								<p>Api de Empréstimos pessoa física</p>
							</ApiCardStyled>
						</Link>
					</HomeButtonStyled>
					<HomeButtonStyled>
						<Link to={BUSINESS_LOANS}>
							<ApiCardStyled>
								<h3>Taxas de empréstimos PJ</h3>
								<img src={rate} alt="Api de Empréstimos pessoa jurídica" />
								<p>Api de Empréstimos pessoa jurídica</p>
							</ApiCardStyled>
						</Link>
					</HomeButtonStyled>
					<HomeButtonStyled>
						<Link to={PERSONAL_ACCOUNTS}>
							<ApiCardStyled>
								<h3>Tarifas Conta Pessoal</h3>
								<img src={rate} alt="Tarifas Conta Pessoal" />
								<p>Api de Conta pessoa física</p>
							</ApiCardStyled>
						</Link>
					</HomeButtonStyled>
				</HomeMainContent>
			</HomeStyled>
		</Layout>
	)
}

export default HomePage
