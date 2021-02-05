//@ts-nocheck
import styled from 'styled-components'

interface ComparisonMatrixProps {
	gridTemplateColumns: string
}

export const ComparisonMatrixStyled = styled.div<ComparisonMatrixProps>`
	width: fit-content;
	display: grid;
	grid-template-columns: ${({ gridTemplateColumns }) => gridTemplateColumns};
	grid-template-rows: auto;
	.mainIndex {
		background-color: #3e446c;
		color: #f0f4f7;
	}
	& > div {
		display: flex;
		background-color: #f0f4f7;
		padding: 50px;
		justify-content: space-around;
		border: 1px solid #c6c6c650;
	}
	.header {
		grid-area: header;
	}
	div.mini {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 0;
		max-height: fit-content;
		div.miniHeaders {
			display: flex;
			flex-direction: row;
			width: 100%;
		}
		div.miniCompanyColumn {
			width: 100%;
			display: flex;
			flex-direction: column;
			&:last-child {
				border-left: 1px solid #c6c6c650;
			}
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
	}
`
