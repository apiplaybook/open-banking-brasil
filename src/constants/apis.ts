interface IBank {
	brand: string
	companies: string[]
}
export interface IApis {
	endpoint: string
	banks: IBank[]
}

export const apis: IApis[] = [
	{
		endpoint: '/personal-accounts',
		banks: [
			{ brand: 'Banco do Brasil S/A', companies: ['Banco do Brasil S/A'] },
			{ brand: 'Grupo Pan', companies: ['Banco Pan'] },
			{ brand: 'Banco Bradesco', companies: ['Banco Bradesco S.A.'] },
			{
				brand: 'Itau Unibanco S.A.',
				companies: ['Itau Unibanco S.A.'],
			},
			{ brand: 'Banco Digital Next', companies: ['Banco Bradesco S.A.'] },
		],
	},
	{
		endpoint: '/business-accounts',
		banks: [
			{ brand: 'Banco do Brasil S/A', companies: ['Banco do Brasil S/A'] },
			// { brand: 'Grupo Pan', companies: ['Banco Pan'] },
			{ brand: 'Banco Bradesco', companies: ['Banco Bradesco S.A.'] },
			{
				brand: 'Itau Unibanco S.A.',
				companies: ['Itau Unibanco S.A.'],
			},
		],
	},
	{
		endpoint: '/personal-loans',
		banks: [
			{ brand: 'Banco do Brasil S/A', companies: ['Banco do Brasil S/A'] },
			{ brand: 'Grupo Pan', companies: ['Banco Pan'] },
			{ brand: 'Banco Bradesco', companies: ['Banco Bradesco S.A.'] },
			{
				brand: 'Itaú',
				companies: ['BANCO ITAU CONSIGNADO S.A.', 'BANCO ITAU UNIBANCO S.A.'],
			},
			{ brand: 'Banco Digital Next', companies: ['Banco Bradesco S.A.'] },
		],
	},
	{
		endpoint: '/business-loans',
		banks: [
			{ brand: 'Banco do Brasil S/A', companies: ['Banco do Brasil S/A'] },
			// { brand: 'Grupo Pan', companies: ['Banco Pan'] },
			{ brand: 'Banco Bradesco', companies: ['Banco Bradesco S.A.'] },
			{
				brand: 'Itaú',
				companies: ['BANCO ITAU UNIBANCO S.A.'],
			},
		],
	},
]