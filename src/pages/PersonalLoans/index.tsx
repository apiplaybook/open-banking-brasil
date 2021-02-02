/* eslint-disable @typescript-eslint/no-extra-semi */
// @ts-nocheck
import React, { useState, useEffect, useMemo } from 'react'

import { callOpenBankingApiPersonalLoans } from '../../services/api'
import Layout from '../../components/Layout/Layout'
import {
	CompanyStyled,
	ComparisonMatrixStyled,
	PersonalLoansStyled,
	TableStyled,
} from './PersonalLoans.styled'
import { fixTaxes } from '../../utils/fixTaxes'
import { brandMap } from '../../utils/brandMap'

import bbLogo from '../../assets/img/bb-logo.jpg'
import bancoPanLogo from '../../assets/img/banco-pan-logo.svg'
import bradescoLogo from '../../assets/img/bradesco-logo.png'
import itauLogo from '../../assets/img/itau-logo.webp'
import nextLogo from '../../assets/img/next-logo.svg'

const PersonalLoansPage = () => {
	// const [state, setState] = useState({})
	const [state, setState] = useState([])
	// const [typesState, setTypesState] = useState([])
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
	useEffect(() => {
		try {
			;(async () => {
				const urls = [
					'https://bb-api.concore.io',
					'https://bancopan-api.concore.io',
					'https://api.bradesco.com/bradesco',
					'https://api.itau',
					'https://api.bradesco.com/next',
				]
				const apiResponses = await Promise.all(
					urls.map(async (url) => {
						const response = await callOpenBankingApiPersonalLoans(url)
						return response
					})
				)
				setState(apiResponses)
			})()
		} catch (error) {
			console.log('Error to call api:', error)
		}
	}, [])

	useEffect(() => {}, [state])
	return (
		<Layout title="Comparativo de taxas feito com base na API de Empréstimo pessoa física.">
			<PersonalLoansStyled>
				<h3>
					Este é um comparativo das taxas de empréstimos para pessoas físicas dos bancos:
					Banco do Brasil, Banco Pan, Bradesco, Itaú e Next.
				</h3>
				<ComparisonMatrixStyled>
					<span />

					<div
						style={{
							backgroundColor: '#FBAB7E',
							backgroundImage: 'linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%)',
						}}
					>
						<img src={bbLogo} alt="Banco do Brasil" height="40px" />
					</div>
					<div
						style={{
							backgroundImage:
								'radial-gradient( circle 732px at -23.9% -25.1%,  #0043ff 6.1%, #00C5FF 100.2% )',
						}}
					>
						<img src={bancoPanLogo} alt="Banco Pan" height="40px" />
					</div>
					<div style={{ background: 'linear-gradient(180deg, #cc092f 0%, #b2207b 100%)' }}>
						<img src={bradescoLogo} alt="Bradesco" width="50px" />
					</div>
					<div
						style={{
							background: 'linear-gradient( 0deg,  #ff9d00 11.2%, rgba(255,0,0,1) 100.2% )',
						}}
					>
						<img src={itauLogo} alt="Itaú" width="50px" />
					</div>
					<div
						style={{
							background: 'linear-gradient( 110deg,  #1D3B3B 11.2%, #3cc974 100.2% )',
						}}
					>
						<img src={nextLogo} alt="Next" width="70px" />
					</div>
					<span />

					<div className="mini" style={{ height: '50px' }}>
						<div className="minMax">
							<div className="min">
								<b>MÍN.</b>
							</div>
							<div className="max">
								<b>MÁX.</b>
							</div>
						</div>
					</div>
					<div className="mini" style={{ height: '50px' }}>
						<div className="minMax">
							<div className="min">
								<b>MÍN.</b>
							</div>
							<div className="max">
								<b>MÁX.</b>
							</div>
						</div>
					</div>
					<div className="mini" style={{ height: '50px' }}>
						<div className="minMax">
							<div className="min">
								<b>MÍN.</b>
							</div>
							<div className="max">
								<b>MÁX.</b>
							</div>
						</div>
					</div>
					<div className="mini" style={{ height: '50px' }}>
						<div className="minMax">
							<div className="min">
								<b>MÍN.</b>
							</div>
							<div className="max">
								<b>MÁX.</b>
							</div>
						</div>
					</div>
					<div className="mini" style={{ height: '50px' }}>
						<div className="minMax">
							<div className="min">
								<b>MÍN.</b>
							</div>
							<div className="max">
								<b>MÁX.</b>
							</div>
						</div>
					</div>
					{Object.keys(typesState).map((index) => (
						<>
							<div className="mainIndex">
								<b>{index.replace(/[_\s]/g, ' ')}</b>
							</div>
							<div className="mini">
								{typesState[index].map((interestRates) =>
									brandMap(interestRates, 'Banco do Brasil S/A')
								)}
							</div>
							<div className="mini">
								{typesState[index].map((interestRates) =>
									brandMap(interestRates, 'Grupo Pan')
								)}
							</div>
							<div className="mini">
								{typesState[index].map((interestRates) =>
									brandMap(interestRates, 'Banco Bradesco')
								)}
							</div>
							<div className="mini">
								{typesState[index].map((interestRates) =>
									brandMap(interestRates, 'Banco Digital Next')
								)}
							</div>
							<div className="mini">
								{typesState[index].map((interestRates) => brandMap(interestRates, 'Itaú'))}
							</div>
						</>
					))}
				</ComparisonMatrixStyled>
				<h3 style={{ marginTop: '50px' }}>
					Tabelas completas com as taxas de empréstimos para pessoas físicas.
				</h3>
				{state.map((brand, index) => (
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
				))}
			</PersonalLoansStyled>
		</Layout>
	)
}

export default PersonalLoansPage
