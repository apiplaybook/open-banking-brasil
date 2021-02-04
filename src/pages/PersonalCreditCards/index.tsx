/* eslint-disable @typescript-eslint/no-extra-semi */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'
import { Ellipsis } from 'react-spinners-css'

import Layout from '../../components/Layout/Layout'
import {
	CompanyStyled,
	MatrixPageStyled,
	TableStyled,
} from '../../styles/CallApiPage.styled'
import { brandMap } from '../../utils/brandMapTest'

import { fixMoney } from '../../utils/fixMoney'
import { banks } from '../../constants/banks'
import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import ComparisonMatrix from '../../components/ComparisonMatrix'

const PersonalCreditCardsPage = () => {
	const [state, setState] = useState([])

	// Realiza as consultas às APIs
	useEffect(() => {
		;(async () => {
			const apiResponses = await callApisOpenBanking('/personal-credit-cards')
			setState(apiResponses)
		})()
	}, [])

	// Organiza as informações para serem lidas pela matriz
	const cardsState = useMemo(() => {
		let cards = []
		state.forEach((brand) => {
			brand.companies[0].personalCreditCards.forEach((card) => {
				card.fees.services.forEach((service) => {
					cards[service.code] = cards[service.code]
						? [
								...cards[service.code],
								{
									minimum: service.minimum.value,
									maximum: service.maximum.value,
									brand: brand.name,
									cardName: card.name,
								},
						  ]
						: [
								{
									minimum: service.minimum.value,
									maximum: service.maximum.value,
									brand: brand.name,
									cardName: card.name,
								},
						  ]
				})
			})
		})
		return cards
	}, [state])

	return (
		<Layout title="Comparativo de tarifas de serviços de cartões de crédito para pessoas físicas.">
			<MatrixPageStyled>
				<h3>
					Este é um comparativo das taxas de empréstimos para pessoas físicas dos
					bancos:&nbsp;
					{banks.map((bank, index) =>
						index === 0 ? `${bank.brandName}` : `, ${bank.brandName}`
					)}
					.
				</h3>
				<ComparisonMatrix>
					{Object.keys(cardsState).map((index) => (
						<>
							<div className="mainIndex">
								<b>{index.replace(/[_\s]/g, ' ')}</b>
							</div>
							{banks
								.map((bank) => bank.brandName)
								.map((requiredBrand) => (
									<div className="mini">
										<div className="hfit">
											{cardsState[index].map(({ cardName, brand, minimum, maximum }) =>
												brandMap(
													{
														name: cardName,
														minimum,
														maximum,
														brand,
													},
													requiredBrand,
													fixMoney
												)
											)}
										</div>
									</div>
								))}
						</>
					))}
				</ComparisonMatrix>
				{Object.keys(cardsState).length === 0 && <Ellipsis color="#3E446C" />}
				<h3 style={{ marginTop: '50px' }}>
					Tabelas completas com as tarifas de serviços de cartões de crédito para pessoas
					físicas.
				</h3>
				{state &&
					state.map((brand, index) => (
						<CompanyStyled key={`company${index}`}>
							<div>
								<span>{brand.name}</span>{' '}
								<a
									href={brand.companies[0].urlComplementaryList}
									target="_blank"
									rel="noopener noreferrer"
									className="blue"
								>
									{brand.companies[0].name}
								</a>{' '}
								<span>CNPJ: {brand.companies[0].cnpjNumber}</span>
							</div>
							<TableStyled>
								<thead>
									<tr>
										<th>Tipo</th>
										<th>Taxas de juros</th>
										<th>Mín</th>
										<th>Máx</th>
									</tr>
								</thead>
								<tbody>
									{brand.companies[0].personalCreditCards &&
										brand.companies[0].personalCreditCards.map(({ name, fees }) => (
											<tr key={name}>
												<td>{name.replace(/[_\s]/g, ' ')}</td>
												<td>
													{fees.services.map(({ code }, index) => (
														<p key={index}>{code.replace(/[_\s]/g, ' ')}</p>
													))}
												</td>
												<td>
													{fees.services.map(({ minimum }, index) => (
														<p key={`min${index}`} style={{ textAlign: 'left' }}>
															{fixMoney(minimum.value)}
														</p>
													))}
												</td>
												<td>
													{fees.services.map(({ maximum }, index) => (
														<p key={`max${index}`} style={{ textAlign: 'left' }}>
															{fixMoney(maximum.value)}
														</p>
													))}
												</td>
											</tr>
										))}
								</tbody>
							</TableStyled>
						</CompanyStyled>
					))}
			</MatrixPageStyled>
		</Layout>
	)
}

export default PersonalCreditCardsPage
