// @ts-nocheck
import React from 'react'

import {
	generateCellGridConfig,
	generateGridTemplate,
} from '../../utils/generateGridTemplate'

import MatrixHeader from './components/MatrixHeader'
import { ComparisonMatrixStyled } from './ComparisonMatrix.styled'
import BrandMiniPayload from '../ComparisonMatrix/components/BrandMiniPayload'
import { MatrixCellStyled } from './components/MatrixCell/MatrixCell.styled'
import { omit } from '../../utils/omit'
import { IBankProps } from '../../constants/banks'

interface Props {
	banks: IBankProps[]
	stateCompanies: string[][]
	typesState: any[]
	fixFunction: any
}

const ComparisonMatrix = ({ banks, stateCompanies, typesState, fixFunction }: Props) => {
	let pageCompanies: any = ['INDISPONÍVEL']
	stateCompanies.forEach((array: string[][]) =>
		array.forEach((companyName) => pageCompanies.push(companyName))
	)
	let fixedBanks = banks
	banks.forEach((banks: any, index: number) => {
		if (fixedBanks[index].companies.length === 0) {
			fixedBanks[index].companies = ['INDISPONÍVEL']
		} else {
			fixedBanks[index].companies = fixedBanks[
				index
			].companies.filter((companyName: string) => pageCompanies.includes(companyName))
		}
	})
	return (
		<ComparisonMatrixStyled gridTemplateColumns={generateGridTemplate(fixedBanks)}>
			<MatrixHeader banks={fixedBanks} />
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
									banks.filter(({ brandName }) => brandName === requiredBrand)[0].companies
										.length
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
														{Object.values(omit('company', omit('brand', brand))).map(
															({ name, minimum, maximum }) => {
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
																			fixFunction,
																		}}
																		key={`brandMiniPayload${requiredBrand}-${companyName}-${name}${Math.random()}`.replace(
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
		</ComparisonMatrixStyled>
	)
}

export default ComparisonMatrix
