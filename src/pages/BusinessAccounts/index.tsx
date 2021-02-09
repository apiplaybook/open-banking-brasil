/* eslint-disable @typescript-eslint/no-extra-semi */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'
import { Ellipsis } from 'react-spinners-css'

import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import Layout from '../../components/Layout/Layout'
import { MatrixPageStyled } from '../../styles/CallApiPage.styled'
import ComparisonMatrix from '../../components/ComparisonMatrix'
import { fixMoney } from '../../utils/fixMoney'
import { MatrixCellStyled } from '../../components/ComparisonMatrix/components/MatrixCell/MatrixCell.styled'
import { generateCellGridConfig } from '../../utils/generateGridTemplate'
import { omit } from '../../utils/omit'
import BrandMiniPayload from '../../components/ComparisonMatrix/components/BrandMiniPayload'
import { getBanksOfApi } from '../../utils/getBanksOfApi'

const PersonalLoansPage = () => {
	const [state, setState] = useState([])

	const endpoint = '/business-accounts'
	const banks = getBanksOfApi(endpoint)

	// Realiza as consultas às APIs
	useEffect(() => {
		;(async () => {
			const apiResponses = await callApisOpenBanking(endpoint)
			console.log('[apiResponses]', apiResponses)
			setState(apiResponses)
		})()
	}, [])

	// Organiza as informações para serem lidas pela matriz
	const typesState = useMemo(() => {
		let services = []
		state &&
			state.forEach((brand) => {
				brand.companies.forEach((company) => {
					company.businessAccounts.forEach((account) => {
						account.fees.services.forEach((service) => {
							// console.log('[services]', services)
							// console.log('[service]', service)
							services[service.code.replace(/[ \s]/g, '_')] = services[
								service.code.replace(/[ \s]/g, '_')
							]
								? [
										...services[service.code.replace(/[ \s]/g, '_')],
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
		console.log('[servicesaq]', services)
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
		console.log('services', services)
		return services
	}, [state])

	return (
		<Layout title="Comparativo - Contas pessoas jurídicas">
			<MatrixPageStyled>
				<h3>
					Este é um comparativo das taxas de empréstimos para pessoas jurídicas dos
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
																		).map((teste) => {
																			const { name, minimum, maximum } = teste
																			// console.log('[teste]', teste)
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
					Tabelas completas com as tarifas de serviços de conta para pessoas físicas.
				</h3>
				{/* {state &&
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
										<th>Garantias Requeridas</th>
										<th>Termos</th>
									</tr>
								</thead>
								<tbody>
									{brand.companies[0].personalLoans &&
										brand.companies[0].personalLoans.map(
											({ type, interestRates, requiredWarranties, termsConditions }) => (
												<tr key={type}>
													<td>{type.replace(/[_\s]/g, ' ')}</td>
													<td>
														{interestRates.map(
															(
																{ referentialRateIndexer, minimumRate, maximumRate },
																index
															) => (
																<p key={index}>
																	{referentialRateIndexer.replace(/[_\s]/g, ' ')}
																</p>
															)
														)}
													</td>
													<td>
														{interestRates.map(({ minimumRate }, index) => (
															<p key={`min${index}`} style={{ textAlign: 'right' }}>
																{fixTaxes(minimumRate)}%
															</p>
														))}
													</td>
													<td>
														{interestRates.map(({ maximumRate }, index) => (
															<p key={`max${index}`} style={{ textAlign: 'right' }}>
																{fixTaxes(maximumRate)}%
															</p>
														))}
													</td>
													<td>{requiredWarranties[0].replace(/[_\s]/g, ' ')}</td>
													<td>
														{termsConditions === 'NA' ? (
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
											)
										)}
								</tbody>
							</TableStyled>
						</CompanyStyled>
					))} */}
			</MatrixPageStyled>
		</Layout>
	)
}

export default PersonalLoansPage
