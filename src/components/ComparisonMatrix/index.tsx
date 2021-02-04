// @ts-nocheck
import React from 'react'
import { banks } from '../../constants/banks'
import { generateGridTemplate } from '../../utils/generateGridTemplate'
import { ComparisonMatrixStyled } from './ComparisonMatrix.styled'
import MatrixHeader from './components/MatrixHeader'

const ComparisonMatrix = ({ omit, children }: any) => {
	return omit ? (
		<ComparisonMatrixStyled
			gridTemplateColumns={generateGridTemplate(banks.length - omit.length)}
		>
			<MatrixHeader omit={omit} />
			{children}
		</ComparisonMatrixStyled>
	) : (
		<ComparisonMatrixStyled gridTemplateColumns={generateGridTemplate(banks.length)}>
			<MatrixHeader />
			{children}
		</ComparisonMatrixStyled>
	)
}

export default ComparisonMatrix
