import React from 'react'
import { Link } from 'react-router-dom'

import { PERSONAL_LOANS } from '../../routes'
import Layout from '../../components/Layout/Layout'

import {
	HomeStyled,
	LeftSideStyled,
	CardStyled,
	HomeButtonStyled,
	ApiCardStyled,
} from './Home.styled'
import home from '../../assets/img/home.svg'
import rate from '../../assets/img/rate.svg'

const HomePage = () => {
	return (
		<Layout>
			<HomeStyled>
				<LeftSideStyled>
					<CardStyled>
						<h1>Seja bem-vindo ao Open Banking!</h1>
						<p>
							&emsp;Por meio de um sistema financeiro aberto, regulamentado pelo Banco
							Central do Brasil, os dados do cliente podem ser compartilhados de forma
							segura, mediante autorização.
						</p>
					</CardStyled>
					<HomeButtonStyled>
						<Link to={PERSONAL_LOANS}>
							<ApiCardStyled>
								<h3>Comparativo de taxas</h3>
								<img src={rate} alt="Api de Empréstimos pessoa física" />
								<p>Api de Empréstimos pessoa física</p>
							</ApiCardStyled>
						</Link>
					</HomeButtonStyled>
				</LeftSideStyled>

				<img src={home} alt="" />
			</HomeStyled>
		</Layout>
	)
}

export default HomePage
