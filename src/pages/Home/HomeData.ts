import loan from '../../assets/img/illustrations/loan.svg'
import account from '../../assets/img/illustrations/account.svg'
import creditcard from '../../assets/img/illustrations/credit-card.svg'
import financings from '../../assets/img/illustrations/financings.svg'

import {
	PERSONAL_LOANS,
	PERSONAL_ACCOUNTS,
	PERSONAL_CREDIT_CARDS,
	PERSONAL_FINANCINGS,
	BUSINESS_LOANS,
	BUSINESS_ACCOUNTS,
	BUSINESS_CREDIT_CARDS,
	BUSINESS_FINANCINGS,
} from '../../routes'

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
	{
		path: BUSINESS_ACCOUNTS,
		title: 'Tarifas - Conta PJ',
		img: {
			src: account,
			alt: 'Tarifas - Conta Jurídica',
		},
		description: 'Api de Conta pessoa jurídica',
	},
	{
		path: PERSONAL_CREDIT_CARDS,
		title: 'Tarifas - Cartão PF',
		img: {
			src: creditcard,
			alt: 'Tarifas - Cartão PF',
		},
		description: 'Api de Cartão de Crédito PF',
	},
	{
		path: BUSINESS_CREDIT_CARDS,
		title: 'Tarifas - Cartão PJ',
		img: {
			src: creditcard,
			alt: 'Tarifas - Cartão PJ',
		},
		description: 'Api de Cartão de Crédito PJ',
	},
	{
		path: PERSONAL_FINANCINGS,
		title: 'Tarifas - Financiamento PF',
		img: {
			src: financings,
			alt: 'Tarifas - Financiamento PF',
		},
		description: 'Api de Financiamento PF',
	},
	{
		path: BUSINESS_FINANCINGS,
		title: 'Tarifas - Financiamento PJ',
		img: {
			src: financings,
			alt: 'Tarifas - Financiamento PJ',
		},
		description: 'Api de Financiamento PJ',
	},
]
