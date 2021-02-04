import styled from 'styled-components'

export const MatrixPageStyled = styled.div`
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
