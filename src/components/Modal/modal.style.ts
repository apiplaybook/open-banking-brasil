import styled, { keyframes } from 'styled-components'
import { MdClose } from 'react-icons/md'

const appearFromMiddle = keyframes`
  from {
    opacity: 0;
    transform:translateY(-100%)
  } to {
    opacity: 1;
    transform: translateY(0%)
  }
`

export const LightBox = styled.div`
	display: block;
	position: fixed;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.3);
	z-index: 1;
	overflow-x: auto;
	padding: 60px 20px;
`

export const ModalWrapper = styled.div`
	position: relative;
	background-color: #ffff;
	color: #888888;
	width: 600px;
	margin: 0 auto;
	padding-top: 60px;
	padding: 50px;
	box-shadow: 0 5px 16px rgba(0, 0, 0, 0.4);
	overflow-y: auto;
	animation: ${appearFromMiddle} 0.2s;

	div {
		h1 {
			font-size: 21px;
			margin-top: 20px;
			margin-bottom: 10px;
			color: #666666;
		}
	}
`

export const CloseButtonModal = styled(MdClose)`
	position: absolute;
	top: 20px;
	right: 20px;
	font-weight: 800;

	&:hover {
		color: #111111;
		cursor: pointer;
	}
`
