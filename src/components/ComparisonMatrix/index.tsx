import React from 'react'

import { generateGridTemplate } from '../../utils/generateGridTemplate'

import MatrixHeader from './components/MatrixHeader'
import { ComparisonMatrixStyled } from './ComparisonMatrix.styled'

const ComparisonMatrix = ({ banks, children }: any) => {
	return (
		<ComparisonMatrixStyled gridTemplateColumns={generateGridTemplate(banks)}>
			<MatrixHeader banks={banks} />
			{children}
		</ComparisonMatrixStyled>
	)
}

export default ComparisonMatrix
