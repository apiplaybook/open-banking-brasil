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
import { fixMoney } from '../../utils/fixMoney'

import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import ComparisonMatrix from '../../components/ComparisonMatrix'

import { getBanksOfApi } from '../../utils/getBanksOfApi'

const PersonalLoansPage = () => {
	const [state, setState] = useState([])

	const endpoint = '/personal-accounts'
	const banks = getBanksOfApi(endpoint)

	// Realiza as consultas às APIs
	useEffect(() => {
		;(async () => {
			const apiResponses = await callApisOpenBanking(endpoint)
			setState(apiResponses)
		})()
	}, [])

	// Organiza as informações para serem lidas pela matriz
	const typesState = useMemo(() => {
		let services = []
		let servicesList = []
		let companies = []
		state &&
			state.forEach((brand) => {
				brand.companies.forEach((company) => {
					company.personalAccounts.forEach((account) => {
						account.fees.priorityServices.forEach(({ code, minimum, maximum }) => {
							const fare = {
								code,
								name: account.type,
								minimum: minimum.value,
								maximum: maximum.value,
							}

							companies[company.name]
								? companies[company.name].push(fare)
								: (companies[company.name] = [fare])

							!servicesList.includes(code) && servicesList.push(code)
						})
					})
					servicesList.forEach((serviceCode) => {
						const servicePayload = company.name !== 'INDISPONÍVEL' && {
							...companies[company.name]
								.filter((fare) => fare.code === serviceCode)
								.map((fare) => {
									return {
										name: fare.name,
										minimum: fare.minimum,
										maximum: fare.maximum,
									}
								}),
							brand: brand.name,
							company: company.name,
						}
						services[serviceCode]
							? services[serviceCode].push(servicePayload)
							: (services[serviceCode] = [servicePayload])
					})
				})
			})

		return services
	}, [state])

	return (
		<Layout title="Comparativo - Contas Pessoa Física">
			<MatrixPageStyled>
				<h3>
					Estas são todas as taxas dos produtos e serviços para contas de pessoa fisica dos
					bancos:&nbsp;
					{banks.map((bank, index) =>
						index === 0 ? `${bank.brandName}` : `, ${bank.brandName}`
					)}
					.
				</h3>
				{state.length > 0 && (
					<ComparisonMatrix
						banks={banks}
						stateCompanies={banks
							.map((bank) => bank.brandName)
							.map(
								(requiredBrand) => state.filter((brand) => brand.name === requiredBrand)[0]
							)
							.map(({ companies }) =>
								companies.map(({ name }) => {
									return name
								})
							)
							.map((array) => Object.values(array))}
						typesState={typesState}
						fixFunction={fixMoney}
					/>
				)}

				{Object.keys(typesState).length === 0 && <Ellipsis color="#3E446C" />}
				<h3 style={{ marginTop: '50px' }}>
					Tabelas completas com as tarifas de contas para pessoas físicas.
				</h3>
				{state &&
					state.map((brand, index) =>
						brand.companies.map((company) => (
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
											<th>Taxas de juros</th>
											<th>Tipo de conta</th>
											<th>Mín</th>
											<th>Máx</th>
											<th>Termos</th>
										</tr>
									</thead>
									<tbody>
										{company.personalAccounts &&
											company.personalAccounts.map(({ type, fees, termsConditions }) =>
												fees.priorityServices.map(({ code, minimum, maximum }, index) => (
													<tr key={`${type}${code}`}>
														<td>{code.replace(/[_\s]/g, ' ')}</td>
														<td>{type.replace(/[_\s]/g, ' ')}</td>
														<td key={`min${index}`}>{fixMoney(minimum.value)}</td>
														<td key={`max${index}`}>{fixMoney(maximum.value)}</td>
														<td>
															{!termsConditions ? (
																<p>NA</p>
															) : (
																<a
																	href={termsConditions.elegibilityCriteriaInfo}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="blue"
																>
																	Termos
																</a>
															)}
														</td>
													</tr>
												))
											)}
									</tbody>
								</TableStyled>
							</CompanyStyled>
						))
					)}
			</MatrixPageStyled>
		</Layout>
	)
}

export default PersonalLoansPage
