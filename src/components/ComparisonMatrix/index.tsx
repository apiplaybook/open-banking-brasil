import React from 'react'

import { generateGridTemplate } from '../../utils/generateGridTemplate'

import MatrixHeader from './components/MatrixHeader'
import { ComparisonMatrixStyled } from './ComparisonMatrix.styled'

const ComparisonMatrix = ({ banks, stateCompanies, children }: any) => {
	let pageCompanies: any = []
	stateCompanies.forEach((array: string[][]) =>
		array.forEach((companyName) => pageCompanies.push(companyName))
	)
	let fixedBanks = banks
	banks.forEach((banks: any, index: number) => {
		fixedBanks[index].companies = fixedBanks[
			index
		].companies.filter((companyName: string) => pageCompanies.includes(companyName))
	})
	return (
		<ComparisonMatrixStyled gridTemplateColumns={generateGridTemplate(fixedBanks)}>
			<MatrixHeader banks={fixedBanks} />
			{children}
		</ComparisonMatrixStyled>
	)
}

export default ComparisonMatrix
