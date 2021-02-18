import loan from '../../assets/img/illustrations/loan.svg'
import account from '../../assets/img/illustrations/account.svg'

import { PERSONAL_LOANS, PERSONAL_ACCOUNTS, BUSINESS_LOANS } from '../../routes'

export const HomeData = [
	{
		path: PERSONAL_LOANS,
		title: 'Juros - Empréstimos PF',
		img: {
			src: loan,
			alt: 'Api de Empréstimos pessoa física',
		},
		description: 'Api de Empréstimos PJ',
	},
	{
		path: BUSINESS_LOANS,
		title: 'Juros - Empréstimos PJ',
		img: {
			src: loan,
			alt: 'Api de Empréstimos pessoa jurídica',
		},
		description: 'Api de Empréstimos PJ',
	},
	{
		path: PERSONAL_ACCOUNTS,
		title: 'Tarifas - Conta PF',
		img: {
			src: account,
			alt: 'Tarifas Conta Pessoal',
		},
		description: 'Api de Conta pessoa física',
	},
]
