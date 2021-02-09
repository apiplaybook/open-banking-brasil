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
import { MatrixCellStyled } from '../../components/ComparisonMatrix/components/MatrixCell/MatrixCell.styled'
import BrandMiniPayload from '../../components/ComparisonMatrix/components/BrandMiniPayload'
import { getBanksOfApi } from '../../utils/getBanksOfApi'
import { generateCellGridConfig } from '../../utils/generateGridTemplate'
import { omit } from '../../utils/omit'

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
		state &&
			state.forEach((brand) => {
				brand.companies.forEach((company) => {
					brand.companies[0].personalAccounts.forEach((account) => {
						account.fees.priorityServices.forEach((service) => {
							services[service.code] = services[service.code]
								? [
										...services[service.code],
										{
											name: account.type,
											minimum: service.minimum.value,
											maximum: service.maximum.value,
											brand: brand.name,
											company: company.name,
										},
								  ]
								: [
										{
											name: account.type,
											minimum: service.minimum.value,
											maximum: service.maximum.value,
											brand: brand.name,
											company: company.name,
										},
								  ]
						})
					})
				})
			})
		let lastBrand = false
		let fixedBrand = []
		let fixedType = []
		Object.keys(services).forEach((typeIndex) => {
			services[typeIndex].forEach((brand, brandIndex) => {
				if (lastBrand === false) {
					if (services[typeIndex].length === brandIndex + 1) {
						services[typeIndex] = [brand]
						lastBrand = false
					}
					lastBrand = brand
				} else {
					if (brand.brand === lastBrand.brand && brand.company === lastBrand.company) {
						if (fixedBrand.length === 0) {
							fixedBrand.push(omit('company', omit('brand', lastBrand)))
						}
						fixedBrand.push(omit('company', omit('brand', brand)))
						lastBrand = brand
					} else {
						if (fixedBrand.length > 0) {
							fixedBrand = {
								...fixedBrand,
								brand: lastBrand.brand,
								company: lastBrand.company,
							}
							fixedType.push(fixedBrand)
						} else {
							fixedBrand.push(omit('company', omit('brand', lastBrand)))

							fixedBrand = {
								...fixedBrand,
								brand: lastBrand.brand,
								company: lastBrand.company,
							}
							fixedType.push(fixedBrand)
						}
						lastBrand = brand
						fixedBrand = []
					}
				}
				if (services[typeIndex].length === brandIndex + 1) {
					if (brand.brand !== lastBrand.brand || brand.company !== lastBrand.company) {
						fixedType.push(brand)
					}
					services[typeIndex] = fixedType
					fixedType = []
					lastBrand = false
				}
			})
		})
		return services
	}, [state])

	return (
		<Layout title="Comparativo - Contas Pessoa Física.">
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
					<>
						<ComparisonMatrix
							banks={banks}
							stateCompanies={banks
								.map((bank) => bank.brandName)
								.map(
									(requiredBrand) =>
										state.filter((brand) => brand.name === requiredBrand)[0]
								)
								.map(({ companies }) =>
									companies.map(({ name }) => {
										return name
									})
								)
								.map((array) => Object.values(array))}
						>
							{Object.keys(typesState).map((index) => (
								<React.Fragment key={`fragment${index}`}>
									<div className="mainIndex" key={`mainIndex${index}`}>
										<b>{index.replace(/[_\s]/g, ' ')}</b>
									</div>
									{banks
										.map((bank) => bank.brandName)
										.map((requiredBrand) => (
											<MatrixCellStyled
												gridConfig={generateCellGridConfig(
													banks.filter(({ brandName }) => brandName === requiredBrand)[0]
														.companies.length
												)}
												key={`matrixCell${requiredBrand}_${index}${Math.random()}`}
												id="matrixCell"
											>
												{typesState[index].map((brand) => {
													return banks
														.filter(({ brandName }) => brandName === requiredBrand)[0]
														.companies.map((companyName, cIndex) => {
															return (
																omit('brand', brand).company === companyName &&
																brand.brand === requiredBrand && (
																	<div
																		id={companyName}
																		className={`cellCompanyColumn cellCompanyColumn${cIndex}`}
																		key={`cellCompanyColumn${companyName}${cIndex}${Math.random()}`}
																	>
																		{Object.values(
																			omit('company', omit('brand', brand))
																		).map(({ name, minimum, maximum }) => {
																			return (
																				<BrandMiniPayload
																					props={{
																						payload: {
																							name,
																							minimum,
																							maximum,
																							brand: brand.brand,
																						},
																						requiredBrand,
																						fixFunction: fixMoney,
																					}}
																					key={`brandMiniPayload${requiredBrand}-${companyName}-${name}${Math.random()}`.replace(
																						/[ \s]/g,
																						'_'
																					)}
																				/>
																			)
																		})}
																	</div>
																)
															)
														})
												})}
											</MatrixCellStyled>
										))}
								</React.Fragment>
							))}
						</ComparisonMatrix>
					</>
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
