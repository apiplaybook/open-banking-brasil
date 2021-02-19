// @ts-nocheck

import React, { useState, useEffect, useMemo } from 'react'

import { callApisOpenBanking } from '../../services/callApisOpenBanking'
import { getBanksOfApi } from '../../utils/getBanksOfApi'
import { fixMoney } from '../../utils/fixMoney'
import { useModal } from '../../hooks/Modal'

import ComparisonMatrix from '../../components/ComparisonMatrix'
import Layout from '../../components/Layout/Layout'
import {
	MatrixPageStyled,
	CompanyStyled,
	TableStyled,
} from '../../styles/CallApiPage.styled'

interface IResponseBusinessCreditCard {
	name: string
	companies: ICompanies[]
}

interface ICompanies {
	name: string
	cnpjNumber: string
	urlComplementaryList: string
	businessCreditCards: IBusinessCreditCards[]
}

interface IBusinessCreditCards {
	name: string
	identification: {
		product: {
			type: string
			additionalInfo: string
		}
		creditCard: {
			network: string
			additionalInfo: string
		}
	}
	rewardsProgram: {
		hasRewardProgram: boolean
		rewardProgramInfo: string
	}
	fees: {
		services: IService[]
	}
	interest: IInterest[]
	termsConditions: {
		minimumFeeRate: string
		additionalInfo: string | null
		elegibilityCriteriaInfo: string
		closingProcessInfo: string
	}
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

interface IInterest {
	rates: IRates[]
	instalmentRates: IInstalmentRates[]
	otherCredits: IOtherCredits[]
}

const BusinessCreditCardsPage = () => {
	const [state, setState] = useState<IResponseBusinessCreditCard[]>([])
	const { addMoreInfo } = useModal()

	const endpoint = '/business-credit-cards'
	const banks = getBanksOfApi(endpoint)

	// Realiza as consultas às APIs
	useEffect(() => {
		;(async () => {
			const apiResponses = await callApisOpenBanking('/business-credit-cards')

			setState(apiResponses)
		})()
	}, [])

	// Organiza as informações para serem lidas pela matriz
	const typesState = useMemo(() => {
		let services = []
		let servicesList = []
		let companies = []
		state.forEach((brand) =>
			brand.companies.forEach((company) => {
				company.businessCreditCards.forEach((creditCard) => {
					creditCard.fees.services.forEach(({ code, minimum, maximum }) => {
						const fare = {
							code,
							name: creditCard.name,
							minimum: minimum.value,
							maximum: maximum.value,
						}
						if (fare.minimum !== 'NA' || fare.maximum !== 'NA') {
							companies[company.name]
								? companies[company.name].push(fare)
								: (companies[company.name] = [fare])
							!servicesList.includes(code) && servicesList.push(code)
						}
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
		)

		return services
	}, [state])

	return (
		<>
			<Layout title="Comparativo - Cartões de crédito Pessoa Jurídica">
				<MatrixPageStyled>
					<h3>
						Estas são todas as tarifas dos serviços de cartões de crédito para pessoa
						jurídica dos bancos:&nbsp;
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
									(requiredBrand) =>
										state.filter((brand) => brand.name === requiredBrand)[0]
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
					<h3 style={{ marginTop: '50px' }}>
						Tabelas completas com as taxas de cartão de crédito para pessoa Jurídica.
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
										</a>
										<span>CNPJ: {brand.companies[0].cnpjNumber}</span>
									</div>
									<TableStyled>
										<thead>
											<tr>
												<th>Serviço</th>
												<th>Cartão</th>
												<th>Emissor</th>
												<th>Mín</th>
												<th>Máx</th>
												<th>Informações</th>
											</tr>
										</thead>
										<tbody>
											{company.businessCreditCards &&
												company.businessCreditCards.map(
													({ identification, fees, termsConditions }) =>
														fees.services.map(
															(
																{ code, name, chargingTriggerInfo, maximum, minimum },
																index
															) => (
																<tr key={`${code}`}>
																	<td>{code.replace(/[_\s]/g, ' ')}</td>
																	<td>
																		{identification.product.type.replace(/[_\s]/g, ' ')}
																	</td>
																	<td>
																		{identification.creditCard.network.replace(
																			/[_\s]/g,
																			' '
																		)}
																	</td>
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
		</>
	)
}

export default BusinessCreditCardsPage
