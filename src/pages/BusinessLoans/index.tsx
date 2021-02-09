/* eslint-disable @typescript-eslint/no-extra-semi */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'
import { Ellipsis } from 'react-spinners-css'

import { fixTaxes } from '../../utils/fixTaxes'
import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import { generateCellGridConfig } from '../../utils/generateGridTemplate'
import { omit } from '../../utils/omit'
import { getBanksOfApi } from '../../utils/getBanksOfApi'

import Layout from '../../components/Layout/Layout'
import ComparisonMatrix from '../../components/ComparisonMatrix'
import {
	CompanyStyled,
	MatrixPageStyled,
	TableStyled,
} from '../../styles/CallApiPage.styled'
import { MatrixCellStyled } from '../../components/ComparisonMatrix/components/MatrixCell/MatrixCell.styled'
import BrandMiniPayload from '../../components/ComparisonMatrix/components/BrandMiniPayload'

const BusinessLoansPage = () => {
	const [state, setState] = useState([])

	const endpoint = '/business-loans'
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
		let types = []
		state &&
			state.forEach((brand) => {
				brand.companies.forEach((company) => {
					// No retorno do banco orignal ele retorna como personalLoans
					const businessLoans = company.personalLoans
						? company.personalLoans
						: company.businessLoans
					businessLoans.forEach((loan) => {
						if (types[loan.type]) {
							types[loan.type] = [
								...types[loan.type],
								{
									...loan.interestRates,
									brand: brand.name,
									company: company.name,
								},
							]
						} else {
							types[loan.type] = [
								{
									...loan.interestRates,
									brand: brand.name,
									company: company.name,
								},
							]
						}
					})
				})
			})

		return types
	}, [state])

	return (
		<Layout title="Comparativo - Empréstimo pessoa jurídica">
			<MatrixPageStyled>
				<h3>
					Este é um comparativo das taxas de empréstimos para pessoas jurídicas dos
					bancos:&nbsp;
					{banks.map((bank, index) =>
						index === 0 ? `${bank.brandName}` : `, ${bank.brandName}`
					)}
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
																		).map(
																			({
																				referentialRateIndexer,
																				minimumRate,
																				maximumRate,
																			}) => {
																				return (
																					<BrandMiniPayload
																						props={{
																							payload: {
																								name: referentialRateIndexer,
																								minimum: minimumRate,
																								maximum: maximumRate,
																								brand: brand.brand,
																							},
																							requiredBrand,
																							fixFunction: fixTaxes,
																						}}
																						key={`brandMiniPayload${requiredBrand}-${companyName}-${referentialRateIndexer}${Math.random()}`.replace(
																							/[ \s]/g,
																							'_'
																						)}
																					/>
																				)
																			}
																		)}
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
					Tabelas completas com as taxas de empréstimos para pessoas jurídica.
				</h3>
				{state &&
					state.map((brand, index) =>
						brand.companies.map((company) => (
							<CompanyStyled key={`company${company.name}`}>
								<div>
									<a
										href={company.urlComplementaryList}
										target="_blank"
										rel="noopener noreferrer"
										className="blue"
									>
										{brand.name}
									</a>{' '}
									<span>{company.name}</span> <span>CNPJ: {company.cnpjNumber}</span>
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
										{company.businessLoans &&
											company.businessLoans.map(
												(
													{ type, interestRates, requiredWarranties, termsConditions },
													i
												) => (
													<tr key={`${type}${i}`}>
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
																	{fixTaxes(minimumRate)}
																</p>
															))}
														</td>
														<td>
															{interestRates.map(({ maximumRate }, index) => (
																<p key={`max${index}`} style={{ textAlign: 'right' }}>
																	{fixTaxes(maximumRate)}
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
						))
					)}
			</MatrixPageStyled>
		</Layout>
	)
}

export default BusinessLoansPage
