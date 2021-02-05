import { IBankProps } from './../constants/banks'

export const generateGridTemplate = (banks: IBankProps[]) => {
	let template = '200px'
	banks.forEach((bank) => {
		template += ` ${130 * bank.companies.length}px`
	})

	return template
}
export const generateGridTemplateByLength = (length: number) => {
	let template = ''

	for (let i = 0; i < length; i++) {
		template += i === 0 ? '130px' : ' 130px'
	}

	return template
}

export const generateCellGridConfig = (companiesLength: number) => {
	let areas = ''
	let templateAreas = ''
	for (let i = 0; i < companiesLength; i++) {
		areas += ` div.cellCompanyColumn${i} { grid-area: cellCompanyColumn${i}; }`
		templateAreas += ` cellCompanyColumn${i}`
	}
	areas = areas.trim()
	templateAreas = templateAreas.trim()

	return `${areas} grid-template-columns: ${generateGridTemplateByLength(
		companiesLength
	)}; grid-template-areas: '${templateAreas}' !important;`
}
