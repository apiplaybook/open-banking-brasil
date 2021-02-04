//@ts-nocheck
import styled from 'styled-components'

export const ComparisonMatrixStyled = styled.div`
	width: fit-content;
	display: grid;
	grid-template-columns: ${(props) => `${props.gridTemplateColumns}`};
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
		flex-direction: column;
		justify-content: flex-start;
		padding: 0;
		max-height: fit-content;
		div.hfit {
			height: fit-content;
		}
		div.interestRates {
			display: grid;
			text-align: center;
			/* height: 100%; */
			max-height: 200px;
			div {
				display: flex;
				justify-content: space-around;
				align-items: center;
				padding: 5px 0;
			}
			.index {
				grid-area: index;
				background-color: #e5ebf3;
				border-bottom: 1px solid #c6c6c650;
				font-weight: 600;
				font-size: 10pt;
			}
			.max {
				border-left: 1px solid #c6c6c650;
				border-bottom: 1px solid #c6c6c650;
				grid-area: max;
				height: 100%;
			}
			.min {
				border-bottom: 1px solid #c6c6c650;
				grid-area: min;
				height: 100%;
			}
			grid-template-areas:
				'index index'
				'min max';
		}
		div.minMax {
			display: grid;
			text-align: center;
			height: 100%;
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
			grid-template-areas: 'min max';
		}
	}
	.fator {
		grid-area: fator;
	}
	grid-template-areas:
		'header header header header'
		'fator . . .'
		'fator . . .';
`
