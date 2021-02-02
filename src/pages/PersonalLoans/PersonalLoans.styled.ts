import styled from 'styled-components'

export const PersonalLoansStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	h3 {
		max-width: 500px;
		font-weight: 600;
		text-align: center;
		margin-bottom: 30px;
		font-family: 'Inter', sans-serif;
	}
`

export const ComparisonMatrixStyled = styled.div`
	width: fit-content;
	display: grid;
	grid-template-columns: 200px 130px 130px 130px 130px 130px;
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
		padding: 0;

		div.interestRates {
			display: grid;
			text-align: center;
			height: 100%;
			div {
				display: flex;
				justify-content: space-around;
				align-items: center;
			}
			.index {
				grid-area: index;
				background-color: #e5ebf3;
				border-bottom: 1px solid #c6c6c650;
				font-weight: 600;
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

export const CompanyStyled = styled.div`
	display: flex;
	flex-direction: column;
	width: fit-content;
	div:first-child {
		background-color: #f0f4f7;
		width: 100%;
		margin-bottom: 20px;
		padding: 10px;
		font-size: 14pt;
		justify-content: space-between;
	}
`

export const TableStyled = styled.table`
	border-collapse: collapse;
	width: 900px;
	margin-bottom: 40px;
	th,
	td {
		background-color: #f0f4f7;
		padding: 10px 20px;
		border-bottom: 1px solid #aaa;
		font-weight: 600;
	}
	th {
		font-weight: 700;
	}
`
