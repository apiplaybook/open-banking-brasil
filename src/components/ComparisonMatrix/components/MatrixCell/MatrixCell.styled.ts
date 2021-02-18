import styled from 'styled-components'

interface MatrixCellProps {
	gridConfig: string
}

export const MatrixCellStyled = styled.div<MatrixCellProps>`
	display: grid !important;
	padding: 0 !important;
	${({ gridConfig }) => gridConfig}
	max-height: fit-content;
	div.cellCompanyColumn {
		width: 100%;
		display: flex;
		flex-direction: column;
		border-right: 1px solid #c6c6c650;
		border-left: 1px solid #c6c6c650;
	}
	div.minMax {
		display: grid;
		text-align: center;
		height: 100%;
		width: 100%;
		div {
			display: flex;
			justify-content: space-around;
			align-items: center;
		}

		.max {
			border-left: 1px solid #c6c6c650;
			grid-area: max;
			height: 100%;
		}
		.min {
			grid-area: min;
			height: 100%;
		}
		.miniHeader {
			border-bottom: 1px solid #c6c6c650;
			grid-area: miniHeader;
			height: 100%;
			font-size: 10pt;
		}
		grid-template-rows: 60px 40px;
		grid-template-areas:
			'miniHeader miniHeader'
			'min max';
	}

	/* ${({ gridConfig }) => gridConfig} */
`
