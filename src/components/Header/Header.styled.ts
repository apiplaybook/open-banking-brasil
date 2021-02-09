import styled from 'styled-components'

export const HeaderStyled = styled.header`
	display: flex;
	width: 100%;
	padding: 10px 35px;

	a {
		height: fit-content;
		width: fit-content;
		transform: scale(0.8);
	}

	h1 {
		font-family: 'Inter', sans-serif;
		margin: auto;
		transform: translateX(-70px);
	}
	@media only screen and (max-width: 1400px) {
		padding: 5px 15px;
		height: 100px;
		a {
			transform: scale(0.6);
		}
	}
`
