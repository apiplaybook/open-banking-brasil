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
import { useModal } from '../../hooks/Modal'

import { getBanksOfApi } from '../../utils/getBanksOfApi'

interface IResponsePersonalAccounts {
	name: string
	companies: ICompanies[]
}

interface ICompanies {
	name: string
	cnpjNumber: string
	urlComplementaryList: string
	businessAccounts: IBusinessAccounts[]
}

interface IBusinessAccounts {
	type: string
	fees: {
		services: IService[]
	}
	serviceBundles: IServiceBundles[]
	openingClosingChannels: []
	additionalInfo: []
	transactionMethods: []
	termsConditions: {}
	incomeRate: {}
}

interface IService {
	name: string
	code: string
	chargingTriggerInfo: string
	prices: IPrice[]
	minimum: {
		value: string
		currency: string
	}
	maximum: {
		value: string
		currency: string
	}
}

interface IPrice {
	interval: string
	value: string
	currency: string
	customers: {
		rate: number
	}
}

const PersonalLoansPage = () => {
	const [state, setState] = useState<IResponsePersonalAccounts[]>([])
	const { addMoreInfo } = useModal()

	const endpoint = '/business-accounts'
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
					company.businessAccounts.forEach((account) => {
						account.fees.services.forEach(({ code, minimum, maximum }) => {
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
		<Layout title="Comparativo - Contas Pessoa Jurídica">
			<MatrixPageStyled>
				<h3>
					Estas são todas as tarifas dos serviços prestados para contas de pessoa jurídica
					dos bancos:&nbsp;
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
							<CompanyStyled key={`company${company.name}${index}`}>
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
											<th>Informações</th>
										</tr>
									</thead>
									<tbody>
										{company.businessAccounts &&
											company.businessAccounts.map(({ type, fees, termsConditions }) =>
												fees.services.map(
													(
														{ name, chargingTriggerInfo, code, minimum, maximum },
														index
													) => (
														<tr key={`${type}${code}`}>
															<td>{code.replace(/[_\s]/g, ' ')}</td>
															<td>{type.replace(/[_\s]/g, ' ')}</td>
															<td key={`min${index}`}>{fixMoney(minimum.value)}</td>
															<td key={`max${index}`}>{fixMoney(maximum.value)}</td>
															<td>
																<button
																	onClick={() =>
																		addMoreInfo({
																			name,
																			chargingTriggerInfo,
																			termsConditions,
																		})
																	}
																	className="blue"
																>
																	Mais Informações
																</button>
															</td>
														</tr>
													)
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

export default PersonalLoansPage
