import styled from 'styled-components'

export const BrandMiniPayloadStyled = styled.div`
	display: grid;
	text-align: center;
	height: 100%;
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
		word-break: break-all;
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
	.miniFont {
		font-size: 9pt;
		min-height: 30px;
		padding: 2px;

		&.title {
			font-size: 8pt;
		}
	}
	grid-template-areas:
		'index index'
		'min max';
`
