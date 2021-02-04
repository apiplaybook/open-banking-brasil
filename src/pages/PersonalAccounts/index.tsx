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
import { brandMap } from '../../utils/brandMapTest'

import { banks } from '../../constants/banks'
import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import ComparisonMatrix from '../../components/ComparisonMatrix'

const PersonalLoansPage = () => {
	const [state, setState] = useState([])

	// Realiza as consultas às APIs
	useEffect(() => {
		;(async () => {
			const apiResponses = await callApisOpenBanking('/personal-accounts')
			setState(apiResponses)
		})()
	}, [])

	// Organiza as informações para serem lidas pela matriz
	const typesState = useMemo(() => {
		let types = []
		state &&
			state.forEach((brand) => {
				brand.companies[0].personalAccounts.forEach((account) => {
					account.fees.priorityServices.forEach((service) => {
						console.log(account.type)
						types[account.type] = types[account.type]
							? [
									...types[account.type],
									{
										name: service.code,
										minimum: service.minimum.value,
										maximum: service.maximum.value,
										brand: brand.name,
									},
							  ]
							: [
									{
										name: service.code,
										minimum: service.minimum.value,
										maximum: service.maximum.value,
										brand: brand.name,
									},
							  ]
					})
				})
			})
		return types
	}, [state])

	return (
		<Layout title="Comparativo de taxas feito com base na API de Contas PF.">
			<MatrixPageStyled>
				<h3>
					Estas são todas as taxas dos produtos e serviços para contas de pessoa fisica dos
					bancos:&nbsp;
					{banks.map((bank, index) =>
						index === 0 ? `${bank.brandName}` : `, ${bank.brandName}`
					)}
					.
				</h3>
				<ComparisonMatrix>
					{Object.keys(typesState).map((index) => (
						<>
							<div className="mainIndex">
								<b>{index.replace(/[_\s]/g, ' ')}</b>
							</div>
							{banks
								.map((bank) => bank.brandName)
								.map((requiredBrand) => (
									<div className="mini">
										<div className="hfit">
											{typesState[index].map(({ name, brand, minimum, maximum }) =>
												brandMap(
													{
														name,
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
				{Object.keys(typesState).length === 0 && <Ellipsis color="#3E446C" />}
				<h3 style={{ marginTop: '50px' }}>
					Tabelas completas com as taxas de empréstimos para pessoas físicas.
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
										<th>Tipo de conta</th>
										<th>Taxas de juros</th>
										<th>Mín</th>
										<th>Máx</th>
										<th>Termos</th>
									</tr>
								</thead>
								<tbody>
									{brand.companies[0].personalAccounts &&
										brand.companies[0].personalAccounts.map(
											({ type, fees, termsConditions }) =>
												fees.priorityServices.map(({ code, minimum, maximum }, index) => (
													<tr key={`${type}${code}`}>
														<td>{type.replace(/[_\s]/g, ' ')}</td>
														<td>{code.replace(/[_\s]/g, ' ')}</td>
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
					))}
			</MatrixPageStyled>
		</Layout>
	)
}

export default PersonalLoansPage
