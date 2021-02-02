import styled from 'styled-components'

export const HomeStyled = styled.div`
	display: grid;
	grid-template-columns: 0.9fr 1.1fr;
	& > img {
		max-width: 50vw;
	}
	@media only screen and (max-width: 1600px) {
		grid-template-columns: 1.2fr 0.8fr;
		& > img {
			max-width: 43vw;
		}
		h1 {
			font-size: 30pt !important;
		}
		p {
			font-size: 12pt !important;
		}
		& > div {
			padding: 0 0 0 50px;
		}
	}
	@media only screen and (max-width: 1100px) {
		grid-template-columns: 1.5fr 0.5fr;
		& > img {
			max-width: 40vw;
		}
		h1 {
			font-size: 26pt !important;
		}

		& > div {
			padding: 0 40px;
		}
	}
	@media only screen and (max-width: 900px) {
		display: flex;
		flex-direction: column;
		& > img {
			align-self: center;
		}
	}
`
export const LeftSideStyled = styled.div`
	padding: 0 100px;
`
export const CardStyled = styled.div`
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	height: fit-content;
	width: fit-content;
	max-width: 600px;
	padding: 45px;
	border-radius: 5px;
	h1 {
		font-family: 'Inter', sans-serif;
		margin-bottom: 15px;
		font-size: 40pt;
	}

	p {
		text-align: justify;
		font-size: 14pt;
		font-weight: 500;
	}
`
export const HomeButtonStyled = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`
export const ApiCardStyled = styled.div`
	position: relative;
	top: -35px;
	display: flex;
	flex-direction: column;
	align-content: center;
	justify-content: center;
	height: fit-content;
	width: fit-content;
	max-width: 600px;
	background: #f0f4f7;
	padding: 30px;
	border-radius: 5px;
	box-shadow: 0px 0px 24px rgb(0 0 0 / 14%);
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	&:hover {
		transform: scale(1.15);
		background: linear-gradient(180deg, #46236f 0%, #7b2987 100%);
		color: #fff;
	}
	h3 {
		margin-bottom: 15px;
		text-align: center;
	}
	h3::before {
		content: '';
		width: 50px;
		height: 4px;
		display: block;
		background: #3e446c;
		position: absolute;
		left: 50%;
		bottom: 0;
		-ms-transform: translateX(-50%);
		transform: translateX(-50%);
	}
	img {
		height: 150px;
		margin: auto;
		margin-bottom: 15px;
	}
	p {
		text-align: center;
		font-size: 11pt;
	}
`
