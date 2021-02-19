import bbLogo from '../assets/img/bb-logo.jpg'
import bancoPanLogo from '../assets/img/banco-pan-logo.svg'
import bradescoLogo from '../assets/img/bradesco-logo.png'
import itauLogo from '../assets/img/itau-logo.webp'
import nextLogo from '../assets/img/next-logo.svg'

export const returnBankLogo = (brandName: string) => {
	switch (brandName) {
		case 'Banco do Brasil S/A':
			return bbLogo

		case 'Grupo Pan':
			return bancoPanLogo

		case 'Banco Bradesco':
			return bradescoLogo

		case 'Banco Digital Next':
			return nextLogo

		case 'Itaú':
		case 'ITAU':
		case 'Itau Unibanco S.A.':
			return itauLogo
	}
}
