// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'
import { Ellipsis } from 'react-spinners-css'

import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import { banks } from '../../constants/banks'
import { fixTaxes } from '../../utils/fixTaxes'
import { omit } from '../../utils/omit'

import Layout from '../../components/Layout/Layout'
import ComparisonMatrix from '../../components/ComparisonMatrix'
import BrandMiniPayload from '../../components/ComparisonMatrix/components/BrandMiniPayload'
import {
	CompanyStyled,
	MatrixPageStyled,
	TableStyled,
} from '../../styles/CallApiPage.styled'

const PersonalLoansPage = () => {
	const [state, setState] = useState([])
	const omitApis = ['Itaú']
	// Realiza as consultas às APIs
	useEffect(() => {
		;(async () => {
			const apiResponses = await callApisOpenBanking('/personal-loans', omitApis)
			setState(apiResponses)
		})()
	}, [])
	// Organiza as informações para serem lidas pela matriz
	const typesState = useMemo(() => {
		let types = []
		state.forEach((brand) => {
			brand.companies[0].personalLoans.forEach((loan) => {
				if (types[loan.type]) {
					types[loan.type] = [
						...types[loan.type],
						{
							...loan.interestRates,
							brand: brand.name,
						},
					]
				} else {
					types[loan.type] = [
						{
							...loan.interestRates,
							brand: brand.name,
						},
					]
				}
			})
		})
		return types
	}, [state])

	return (
		<Layout title="Comparativo de taxas feito com base na API de Empréstimo pessoa física.">
			<MatrixPageStyled>
				<h3>
					Este é um comparativo das taxas de empréstimos para pessoas físicas dos
					bancos:&nbsp;
					{banks
						.filter((bank) => !omitApis.includes(bank.brandName))
						.map((bank, index) =>
							index === 0 ? `${bank.brandName}` : `, ${bank.brandName}`
						)}
					.
				</h3>
				<ComparisonMatrix omit={omitApis}>
					{Object.keys(typesState).map((index) => (
						<>
							<div className="mainIndex">
								<b>{index.replace(/[_\s]/g, ' ')}</b>
							</div>
							{banks
								.filter((bank) => !omitApis.includes(bank.brandName))
								.map((bank) => bank.brandName)
								.map((requiredBrand) => (
									<div className="mini">
										{/* <div className="hfit"> */}

										{typesState[index].map((brand) => {
											return Object.values(omit('brand', brand)).map(
												({ referentialRateIndexer, minimumRate, maximumRate }) => (
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
													/>
												)
											)
										})}
										{/* </div> */}
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
					))}
			</MatrixPageStyled>
		</Layout>
	)
}

export default PersonalLoansPage
