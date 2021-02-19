// @ts-nocheck

import React, { useState, useEffect, useMemo } from 'react'
import { Ellipsis } from 'react-spinners-css'

import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import { getBanksOfApi } from '../../utils/getBanksOfApi'
import { fixMoney } from '../../utils/fixMoney'

import ComparisonMatrix from '../../components/ComparisonMatrix'
import Layout from '../../components/Layout/Layout'
import {
	CompanyStyled,
	MatrixPageStyled,
	TableStyled,
} from '../../styles/CallApiPage.styled'

const PersonalFinancingsPage = () => {
	const [state, setState] = useState([])

	const endpoint = '/personal-financings'
	const banks = getBanksOfApi(endpoint)

	// Realiza as consultas às APIs
	useEffect(() => {
		;(async () => {
			const apiResponses = await callApisOpenBanking('/personal-financings')

			setState(apiResponses)
		})()
	}, [])

	// Organiza as informações para serem lidas pela matriz
	const typesState = useMemo(() => {
		let types = []
		state.forEach((brand) =>
			brand.companies.forEach((company) => {
				company.personalFinancings.forEach((financing) => {
					const services = financing.fees.services.map(({ name, minimum, maximum }) => {
						return {
							name: name,
							minimum: minimum.value,
							maximum: maximum.value,
						}
					})

					if (types[financing.type]) {
						types[financing.type] = [
							...types[financing.type],
							{
								...services,
								brand: brand.name,
								company: company.name,
							},
						]
					} else {
						types[financing.type] = [
							{
								...services,
								brand: brand.name,
								company: company.name,
							},
						]
					}
				})
			})
		)

		return types
	}, [state])

	return (
		<Layout title="Comparativo - Financiamento Pessoa Física">
			<MatrixPageStyled>
				<h3>
					Estas são todas as tarifas dos serviços de financiamento para pessoa física dos
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
					Tabelas completas com as tarifas dos serviços de financiamento para pessoa física:
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
											<th>Tipo de financiamento</th>
											<th>Serviço</th>
											<th>Tarifa Mín.</th>
											<th>Tarifa Máx.</th>
											<th>Termos</th>
										</tr>
									</thead>
									<tbody>
										{company.personalFinancings &&
											company.personalFinancings.map(({ type, fees, termsConditions }) =>
												fees.services.map(({ name, minimum, maximum }, index) => (
													<tr key={`${type}${name}`}>
														<td>{type.replace(/[_\s]/g, ' ')}</td>
														<td>{name.replace(/[_\s]/g, ' ')}</td>
														<td key={`min${index}`}>{fixMoney(minimum.value)}</td>
														<td key={`max${index}`}>{fixMoney(maximum.value)}</td>
														<td>
															{!termsConditions ? (
																<p>NA</p>
															) : (
																<a
																	href={termsConditions}
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

export default PersonalFinancingsPage
